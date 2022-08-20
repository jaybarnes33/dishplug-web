import { useAuth } from "@/components/Context/Auth";
import { TCart, useCart } from "@/components/Context/Cart";
import { currencyFormat, sendNotification } from "@/helpers/utils";
import { firestore } from "@/lib/firebase/client";
import { IPageProps } from "@/pages/checkout/[path]";

import axios from "axios";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Spinner
} from "react-bootstrap";
import { usePaystackPayment } from "react-paystack";

const Details = ({ details }: IPageProps) => {
  const { user } = useAuth();
  const { replace } = useRouter();
  const [addressInfo, setAddressInfo] = useState(details);
  const { cart, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedDetails = localStorage.getItem("address-info");
    if (storedDetails) {
      setAddressInfo(JSON.parse(storedDetails));
    }
  }, []);

  const initializePayment = usePaystackPayment({
    email: addressInfo.email,
    amount: Math.ceil(totalAmount * 100),
    currency: "GHS",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
  });

  // you can call this function anything
  const onSuccess = (
    response: Record<string, string | number>,
    items: TCart[] | null
  ) => {
    const stores = [
      ...new Set(
        items?.map(item => {
          return {
            id: item.store_id,
            phone: item.store_phone,
            name: item.store_name
          };
        })
      )
    ];

    addDoc(collection(firestore, "orders"), {
      reference: response.reference,
      transaction: response.transaction,
      status: "pending",
      amount: totalAmount,
      customer: {
        id: user?.uid || "anon",
        name: addressInfo.name,
        phone: addressInfo.phone,
        email: addressInfo.email
      },
      paid: true,
      deliveryLocation: addressInfo.location,
      date: Timestamp.fromDate(new Date()),
      type: "delivery",
      items: items?.map(item => ({
        id: item.id,
        name: item.name,
        soldFor: item.price,
        quantity: item.quantity,
        store_id: item.store_id
      })),
      stores: stores.map(store => store.id)
    })
      .then(res => {
        console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { paymentMethod, ...rest } = addressInfo;
        localStorage.setItem("order-details", JSON.stringify(rest));
      })
      .then(clearCart)
      .then(() => {
        stores.forEach(store =>
          sendNotification({
            name: addressInfo.name,
            phone: addressInfo.phone,
            paid: true,
            location: addressInfo.location,
            topic: `${store.id}-new_order`,
            items:
              (items || [])
                .filter(item => item.store_id === store.id)
                .map(item => item.name) || []
          })
        );
        axios.post("/api/send-messages", {
          recipients: [addressInfo.phone],
          message: `Hi ${addressInfo.name}, your order has been received, your food will be delivered in no time`
        });

        axios.post("/api/send-messages", {
          recipients: stores.map(store => store.phone),
          message: `An order has been made to your store, please check your dashboard`
        });
      })
      .then(() => replace("/foods"));
  };

  const checkoutWithoutPayment = async (items: TCart[] | null) => {
    const stores = [
      ...new Set(
        items?.map(item => {
          return {
            id: item.store_id,
            phone: item.store_phone,
            name: item.store_name
          };
        })
      )
    ];

    setLoading(true);
    addDoc(collection(firestore, "orders"), {
      status: "pending",
      amount: totalAmount,
      customer: {
        id: user?.uid || "anon",
        name: addressInfo.name,
        phone: addressInfo.phone,
        email: addressInfo.email
      },
      deliveryLocation: addressInfo.location,
      date: Timestamp.fromDate(new Date()),
      type: "delivery",
      items: items?.map(item => ({
        id: item.id,
        name: item.name,
        soldFor: item.price,
        quantity: item.quantity,
        store_id: item.store_id
      })),
      paid: false,
      paymentOnDelivery: true,
      stores: stores.map(store => store.id)
    })
      .then(() => setLoading(false))
      .then(clearCart)
      .then(res => {
        stores.forEach(store =>
          sendNotification({
            name: addressInfo.name,
            phone: addressInfo.phone,
            paid: false,
            location: addressInfo.location,
            topic: `${store.id}-new_order`,
            items:
              (items || [])
                .filter(item => item.store_id === store.id)
                .map(item => item.name) || []
          })
        );
        axios.post("/api/send-messages", {
          recipients: [addressInfo.phone],
          message: `Hi ${addressInfo.name}, your order has been received, your food will be delivered in no time`
        });

        axios.post("/api/send-messages", {
          recipients: stores.map(store => store.phone),
          message: `An order has been made to your store, please check your dashboard`
        });
      })
      .then(() => replace("/foods"));
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  return (
    <Container fluid>
      <Head>
        <title>Checkout</title>
      </Head>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Customer Details</h2>
              <strong className={"fw-bold"}>Address: </strong>
              {addressInfo.location}, <br /> {addressInfo.phone},
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order(s)</h2>
              {cart?.length === 0 ? (
                <Alert variant="danger">Your Cart is empty</Alert>
              ) : (
                <ListGroup>
                  {cart?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image || ""}
                            alt={item.name}
                            fluid
                            rounded
                            style={{ maxWidth: "30px" }}
                          />
                        </Col>
                        <Col>
                          <Link href={`/product/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x {item.price} = GH₵
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{currencyFormat(totalAmount)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivery</Col>
                  <Col>GH₵5</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col className={"fw-bold"}>Total</Col>
                  <Col className={"fw-bold"}>{currencyFormat(totalAmount)}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item className="d-grid p-2">
              {/* {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )} */}

              {addressInfo.paymentMethod === "online" && (
                <Button
                  type="button"
                  size="lg"
                  variant="dark"
                  // disabled={cartItems.length === 0}
                  onClick={() =>
                    initializePayment(
                      (res: Record<string, string>) => onSuccess(res, cart),
                      onClose
                    )
                  }
                >
                  Place Order {loading && <Spinner animation="border" />}
                </Button>
              )}
              {addressInfo.paymentMethod === "delivery" && (
                <Button
                  type="button"
                  size="lg"
                  variant="dark"
                  // disabled={cartItems.length === 0}
                  onClick={() => checkoutWithoutPayment(cart)}
                >
                  Place Order
                </Button>
              )}
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
