import React from "react";
import Promo from "./Promo";

const Promos = () => {
  const promos = [
    {
      name: "Holiday Special",
      desc: "Get up to 15% discount on select meals on holidays",
      image: "/1.png",
      bg: "bg-dark"
    },
    {
      name: "Sunday Special",
      desc: "Get up to 10% discount on your unday orders",
      image: "/1.png",
      bg: "bg-accent"
    },

    {
      name: "Super Friends",
      desc: "Get up to 25% discount when you buy together with your friends",
      image: "/2.png",
      bg: "bg-primary2"
    }
  ];
  return (
    <div
      className="flex gap-2 my-3 justify-between"
      style={{ overflowX: "scroll" }}
    >
      {promos.map((promo, key) => (
        <Promo
          name={promo.name}
          image={promo.image}
          key={key}
          bg={promo.bg}
          desc={promo.desc}
        />
      ))}
    </div>
  );
};

export default Promos;
