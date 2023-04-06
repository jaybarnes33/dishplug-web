import { useAvailability } from "@/components/Context/Availability";
import { useCart } from "@/components/Context/Cart";
import colors from "@/styles/colors";
import Image from "next/image";
import React from "react";

import { FaMinus, FaPlus } from "react-icons/fa";

interface ICartItem {
  image: string;
  name: string;
  price: number;
  id: string;
  quantity: number;
}
const CartItem = ({ item }: { item: ICartItem }) => {
  const { increment, decrement } = useCart();
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
      className="flex justify-content-center gap-4 items-center my-3 p-2 "
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
          style={{ borderRadius: 16, objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="text-lg font-bold">{item.name}</span>
        <span style={{ color: colors.accent2, fontWeight: "bolder" }}>
          GH{item.price}
        </span>
      </div>

      <div className="flex ms-auto me-2 gap-2 items-center">
        <button
          data-id={item.id}
          onClick={handleDec}
          className="p-1"
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: "rgba(249, 168, 77, 0.2)"
          }}
        >
          <FaMinus color={colors.primary2} />
        </button>
        {item.quantity}

        <button
          data-id={item.id}
          className="p-1"
          style={{
            border: "none",
            borderRadius: "5px",

            backgroundColor: colors.primary2
          }}
          onClick={handleInc}
          disabled={unavailableFoods.includes(item.id)}
        >
          <FaPlus color={colors.light} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
