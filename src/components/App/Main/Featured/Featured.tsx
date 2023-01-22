import { FoodType } from "@/types";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import Food from "../Cards/Food";

interface IProps {
  foods: FoodType[];
}

const Featured = ({ foods }: IProps) => {
  return (
    <>
      <div
        className="pt-3 pb-1
      d-flex justify-content-between align-items-center"
      >
        <h2 className="text-center">Featured Food</h2>

        <Link href="/meals">
          <a style={{ fontSize: "1.2rem", color: "var(--dp-accent2)" }}>
            View all
            <FaArrowRight className="ms-2" />
          </a>
        </Link>
      </div>

      <Row className="d-flex justify-content-between align-items-center pt-1">
        {foods.map((food, index) => (
          <Col xs={6} sm={6} md={4} lg={3} key={index}>
            <Food food={food} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Featured;
