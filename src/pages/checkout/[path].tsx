import Details from "@/components/App/Checkout/Details";
import Address from "@/components/App/Checkout/Address";
import Link from "next/link";
import { useRouter } from "next/router";
import { Nav } from "react-bootstrap";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import React, { useState } from "react";

const components = {
  address: { component: Address, icon: <FaMapMarkerAlt /> },
  placeorder: { component: Details, icon: <FaCheckCircle /> },
};

const initialValues = {
  name: "",
  location: "",
  phone: "",
};

type TComponents = typeof components;
export type TValues = typeof initialValues;
export interface IPageProps {
  details: { name: string; location: string; phone: string };
  updateDetails: (details: TValues) => void;
}

const Checkout = () => {
  const {
    query: { path },
  } = useRouter();
  const [userDetails, setUserDetails] = useState(initialValues);

  const updateDetails = (details: TValues) => {
    setUserDetails({ ...details });
  };

  const Page = path ? components[path as keyof TComponents].component : null;

  return (
    <div className="mt-4 pt-5" style={{ minHeight: "80vh" }}>
      <Nav className="d-flex justify-content-center gap-3">
        {Object.keys(components).map((item, index) => (
          <Nav.Link
            className="text-muted"
            as={Link}
            href={`/checkout/${item}`}
            passHref
            key={index}
          >
            <span
              className="text-muted"
              style={{ textTransform: "capitalize" }}
            >
              {components[item as keyof TComponents].icon}
              {item}
            </span>
          </Nav.Link>
        ))}
      </Nav>
      <div className="px-5">
        {Page ? (
          <Page details={userDetails} updateDetails={updateDetails} />
        ) : null}
      </div>
    </div>
  );
};

export default Checkout;
