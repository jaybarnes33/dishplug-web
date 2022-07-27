import { useCart } from "@/components/Context/Cart";
import { currencyFormat } from "@/helpers/utils";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row
} from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Cart = () => {
  const {
    cart,
    totalAmount,
    itemsInCart,
    increment,
    decrement,
    removeFromCart
  } = useCart();

  const handleInc = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const { id } = event.currentTarget.dataset;
    if (!id) throw new Error("icon button requires a data-id attribute");
    increment(id);
  };

  const handleDec = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
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
    <div className="mt-4 pt-5" style={{ minHeight: "70vh" }}>
      <Container>
        <h1 className="text-center">Cart</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cart?.map(item => (
                <ListGroup.Item key={item.id}>
                  <Row className="d-flex align-items-center">
                    <Col xs={2}>
                      <Image src={item.image} alt="" fluid rounded />
                    </Col>
                    <Col xs={3}>{item.name}</Col>
                    <Col xs={2}>GH{item.price}</Col>
                    <Col
                      xs={3}
                      md={2}
                      className="d-flex gap-2 align-items-center"
                    >
                      <FaPlusCircle data-id={item.id} onClick={handleInc} />
                      {item.quantity}
                      <FaMinusCircle data-id={item.id} onClick={handleDec} />
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
                        Checkout
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
                    Total ({itemsInCart}) items
                    <br />
                    {currencyFormat(totalAmount)}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="d-grid">
                  <Button
                    size="lg"
                    className="btn-block btn-dark"
                    // disabled={cartItems.length === 0}
                    // onClick={checkOutHandler}
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
