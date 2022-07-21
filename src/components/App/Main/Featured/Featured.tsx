import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import Food from "../Cards/Food";

const Featured = () => {
  return (
    <Container className="position-relative  pt-5 ">
      <h2 className="pt-5 d-flex justify-content-between">
        Featured Food
        <small style={{ fontSize: "1rem" }}>
          View all
          <FaArrowRight />
        </small>
      </h2>
      <Row className="d-flex align-items-center pt-1 ">
        <Col xs={6} md={4} lg={3}>
          <Food
            name="Pepperoni Pizza"
            rating={5}
            price={100}
            image="/pizza.jpg"
          />
        </Col>
        <Col xs={6} md={4} lg={3}>
          <Food
            name="Beef Jollof"
            rating={5}
            price={20}
            image="/jollofbeef.jpg"
          />
        </Col>
        <Col xs={6} md={4} lg={3}>
          <Food
            name="Assorted Fried Rice"
            rating={5}
            price={100}
            image="/friedrice.jpg"
          />
        </Col>
        <Col xs={6} md={4} lg={3}>
          <Food name="Jollof" rating={5} price={100} image="/jollof.jpg" />
        </Col>
      </Row>
    </Container>
  );
};

export default Featured;
