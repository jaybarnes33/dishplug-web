import { useAvailability } from "@/components/Context/Availability";
import { useCart } from "@/components/Context/Cart";
import colors from "@/styles/colors";
import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { FaMinus, FaMinusSquare, FaPlus, FaPlusSquare } from "react-icons/fa";

interface ICartItem {
  image: string;
  name: string;
  price: number;
  id: string;
  quantity: number;
}
const CartItem = ({ item }: { item: ICartItem }) => {
  const {
    cart,
    totalAmount,

    increment,
    decrement,
    removeFromCart
  } = useCart();
  const { unavailableFoods } = useAvailability();

  const handleInc = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { id } = event.currentTarget.dataset;
    if (!id) throw new Error("icon button requires a data-id attribute");
    increment(id);
  };

  const handleDec = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { id } = event.currentTarget.dataset;
    if (!id) throw new Error("icon button requires a data-id attribute");
    decrement(id);
  };

  //   const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     const { id } = event.currentTarget.dataset;
  //     if (!id) throw new Error("icon button requires a data-id attribute");
  //     removeFromCart(id);
  //   };

  return (
    <div
      className="d-flex justify-content-center gap-4 align-items-center my-3 p-2 "
      style={{
        backgroundColor: "white",
        borderRadius: 22,
        boxShadow: "12px 26px 50px rgba(90, 108, 234, 0.07)"
      }}
    >
      <div>
        <Image
          src={item.image || ""}
          alt=""
          width={62}
          height={62}
          style={{ borderRadius: 16 }}
        />
      </div>
      <div className="d-flex flex-column align-items-start justify-content-center">
        <span>{item.name}</span>
        <span style={{ color: colors.accent2, fontWeight: "bolder" }}>
          GH{item.price}
        </span>
      </div>

      <div className="d-flex ms-auto me-2 gap-2 align-items-center">
        <Button
          size="sm"
          data-id={item.id}
          onClick={handleDec}
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: "rgba(249, 168, 77, 0.2)"
          }}
        >
          <FaMinus color={colors.accent} />
        </Button>
        {item.quantity}

        <Button
          data-id={item.id}
          size="sm"
          style={{
            border: "none",
            borderRadius: "5px",

            backgroundColor: colors.accent
          }}
          onClick={handleInc}
          disabled={unavailableFoods.includes(item.id)}
        >
          <FaPlus color={colors.light} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
