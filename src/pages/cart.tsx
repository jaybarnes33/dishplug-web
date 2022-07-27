import { useCart } from "@/components/Context/Cart";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
  const { cart, increment, decrement, removeFromCart } = useCart();

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
        <ListGroup variant="flush">
          {cart?.map(item => (
            <ListGroup.Item key={item.id}>
              <Row className="d-flex align-items-center">
                <Col xs={2}>
                  <Image src={item.image} alt="" fluid rounded />
                </Col>
                <Col xs={3}>{item.name}</Col>
                <Col xs={2}>GH{item.price}</Col>
                <Col xs={3} md={2} className="d-flex gap-2 align-items-center">
                  <FaPlusCircle data-id={item.id} onClick={handleInc} />
                  {item.quantity}
                  <FaMinusCircle data-id={item.id} onClick={handleDec} />
                </Col>{" "}
                <Col xs={2} md={2} className="d-flex justify-content-center">
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
      </Container>
    </div>
  );
};

export default Cart;
