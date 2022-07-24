import React from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
// import { addToCart } from "@/redux/actions/cart";
const QuantitySelector = ({
  id,
  stock,
  onChange,
  quantity,
}: {
  id: string;
  stock: number;
  onChange: (number: number) => void;
  quantity: number;
}) => {
  //   const dispatch = useDispatch();

  const handleChange = (qty: number) => {
    // setQuantity(Number(qty));
    // onChange(Number(quantity));
    // dispatch(addToCart(id, Number(qty)));
  };
  const addToQuantity = () => {
    if (quantity < stock) {
      handleChange(Number(quantity) + 1);
    }
  };
  const subtractFromQuantity = () => {
    if (quantity > 1) {
      handleChange(Number(quantity) - 1);
    }
  };
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <FaPlus onClick={addToQuantity} style={{ marginRight: "10px" }} />

      <Form.Control
        value={Number(quantity)}
        style={{ padding: "10px" }}
        disabled
        onChange={(e) => handleChange(e.target.value as unknown as number)}
      ></Form.Control>
      <FaMinus onClick={subtractFromQuantity} style={{ marginLeft: "10px" }} />
    </div>
  );
};

export default QuantitySelector;
