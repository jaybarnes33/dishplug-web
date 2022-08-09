import React from "react";
import { Badge, Button, Card, CardImg } from "react-bootstrap";
import Image from "next/image";
import type { FoodType } from "@/types";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { currencyFormat } from "@/helpers/utils";
import { useCart } from "@/components/Context/Cart";
import { useRouter } from "next/router";

const Food = ({ food }: { food: FoodType }) => {
  const { pathname } = useRouter();
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      storeId: food.storeId,
      store_name: food.store_name
    });
  };

  return (
    <Card
      style={{
        border: "none",
        maxWidth: 200,
        cursor: "pointer"
      }}
      className="position-relative my-3"
    >
      <Link href={`/foods/${food.id}`}>
        <CardImg
          as={Image}
          src={food.image || "/"}
          height={250}
          width={250}
          objectFit="contain"
        />
      </Link>
      {food.available ? (
        <Button
          variant="light"
          onClick={handleAddToCart}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <FaShoppingCart color="red" size={20} />
        </Button>
      ) : (
        <Badge bg="dark" style={{ position: "absolute", right: 0, top: 0 }}>
          Not available
        </Badge>
      )}

      <Card.Body style={{ padding: 0, paddingTop: 10 }} className="mb-2">
        <div className="d-flex flex-column mb-2">
          <Link href={`/foods/${food.id}`}>
            <h5>{food.name}</h5>
          </Link>
          <span className="text-danger">{currencyFormat(food.price)}</span>
          {!pathname.includes("stores") && (
            <Link href={`/stores/${food.storeId}`}>
              <small> {food.store_name}</small>
            </Link>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Food;
