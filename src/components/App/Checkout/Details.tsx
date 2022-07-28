import { useCart } from "@/components/Context/Cart";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { usePaystackPayment } from "react-paystack";

const Details = () => {
  const [location, setLocation] = useState({
    location: "Hilda Hostel",
    phone: "+233543288549",
    landmark: "Room",
  });

  const { cart, totalAmount, itemsInCart } = useCart();

  const initializePayment = usePaystackPayment({
    email: "ohenesetwumasi@gmail.com",
    amount: Math.ceil(totalAmount * 100),
    currency: "GHS",
    publicKey:
      process.env.NODE_ENV === "production"
        ? "pk_live_431916a691d52dc8f388801fc429c9425681a465"
        : "pk_test_aa01df6d676c2ada1658bbf3bb2a04aa3c50985a",
  });

  // you can call this function anything
  const onSuccess = (reference: Record<string, any>) => {
    console.log("success");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  return (
    <div>
      <Head>
        <title>Checkout</title>
      </Head>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Customer Details</h2>
              <strong className={"fw-bold"}>Address: </strong>
              {location.landmark},{location.location}, <br /> {location.phone},
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
                  <Col>GH₵{totalAmount}</Col>
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
                  <Col className={"fw-bold"}>GH₵{totalAmount}</Col>
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
                onClick={() => initializePayment(onSuccess, onClose)}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
