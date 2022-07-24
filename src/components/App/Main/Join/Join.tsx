import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import CTA from "../Cards/CTA";

const Join = () => {
  return (
    <Container className="py-3">
      <h2 className="pt-5 pb-2 text-center">Join Us</h2>
      <Row className="d-flex align-items-center justify-content-center pt-1 ">
        <Col xs={6} md={4}>
          <CTA text="Become a seller" href="/sell" image={"/seller.jpg"} />
        </Col>
        <Col xs={6} md={4}>
          <CTA text="Sign up to deliver" href="/deliver" image="/rider2.jpg" />
        </Col>
        <Col xs={6} md={4}>
          <CTA text="Become a cook" href="/cook" image="/friedrice.jpg" />
        </Col>
      </Row>
    </Container>
  );
};

export default Join;
