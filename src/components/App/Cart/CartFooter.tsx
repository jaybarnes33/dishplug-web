import colors from "@/styles/colors";
import { Button, Card, Container, Image } from "react-bootstrap";

import React from "react";
import { currencyFormat } from "@/helpers/utils";
import { useCart } from "@/components/Context/Cart";
import { useAvailability } from "@/components/Context/Availability";
import { useRouter } from "next/router";

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
      className="position-fixed w-100"
      style={{
        left: 0,
        bottom: "1rem"
      }}
    >
      <Container>
        <Card
          className="text-light px-3 py-2 position-relative"
          style={{
            backgroundColor: colors.primary,
            left: 0,
            bottom: 0,
            height: 230,
            border: "none",
            borderRadius: 22
          }}
        >
          <Image
            src="/pattern-white.png"
            style={{ position: "absolute", zIndex: 0, right: 0 }}
            alt=""
          />
          <p className="subtotal py-3 d-flex justify-content-between">
            <span> No. of Items</span>
            <span>({numberOfAvailableItemsInCart}) items</span>
          </p>
          <p className="subtotal py-3 d-flex justify-content-between">
            <span>Sub-Total</span>

            {currencyFormat(totalAmount)}
          </p>

          {!router.pathname.includes("checkout") && (
            <Button
              size="lg"
              variant="light"
              className="btn-block position-relative p-3"
              style={{ color: colors.primary, zIndex: 1, borderRadius: 15 }}
              disabled={numberOfAvailableItemsInCart === 0}
              onClick={() => router.push("/checkout/address")}
            >
              Checkout
            </Button>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default CartFooter;
