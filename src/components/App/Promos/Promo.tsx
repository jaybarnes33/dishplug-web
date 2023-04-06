import colors from "@/styles/colors";
import Image from "next/image";
import React from "react";

import Pattern from "../../../../public/pattern-white.png";
interface PromoProps {
  name: string;
  desc: string;
  image: string;
  bg: string;
}
const Promo = ({ name, image, bg, desc }: PromoProps) => {
  return (
    <div className="w-full h-[160px] relative child-hover:z-[-1] ">
      <div
        className={`flex w-full h-full ${bg} rounded-xl gap-2 relative p-2  items-center `}
      >
        <Image src={image} alt={name} width={140} height={140} />
        <div className="py-5 relative" style={{ zIndex: 2 }}>
          <h5 className="text-neutral-100 font-semibold  tracking-wide text-2xl">
            {name}
          </h5>
        </div>

        <div
          className="absolute"
          style={{ top: 0, right: 0, width: "60%", height: "100%", zIndex: 1 }}
        >
          <Image src={Pattern} alt=" " fill />
        </div>
      </div>
      <div className="absolute rounded-xl w-full h-full top-0 left-0 z-[-3] bg-[#1a1a1a] grid place-items-center px-2 text-white">
        {desc}
      </div>
    </div>
  );
};

export default Promo;
