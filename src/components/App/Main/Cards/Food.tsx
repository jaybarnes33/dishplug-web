import React from "react";
import { Card, CardImg } from "react-bootstrap";
import Image from "next/image";
import { FoodType } from "@/types";
import Rating from "../../Rating";
const Food = (food: FoodType) => {
  return (
    <Card style={{ border: "none" }}>
      <CardImg
        as={Image}
        src={food.image}
        height={400}
        width={500}
        objectFit="cover"
      />
      <Card.Body style={{ padding: 0, paddingTop: 10 }}>
        <h4>{food.name}</h4>
        <Rating value={food.rating} />
        <p>{food.description}</p>
      </Card.Body>
    </Card>
  );
};

export default Food;
