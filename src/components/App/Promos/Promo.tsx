import colors from "@/styles/colors";
import Image from "next/image";
import React from "react";
import { Button } from "react-bootstrap";
import Pattern from "../../../../public/Pattern3.png";
interface PromoProps {
  name: string;
  desc: string;
  image: string;
  bg: string;
}
const Promo = ({ name, desc, image, bg }: PromoProps) => {
  return (
    <>
      <div className="d-flex gap-2 position-relative">
        <Image
          src={image}
          alt={name}
          width={140}
          height={140}
          objectFit="cover"
        />
        <div className="py-5">
          <h5 className="text-light fw-bold">{name}</h5>
          <br />
          <Button className="text-warning fw-bold" variant={"light"} size="sm">
            Coming Soon
          </Button>
        </div>

        <div className="position-absolute">
          <Image src={Pattern} alt=" " layout="fill" objectFit="cover" />
        </div>
      </div>
      <style jsx>
        {`
          div {
            flex: 1;
            width: 280px;
            border-radius: 12px;
            background-color: ${(colors as Record<string, string>)[bg]};
          }
        `}
      </style>
    </>
  );
};

export default Promo;
