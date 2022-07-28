import Details from "@/components/App/Checkout/Details";
import Shipping from "@/components/App/Checkout/Shipping";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { Nav } from "react-bootstrap";

const components: Record<string, ReactNode> = {
  shipping: <Shipping />,
  placeorder: <Details />,
};
const Checkout = () => {
  const {
    query: { path },
  } = useRouter();
  return (
    <div className="mt-4 pt-5" style={{ minHeight: "80vh" }}>
      <Nav className="d-flex justify-content-center gap-3">
        {Object.keys(components).map((item, index) => (
          <Nav.Link
            className="text-muted"
            as={Link}
            href={`/checkout/${item}`}
            key={index}
          >
            <span
              className="text-muted"
              style={{ textTransform: "capitalize" }}
            >
              {item}
            </span>
          </Nav.Link>
        ))}
      </Nav>
      <div className="px-5">{components[path as unknown as string]}</div>
    </div>
  );
};

export default Checkout;
