import CartItem from "@/components/App/Cart/CartItem";
import { useAvailability } from "@/components/Context/Availability";
import { useCart } from "@/components/Context/Cart";
import { currencyFormat } from "@/helpers/utils";
import colors from "@/styles/colors";
import { useRouter } from "next/router";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row
} from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
  const {
    cart,
    totalAmount,

    increment,
    decrement,
    removeFromCart
  } = useCart();
  const { unavailableFoods } = useAvailability();

  const numberOfAvailableItemsInCart =
    cart?.reduce(
      (acc, curr) =>
        unavailableFoods.includes(curr.id) ? acc : acc + curr.quantity,
      0
    ) || 0;

  const handleInc = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { id } = event.currentTarget.dataset;
    if (!id) throw new Error("icon button requires a data-id attribute");
    increment(id);
  };
  const router = useRouter();

  const handleDec = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { id } = event.currentTarget.dataset;
    if (!id) throw new Error("icon button requires a data-id attribute");
    decrement(id);
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset;
    if (!id) throw new Error("icon button requires a data-id attribute");
    removeFromCart(id);
  };

  return (
    <div style={{ minHeight: "90vh" }}>
      <div className="position-fixed w-100">
        <Container className="mt-2 pt-5 ">
          <h1>Cart</h1>
          <div>
            {cart?.some(food => unavailableFoods.includes(food.id)) ? (
              <Alert variant="warning">
                Some foods in your cart are currently unavailable
              </Alert>
            ) : null}
            <div
              style={{
                height: "45vh",
                overflowY: "scroll"
              }}
            >
              {cart?.map(item => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>
          </div>
        </Container>

        <div
          className="position-fixed w-100"
          style={{
            left: 0,
            bottom: "1rem"
          }}
        >
          <Container>
            <Card
              className="text-light px-2 position-relative"
              style={{
                backgroundColor: colors.primary,
                left: 0,
                bottom: 0,
                height: 200,
                border: "none"
              }}
            >
              <Image
                src="/pattern-white.png"
                style={{ position: "absolute", zIndex: 0 }}
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

              <Button
                size="lg"
                variant="light"
                className="btn-block position-relative"
                style={{ color: colors.primary, zIndex: 1 }}
                disabled={numberOfAvailableItemsInCart === 0}
                onClick={() => router.push("/checkout/address")}
              >
                Checkout
              </Button>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Cart;
