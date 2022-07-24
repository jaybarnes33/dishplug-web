import FormWrapper from "@/components/Layout/FormWrapper";
import React from "react";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  return (
    <FormWrapper>
      <Form>
        <Form.Group>
          <Form.Label>Email or Phone</Form.Label>
          <Form.Control placeholder="Email or Phone" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Password" />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="dark" size="lg">
            Login
          </Button>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default Login;
