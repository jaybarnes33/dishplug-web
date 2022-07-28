import Head from "next/head";
import React from "react";
import { Container, Form } from "react-bootstrap";

const Shipping = () => {
  return (
    <Container className="d-flex justify-content-center">
      <Head>
        <title>Shipping</title>
      </Head>
      <Form style={{ minWidth: "70%" }}>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control placeholder="Location" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control placeholder="Phone number" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Landmark</Form.Label>
          <Form.Control placeholder="Enter a landmark" />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Shipping;
