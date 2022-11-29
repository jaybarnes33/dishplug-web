import Image from "next/image";
import React from "react";
import Pattern from "../../public/pattern-success.png";
import { Button, Image as Circle } from "react-bootstrap";

import Link from "next/link";
import colors from "@/styles/colors";
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
          style={{ objectFit: "cover", border: "7px solid var(--dp-primary)" }}
        />
        <div className="mt-5 text-center px-2">
          <h2>Your order is being processed</h2>
          {/* <p>Refer a friend and get up to 25% discount on your next order</p> */}
          <div className="d-flex justify-content-center gap-2">
            {/* <Link href="/refer" passHref>
              <Button
                className="pt-2 mt-4 mx-2"
                size="lg"
                style={{
                  border: "none",
                  borderRadius: 15,
                  background:
                    "linear-gradient(98.81deg, #FEAD1D -0.82%, #F9A84D 101.53%)"
                }}
              >
                Refer a friend
              </Button>
            </Link> */}
            <Link href="/" passHref>
              <Button
                size="lg"
                className="pt-2 mt-4 mx-2"
                style={{
                  border: "none",
                  borderRadius: 15,
                  background: "white",
                  color: colors.accent
                }}
              >
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
