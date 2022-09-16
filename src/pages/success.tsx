import Image from "next/image";
import React from "react";
import Pattern from "../../public/pattern-success.png";
import { Button, Image as Circle } from "react-bootstrap";

import Link from "next/link";
const Success = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        style={{
          height: "40vh",
          position: "fixed",
          width: "100%",
          top: 0
        }}
      >
        <Image src={Pattern} layout="fill" alt="" objectFit="contain" />
      </div>
      <div
        style={{
          height: "40vh",
          position: "fixed",
          width: "100%",
          bottom: "25vh"
        }}
      >
        <Image src={Pattern} layout="fill" alt="" objectFit="contain" />
      </div>
      <div
        style={{
          height: "40vh",
          position: "fixed",
          width: "100%",
          bottom: 0
        }}
      >
        <Image src={Pattern} layout="fill" alt="" objectFit="contain" />
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center position-fixed w-100"
        style={{ height: "100vh" }}
      >
        <Circle
          src="/seller.webp"
          width={230}
          height={230}
          alt=""
          roundedCircle
          style={{ objectFit: "cover", border: "7px solid #F9A84D" }}
        />
        <div className="mt-5 text-center px-2">
          <h2>Your order is being processed</h2>
          <p>You should receive your meal in no time</p>
          <div className="d-grid gap-2">
            <Link href="/" passHref>
              <Button
                className="pt-2 mt-4 mx-2"
                style={{
                  border: "none",
                  borderRadius: 15,
                  background:
                    "linear-gradient(98.81deg, #FEAD1D -0.82%, #F9A84D 101.53%)"
                }}
                size="lg"
              >
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
