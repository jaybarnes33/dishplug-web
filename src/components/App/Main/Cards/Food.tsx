import React from "react";
import { Button, Card, CardImg } from "react-bootstrap";
import Image from "next/image";
import { FoodType } from "@/types";
import Rating from "../../Rating";
import { FaRegHeart } from "react-icons/fa";
const Food = ({ food }: { food: FoodType }) => {
  return (
    <Card style={{ border: "none" }} className="position-relative my-3">
      <CardImg
        as={Image}
        src={food.image}
        height={400}
        width={450}
        objectFit="cover"
      />
      <Button
        variant="light"
        size="sm"
        style={{ position: "absolute", right: 0, top: 0 }}
      >
        <FaRegHeart color="red" />
      </Button>
      <Card.Body style={{ padding: 0, paddingTop: 10 }}>
        <div>
          <div>
            <h5>{food.name}</h5>
            <Rating value={food.rating} />
            <p>{food.description}</p>
          </div>
          <small className="ms-auto text-danger me-1">GH{food.price}</small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Food;
