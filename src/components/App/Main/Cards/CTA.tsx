import React from "react";
import { Card, CardImg, NavLink } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
const CTA = ({
  text,
  href,
  image
}: {
  text: string;
  href: string;
  image: string;
}) => {
  return (
    <Card style={{ border: "none" }}>
      <CardImg
        as={Image}
        src={image || ""}
        height={300}
        width={300}
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
