import foods from "@/data/foods";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import Food from "../Cards/Food";

const Featured = () => {
  return (
    <Container>
      <h2 className="pt-5 pb-1  text-center">Featured Food</h2>
      <Row className="d-flex align-items-center pt-1 ">
        {foods.map((food, index) => (
          <Col xs={6} md={4} lg={3} key={index}>
            <Food food={food} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-end mt-2">
        <Link href="/foods">
          <small style={{ fontSize: "1rem" }}>
            View all
            <FaArrowRight />
          </small>
        </Link>
      </div>
    </Container>
  );
};

export default Featured;
