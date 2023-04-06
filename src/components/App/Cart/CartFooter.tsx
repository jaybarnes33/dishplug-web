import colors from "@/styles/colors";

import React from "react";
import { currencyFormat } from "@/helpers/utils";
import { useCart } from "@/components/Context/Cart";
import { useAvailability } from "@/components/Context/Availability";
import { useRouter } from "next/router";
import Image from "next/image";

const CartFooter = () => {
  const router = useRouter();
  const { cart, totalAmount } = useCart();
  const { unavailableFoods } = useAvailability();
  const numberOfAvailableItemsInCart =
    cart?.reduce(
      (acc, curr) =>
        unavailableFoods.includes(curr.id) ? acc : acc + curr.quantity,
      0
    ) || 0;

  return (
    <div
      className="absolute w-full"
      style={{
        left: 0,
        bottom: "1rem"
      }}
    >
      <div
        className="text-neutral-100 font-bold px-3 py-2 relative"
        style={{
          backgroundColor: colors.primary,
          left: 0,
          bottom: 0,
          height: 230,
          border: "none",
          borderRadius: 22
        }}
      >
        <div className="w-full absolute z-1">
          <Image alt="pattern" src="/pattern-white.png" fill />
        </div>

        <p className="subtotal py-3 flex justify-between">
          <span> No. of Items</span>
          <span>({numberOfAvailableItemsInCart}) items</span>
        </p>
        <p className="subtotal py-3 flex justify-between">
          <span>Sub-Total</span>

          {currencyFormat(totalAmount)}
        </p>

        {!router.pathname.includes("checkout") && (
          <button
            className="relative bottom-[-3rem] text-primary rounded-lg text-lg p-3 bg-neutral-100 w-full"
            disabled={numberOfAvailableItemsInCart === 0}
            onClick={() => router.push("/checkout/address")}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartFooter;
