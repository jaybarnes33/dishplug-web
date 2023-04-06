import CartFooter from "@/components/App/Cart/CartFooter";
import CartItem from "@/components/App/Cart/CartItem";
import { useAvailability } from "@/components/Context/Availability";
import { useCart } from "@/components/Context/Cart";

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
      <div className="relative md:w-[70%] min-h-[90vh] mx-auto">
        <div className="mt-2 pt-5 ">
          <h1 className="text-2xl font-bold">Cart</h1>
          <div>
            {cart?.some(food => unavailableFoods.includes(food.id)) ? (
              <p>Some foods in your cart are currently unavailable</p>
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
