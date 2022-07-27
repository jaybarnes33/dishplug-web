//@ts-nocheck
import QuantitySelector from "@/components/App/CartSelector/CartSelector";
import foods from "@/data/foods";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/cart.slice";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  return (
    <div className="mt-4 pt-5" style={{ minHeight: "70vh" }}>
      <Container>
        <h1 className="text-center">Cart</h1>
        <ListGroup variant="flush">
          {cartItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <Row className="d-flex align-items-center">
                <Col xs={2}>
                  <Image src={item.image} fluid rounded />
                </Col>
                <Col xs={3}>{item.name}</Col>
                <Col xs={2}>GH{item.price}</Col>
                <Col xs={3} md={2} className="d-flex gap-2 align-items-center">
                  <FaPlusCircle
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  />
                  {item.quantity}
                  <FaMinusCircle
                    oncClick={() => dispatch(decrementQuantity(item.id))}
                  />
                </Col>{" "}
                <Col xs={2} md={2} className="d-flex justify-content-center">
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
      </Container>
    </div>
  );
};

export default Cart;
