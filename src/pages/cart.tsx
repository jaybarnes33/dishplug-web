import { useAvailability } from "@/components/Context/Availability";
import { useCart } from "@/components/Context/Cart";
import { currencyFormat } from "@/helpers/utils";
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
    itemsInCart,
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
    <div className="mt-5 pt-5" style={{ minHeight: "90vh" }}>
      <Container fluid className="mt-5">
        <h1 className="text-center">Cart</h1>
        <Row>
          <Col md={8}>
            {cart?.some(food => unavailableFoods.includes(food.id)) ? (
              <Alert variant="warning">
                Some foods in your cart are currently unavailable
              </Alert>
            ) : null}
            <ListGroup variant="flush">
              {cart?.map(item => (
                <ListGroup.Item
                  title="currently unavailable"
                  key={item.id}
                  style={
                    unavailableFoods.includes(item.id)
                      ? { opacity: 0.3 }
                      : undefined
                  }
                >
                  <Row className="d-flex align-items-center">
                    <Col xs={2}>
                      <Image src={item.image || ""} alt="" fluid rounded />
                    </Col>
                    <Col xs={3}>{item.name}</Col>
                    <Col xs={2}>GH{item.price}</Col>
                    <Col
                      xs={3}
                      md={2}
                      className="d-flex gap-2 align-items-center"
                    >
                      <button
                        data-id={item.id}
                        style={{
                          border: "none",
                          backgroundColor: "transparent"
                        }}
                        onClick={handleInc}
                        disabled={unavailableFoods.includes(item.id)}
                      >
                        <FaPlusCircle />
                      </button>
                      {item.quantity}
                      <button
                        data-id={item.id}
                        onClick={handleDec}
                        style={{
                          border: "none",
                          backgroundColor: "transparent"
                        }}
                      >
                        <FaMinusCircle />
                      </button>
                    </Col>{" "}
                    <Col
                      xs={2}
                      md={2}
                      className="d-flex justify-content-center"
                    >
                      <Button
                        variant="outline-danger"
                        size="sm"
                        data-id={item.id}
                        onClick={handleRemove}
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <Card>
                <ListGroup.Item>
                  <p className="subtotal py-3">
                    Total ({numberOfAvailableItemsInCart}) items
                    <br />
                    {currencyFormat(totalAmount)}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="d-grid">
                  <Button
                    size="lg"
                    className="btn-block btn-dark"
                    disabled={numberOfAvailableItemsInCart === 0}
                    onClick={() => router.push("/checkout/address")}
                  >
                    Checkout
                  </Button>
                </ListGroup.Item>
              </Card>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
