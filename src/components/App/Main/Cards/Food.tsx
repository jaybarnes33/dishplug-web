import React from "react";
import { Badge, Button, Card, CardImg } from "react-bootstrap";
import Image from "next/image";
import type { FoodType } from "@/types";
import { FaBuilding, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { currencyFormat } from "@/helpers/utils";
import { useCart } from "@/components/Context/Cart";
import { useRouter } from "next/router";
import { useAvailability } from "@/components/Context/Availability";
import colors from "@/styles/colors";
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
      store_city: food.store_city,
      store_phone: food.store_phone
    });
  };

  return (
    <Card
      style={{
        border: "none",
        cursor: "pointer",
        height: 235
      }}
      className="position-relative my-3"
    >
      <Link href={`/foods/${food.id}`}>
        <div
          style={{ width: "100%", height: "120px", zIndex: 0 }}
          className="position-absolute"
        >
          <CardImg
            as={Image}
            src={food.image || "/"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </Link>
      {unavailableFoods.includes(food.id) ? (
        <Badge bg="dark" style={{ position: "absolute", right: 0, top: 0 }}>
          Not available
        </Badge>
      ) : (
        <Button
          variant="light"
          className="d-flex justify-content-center align-items-center"
          onClick={handleAddToCart}
          style={{
            backgroundColor: "white!important",
            width: 40,
            height: 40,
            position: "absolute",
            right: -5,
            top: -15,
            borderRadius: 50
          }}
        >
          <FaShoppingCart color={colors.accent2} size={20} />
        </Button>
      )}

      <Card.Body style={{ padding: 0, marginTop: 125 }} className="mb-2 px-2">
        <div className="d-flex flex-column mb-2">
          <Link href={`/foods/${food.id}`}>
            <h6>{food.name}</h6>
          </Link>

          <small style={{ color: colors.accent2 }}>
            {currencyFormat(food.price)}
          </small>
          {!pathname.includes("stores") && (
            <div className="d-flex flex-column justify-content-between">
              <Link href={`/stores/${food.store_id}`}>
                <small className="mx-1 d-flex gap-1 align-items-center">
                  <span>
                    <FaBuilding color={colors.accent} size={12} />
                  </span>
                  {food.store_name}
                </small>
              </Link>
              <small className="mx-1 d-flex gap-1 align-items-center">
                <span>
                  <FaMapMarkerAlt color={colors.accent} size={12} />
                </span>
                <span>{food.store_city}</span>
              </small>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Food;
