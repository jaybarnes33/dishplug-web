import QuantitySelector from "@/components/App/CartSelector/CartSelector";
import foods from "@/data/foods";
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
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
  return (
    <div className="mt-4 pt-5" style={{ minHeight: "70vh" }}>
      <Container>
        <h1 className="text-center">Cart</h1>
        <ListGroup variant="flush">
          {foods.map((item, index) => (
            <ListGroup.Item key={index}>
              <Row className="d-flex align-items-center">
                <Col xs={2}>
                  <Image src={item.image} fluid rounded />
                </Col>
                <Col xs={3}>{item.name}</Col>
                <Col xs={2}>GH{item.price}</Col>
                <Col xs={3} md={2}>
                  <QuantitySelector
                    id=""
                    stock={5}
                    quantity={Math.round(Math.random() * 10) + 1}
                    onChange={(e) => console.log("hello")}
                  />
                </Col>{" "}
                <Col xs={2} md={2} className="d-flex justify-content-center">
                  <Button variant="outline-danger" size="sm">
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
