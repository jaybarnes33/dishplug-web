import { useAuth } from "@/components/Context/Auth";
import { TCart, useCart } from "@/components/Context/Cart";
import {
  currencyFormat,
  sendNotificationToAdmins,
  sendNotificationToVendors
} from "@/helpers/utils";
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
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Spinner
} from "react-bootstrap";
// import { usePaystackPayment } from "react-paystack";

const Details = ({ details }: IPageProps) => {
  const { user } = useAuth();
  const { replace } = useRouter();
  const [addressInfo, setAddressInfo] = useState(details);
  const { totalAmount, availableItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedDetails = localStorage.getItem("address-info");
    if (storedDetails) {
      setAddressInfo(JSON.parse(storedDetails));
    }
  }, []);

  // const initializePayment = usePaystackPayment({
  //   email: addressInfo.email,
  //   amount: Math.ceil(totalAmount * 100),
  //   currency: "GHS",
  //   publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
  // });

  const saveCheckout = async (
    items: TCart[] | null,
    paymentMethod: "online" | "delivery",
    response?: Record<string, string | number>
  ) => {
    try {
      setLoading(true);
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

      const payload: Record<string, unknown> = {
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
        items: items?.map(item => ({
          id: item.id,
          name: item.name,
          soldFor: item.price,
          quantity: item.quantity,
          store_id: item.store_id
        })),
        paid: paymentMethod === "online",
        paymentOnDelivery: paymentMethod === "delivery",
        type: "delivery",
        stores: stores.map(store => store.id)
      };

      if (response) {
        payload.reference = response.reference;
        payload.transaction = response.transaction;
      }

      await Promise.all([
        addDoc(collection(firestore, "orders"), payload),
        fetch("/api/aggregate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ stores: stores.map(({ id }) => id) })
        })
      ]);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { paymentMethod: _, ...rest } = addressInfo;
      localStorage.setItem("order-details", JSON.stringify(rest));

      clearCart(availableItems);

      stores.forEach(store =>
        sendNotificationToVendors({
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

      sendNotificationToAdmins({
        name: addressInfo.name,
        phone: addressInfo.phone,
        paid: false,
        location: addressInfo.location,
        stores: stores.map(store => ({ id: store.id, name: store.name })),
        items: (items || []).map(item => item.name) || []
      });

      axios.post("/api/send-messages", {
        recipients: [addressInfo.phone],
        message: `Hi ${addressInfo.name}, your order has been received, your food will be delivered in no time`
      });

      axios.post("/api/send-messages", {
        recipients: stores.map(store => store.phone),
        message: `An order has been made to your store, please check your dashboard`
      });

      replace("/success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const onSuccess = (
  //   response: Record<string, string | number>,
  //   items: TCart[] | null
  // ) => {
  //   saveCheckout(items, "online", response);
  // };

  const checkoutWithoutPayment = async (items: TCart[] | null) => {
    saveCheckout(items, "delivery");
  };

  const onClose = () => {
    console.log("closed");
  };

  return (
    <Container>
      <Head>
        <title>Checkout</title>
      </Head>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Customer Details</h2>
              <strong className={"fw-bold"}>Address: </strong>
              {addressInfo.location}, <br /> {addressInfo.phone}{" "}
              {addressInfo.email},
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order(s)</h2>
              {availableItems?.length === 0 ? (
                <Alert variant="danger">Your Cart is empty</Alert>
              ) : (
                <ListGroup>
                  {availableItems?.map((item, index) => (
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
                <Col className={"fw-bold"}>Total</Col>
                <Col className={"fw-bold"}>{currencyFormat(totalAmount)}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item className="d-grid p-2">
            {addressInfo.paymentMethod === "online" && (
              <Button
                type="button"
                size="lg"
                style={{ backgroundColor: "#F9A84D", border: "none" }}
                disabled /* ={availableItems.length === 0}
                onClick={() =>
                  initializePayment(
                    (res: Record<string, string>) =>
                      onSuccess(res, availableItems),
                    onClose
                  )
                } */
              >
                Place Order{" "}
                {loading && <Spinner animation="border" size="sm" />}
              </Button>
            )}
            {addressInfo.paymentMethod === "delivery" && (
              <Button
                type="button"
                size="lg"
                disabled={availableItems.length === 0}
                style={{ backgroundColor: "#F9A84D", border: "none" }}
                onClick={() => checkoutWithoutPayment(availableItems)}
              >
                Place Order{" "}
                {loading && <Spinner animation="border" size="sm" />}
              </Button>
            )}
          </ListGroup.Item>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
