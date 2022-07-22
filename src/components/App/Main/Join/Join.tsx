import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import CTA from "../Cards/CTA";

const Join = () => {
  return (
    <Container fluid>
      <h2 className="pt-5">Join Us</h2>
      <Row className="d-flex align-items-center justify-content-center pt-1 ">
        <Col xs={6} md={4}>
          <CTA text="Become a seller" href="/sell" />
        </Col>
        <Col xs={6} md={4}>
          <CTA text="Sign up to deliver" href="/deliver" />
        </Col>
        <Col xs={6} md={4}>
          <CTA text="Become a cook" href="/cook" />
        </Col>
      </Row>
    </Container>
  );
};

export default Join;
