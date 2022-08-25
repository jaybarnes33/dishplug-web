import React from "react";
import { Badge, Button, Card, CardImg } from "react-bootstrap";
import Image from "next/image";
import type { FoodType } from "@/types";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { currencyFormat } from "@/helpers/utils";
import { useCart } from "@/components/Context/Cart";
import { useRouter } from "next/router";
import { useAvailability } from "@/components/Context/Availability";

const Food = ({ food }: { food: FoodType }) => {
  const { pathname } = useRouter();
  const { addToCart } = useCart();
  const { unavailableFoods } = useAvailability();

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      store_id: food.store_id,
      store_name: food.store_name,
      store_phone: food.store_phone
    });
  };

  return (
    <Card
      style={{
        border: "none",
        cursor: "pointer"
      }}
      className="position-relative my-3 mx-1"
    >
      <Link href={`/foods/${food.id}`}>
        <CardImg
          as={Image}
          src={food.image || "/"}
          height={200}
          width={150}
          objectFit="cover"
        />
      </Link>
      {unavailableFoods.includes(food.id) ? (
        <Badge bg="dark" style={{ position: "absolute", right: 0, top: 0 }}>
          Not available
        </Badge>
      ) : (
        <Button
          variant="light"
          onClick={handleAddToCart}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            borderRadius: "0 0 0 0"
          }}
        >
          <FaShoppingCart color="red" size={20} />
        </Button>
      )}

      <Card.Body style={{ padding: 0, paddingTop: 10 }} className="mb-2">
        <div className="d-flex flex-column mb-2">
          <Link href={`/foods/${food.id}`}>
            <h5>{food.name}</h5>
          </Link>
          <span className="text-danger">{currencyFormat(food.price)}</span>
          {!pathname.includes("stores") && (
            <Link href={`/stores/${food.store_id}`}>
              <small> {food.store_name}</small>
            </Link>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Food;
