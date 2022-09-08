import React from "react";
import Promo from "./Promo";

const Promos = () => {
  const promos = [
    {
      name: "Sunday Special",
      desc: "Get up to 10% discount on your sunday orders",
      image: "/1.png",
      bg: "primary"
    },
    {
      name: "Super Friends",
      desc: "Get up to 25% discount when you buy together with your friends",
      image: "/2.png",
      bg: "dark"
    },
    {
      name: "Holiday Special",
      desc: "Get up to 15% discount on select meals on holidays",
      image: "/1.png",
      bg: "accent"
    }
  ];
  return (
    <div
      className="d-flex gap-2 my-3 justify-content-between"
      style={{ height: 160, overflowX: "scroll" }}
    >
      {promos.map((promo, key) => (
        <Promo
          name={promo.name}
          desc={promo.desc}
          image={promo.image}
          key={key}
          bg={promo.bg}
        />
      ))}
    </div>
  );
};

export default Promos;
