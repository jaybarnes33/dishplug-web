import { useAuth } from "@/components/Context/Auth";
import { TCart, useCart } from "@/components/Context/Cart";
import { currencyFormat } from "@/helpers/utils";
import { firestore } from "@/lib/firebase/client";
import { IPageProps } from "@/pages/checkout/[path]";
import { addDoc, collection, Timestamp } from "firebase/firestore/lite";
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
  Row
} from "react-bootstrap";
import { usePaystackPayment } from "react-paystack";

const Details = ({ details }: IPageProps) => {
  const { user } = useAuth();
  const { replace } = useRouter();
  const [addressInfo, setAddressInfo] = useState(details);
  const { cart, totalAmount, clearCart } = useCart();

  useEffect(() => {
    const storedDetails = localStorage.getItem("address-info");
    if (storedDetails) {
      setAddressInfo(JSON.parse(storedDetails));
    }
  }, []);

  const initializePayment = usePaystackPayment({
    email: user?.email || "anonymous@email.com",
    amount: Math.ceil(totalAmount * 100),
    currency: "GHS",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
  });

  // you can call this function anything
  const onSuccess = (
    response: Record<string, string | number>,
    items: TCart[] | null
  ) => {
    addDoc(collection(firestore, "orders"), {
      reference: response.reference,
      transaction: response.transaction,
      status: "pending",
      amount: totalAmount,
      customer: {
        id: user?.uid,
        name: addressInfo.name
      },
      deliveryLocation: addressInfo.location,
      date: Timestamp.fromDate(new Date()),
      type: "delivery",
      items: items?.map(item => ({
        id: item.id,
        name: item.name,
        soldFor: item.price,
        quantity: item.quantity
      })),
      stores: [...new Set(items?.map(item => item.storeId))]
    })
      .then(clearCart)
      .then(() => replace("/foods"));

    console.log("success");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
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
                            src={item.image}
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
                Place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;