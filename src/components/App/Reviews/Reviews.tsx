import { useAuth } from "@/components/Context/Auth";
import React from "react";

const Reviews = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <h4>Testimonials</h4>
    </div>
  );
};

export default Reviews;
