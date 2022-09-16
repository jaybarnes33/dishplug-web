import colors from "@/styles/colors";
import Image from "next/image";
import React from "react";
import { Button } from "react-bootstrap";
import Pattern from "../../../../public/pattern-white.png";
interface PromoProps {
  name: string;

  image: string;
  bg: string;
}
const Promo = ({ name, image, bg }: PromoProps) => {
  return (
    <>
      <div className="main d-flex gap-2 position-relative p-2 justify-content-between">
        <Image
          src={image}
          alt={name}
          width={140}
          height={140}
          objectFit="cover"
        />
        <div className="py-5 position-relative" style={{ zIndex: 2 }}>
          <h5 className="text-light fw-bold">{name}</h5>

          <Button className="fw-bold text-warning" variant={"light"} size="sm">
            Coming Soon
          </Button>
        </div>

        <div
          className="position-absolute"
          style={{ top: 0, right: 0, width: "60%", height: "100%", zIndex: 1 }}
        >
          <Image src={Pattern} alt=" " layout="fill" objectFit="cover" />
        </div>
      </div>
      <style jsx>
        {`
          .main {
            flex: 1;
            width: 280px;
            border-radius: 12px;
            background-color: ${(colors as Record<string, string>)[bg]};
          }
          div {
            width: 280px;
          }
        `}
      </style>
    </>
  );
};

export default Promo;
