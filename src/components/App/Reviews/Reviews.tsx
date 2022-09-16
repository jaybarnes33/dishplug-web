import { useAuth } from "@/components/Context/Auth";
import React from "react";
import { Container } from "react-bootstrap";

const Reviews = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <Container>
        <h4>Testimonials</h4>
      </Container>
    </div>
  );
};

export default Reviews;
