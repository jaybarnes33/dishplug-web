import React from "react";
import { Card, CardImg, NavLink } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
const CTA = ({ text, href }: { text: string; href: string }) => {
  return (
    <Card style={{ border: "none" }}>
      <CardImg
        as={Image}
        src={"/pizza.jpg"}
        height={400}
        width={500}
        objectFit="cover"
      />
      <Card.Body>
        <Link href={href}>
          <a className="link">
            <h5>{text}</h5>
          </a>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CTA;
