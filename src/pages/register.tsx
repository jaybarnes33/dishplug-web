import FormWrapper from "@/components/Layout/FormWrapper";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const Register = () => {
  return (
    <FormWrapper>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="First name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Last name" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder="Email" type="email" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                placeholder="Phone"
                type="tel"
                name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                autoComplete="nofill"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Password" type="password" />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <Button size="lg" variant="dark">
            Register
          </Button>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default Register;
