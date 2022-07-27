import React from "react";
import { Button, Card, CardImg } from "react-bootstrap";
import Image from "next/image";
import { FoodType } from "@/types";
import Rating from "../../Rating";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart.slice";
const Food = ({ food }: { food: FoodType }) => {
  const dispatch = useDispatch();

  return (
    <Card style={{ border: "none" }} className="position-relative my-3">
      <Link href={`/foods/${food.id - 1}`}>
        <CardImg
          as={Image}
          src={food.image}
          height={400}
          width={450}
          objectFit="cover"
        />
      </Link>
      <Button
        variant="light"
        size="sm"
        onClick={() => dispatch(addToCart(food))}
        style={{ position: "absolute", right: 0, top: 0 }}
      >
        <FaShoppingCart color="red" />
      </Button>
      <Card.Body style={{ padding: 0, paddingTop: 10 }} className="mb-2">
        <Link href={`/foods/1`}>
          <div className="d-flex flex-column flex-sm-row mb-2">
            <h5 className="w-100">{food.name}</h5>
            <span className="text-danger">GH{food.price}</span>
          </div>
        </Link>

        <Rating value={food.rating} />
      </Card.Body>
    </Card>
  );
};

export default Food;
