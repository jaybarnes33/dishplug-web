import CartFooter from "@/components/App/Cart/CartFooter";
import CartItem from "@/components/App/Cart/CartItem";
import { useAvailability } from "@/components/Context/Availability";
import { useCart } from "@/components/Context/Cart";

import { Alert, Container } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { unavailableFoods } = useAvailability();

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
          <CartFooter />
        </Container>
      </div>
    </div>
  );
};

export default Cart;
