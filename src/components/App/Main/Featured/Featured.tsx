import foods from "@/data/foods";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import Food from "../Cards/Food";

const Featured = () => {
  return (
    <Container fluid>
      <h2 className="pt-5 d-flex justify-content-between">
        Featured Food
        <small style={{ fontSize: "1rem" }}>
          View all
          <FaArrowRight />
        </small>
      </h2>
      <Row className="d-flex align-items-center pt-1 ">
        {foods.map((food, index) => (
          <Col xs={6} md={4} lg={3} key={index}>
            <Food food={food} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Featured;
