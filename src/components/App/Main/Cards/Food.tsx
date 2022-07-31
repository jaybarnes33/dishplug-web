import React from "react";
import { Badge, Button, Card, CardImg } from "react-bootstrap";
import Image from "next/image";
import { FoodType } from "@/types";
import Rating from "../../Rating";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { currencyFormat } from "@/helpers/utils";
import { useCart } from "@/components/Context/Cart";

const Food = ({ food }: { food: FoodType }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      storeId: food.storeId,
    });
  };

  return (
    <Card
      style={{ border: "none", maxWidth: 200 }}
      className="position-relative my-3"
    >
      <Link href={`/foods/${food.id}`}>
        <CardImg
          as={Image}
          src={food.image || ""}
          height={200}
          width={200}
          objectFit="contain"
        />
      </Link>
      <Button
        variant="light"
        onClick={handleAddToCart}
        style={{ position: "absolute", right: 0, top: 0 }}
      >
        <FaShoppingCart color="red" size={20} />
      </Button>
      <Badge bg="dark" style={{ position: "absolute", left: 0, top: 0 }}>
        Promo
      </Badge>
      <Card.Body style={{ padding: 0, paddingTop: 10 }} className="mb-2">
        <Link href={`/foods/${food.id}`}>
          <div className="d-flex flex-column flex-sm-row mb-2">
            <h5>{food.name}</h5>
            <span className="text-danger">{currencyFormat(food.price)}</span>
          </div>
        </Link>

        <Rating value={food.rating} />
      </Card.Body>
    </Card>
  );
};

export default Food;
