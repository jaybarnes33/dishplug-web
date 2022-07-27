import QuantitySelector from "@/components/App/CartSelector/CartSelector";
import foods from "@/data/foods";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/cart.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { addDecimals } from "@/utils";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };
  return (
    <div className="mt-4 pt-5" style={{ minHeight: "70vh" }}>
      <Container>
        <Row>
          <Col md={8}>
            <ListGroup>
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className="d-flex align-items-center">
                    <Col xs={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col xs={3}>{item.name}</Col>
                    <Col xs={2}>GH{item.price}</Col>
                    <Col
                      xs={3}
                      md={2}
                      className="d-flex gap-2 align-items-center"
                    >
                      <FaPlusCircle
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      />
                      {item.quantity}
                      <FaMinusCircle
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      />
                    </Col>{" "}
                    <Col
                      xs={2}
                      md={2}
                      className="d-flex justify-content-center"
                    >
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <Card>
                <ListGroup.Item>
                  <p className="subtotal py-3">
                    Total
                    {" (" +
                      cartItems.reduce((acc, item) => acc + item.quantity, 0) +
                      ") "}
                    items
                    <br />
                    GH₵
                    {addDecimals(
                      Number(
                        cartItems
                          .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toFixed(2)
                      )
                    )}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="d-grid">
                  <Button
                    size="lg"
                    className="btn-block btn-dark"
                    disabled={cartItems.length === 0}
                    // onClick={checkOutHandler}
                  >
                    Checkout
                  </Button>
                </ListGroup.Item>
              </Card>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
