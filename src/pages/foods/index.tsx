import Food from "@/components/App/Main/Cards/Food";
import foods from "@/data/foods";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Foods = () => {
  return (
    <section className="mt-4 pt-5" style={{ minHeight: "70vh" }}>
      <h2 className="text-center">Foods</h2>
      <Container>
        <Row>
          {foods.map((food, index) => (
            <Col xs={6} md={4} lg={3} key={index}>
              <Food food={food} />
            </Col>
          ))}
        </Row>
        <Row>
          {foods.map((food, index) => (
            <Col xs={6} md={4} lg={3} key={index}>
              <Food food={food} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Foods;
