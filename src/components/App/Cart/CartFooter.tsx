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
      className="fixed w-100"
      style={{
        left: 0,
        bottom: "1rem"
      }}
    >
      <div>
        <div
          className="text-light px-3 py-2 relative"
          style={{
            backgroundColor: colors.primary,
            left: 0,
            bottom: 0,
            height: 230,
            border: "none",
            borderRadius: 22
          }}
        >
          <div className="w-full absolute z-0">
            <Image alt="pattern" src="/pattern-white.png" layout="fill" />
          </div>

          <p className="subtotal py-3 flex justify-content-between">
            <span> No. of Items</span>
            <span>({numberOfAvailableItemsInCart}) items</span>
          </p>
          <p className="subtotal py-3 flex justify-content-between">
            <span>Sub-Total</span>

            {currencyFormat(totalAmount)}
          </p>

          {!router.pathname.includes("checkout") && (
            <button
              className="btn-block relative p-3"
              style={{ color: colors.primary, zIndex: 1, borderRadius: 15 }}
              disabled={numberOfAvailableItemsInCart === 0}
              onClick={() => router.push("/checkout/address")}
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
