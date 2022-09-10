import { useAuth } from "@/components/Context/Auth";
import Link from "next/link";
import React from "react";
import { Alert, Container, Form } from "react-bootstrap";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="mt-5 pt-5">
      <Container className="mt-5">
        {!isAuthenticated && (
          <Alert variant="danger">
            Please <Link href="/login">login</Link> to access your profile
          </Alert>
        )}
        {user && (
          <Form>
            <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control value={user?.displayName || " "}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control value={user?.email || " "}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="phone">Phone</Form.Label>
              <Form.Control value={user?.phoneNumber || " "}></Form.Control>
            </Form.Group>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default Profile;
