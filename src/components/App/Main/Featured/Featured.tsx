import { FoodType } from "@/types";
import Link from "next/link";
import React from "react";

import { FaArrowRight } from "react-icons/fa";
import Food from "../Cards/Food";

interface IProps {
  foods: FoodType[];
}

const Featured = ({ foods }: IProps) => {
  return (
    <>
      <div
        className="pt-3 pb-1
        flex justify-between items-center"
      >
        <h2 className="text-center text-2xl font-bold">Featured Food</h2>

        <Link href="/meals" className="flex gap-3 items-center">
          View all
          <FaArrowRight className="ms-2" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 pt-1 md:gap-3">
        {foods.map((food, index) => (
          <div key={index}>
            <Food food={food} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Featured;
