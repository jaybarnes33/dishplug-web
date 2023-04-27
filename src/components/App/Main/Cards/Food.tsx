import React from "react";

import Image from "next/image";
import type { FoodType } from "@/types";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { currencyFormat } from "@/helpers/utils";
import { useCart } from "@/components/Context/Cart";
import { useRouter } from "next/router";
import { useAvailability } from "@/components/Context/Availability";
import { useModal } from "@/hooks/useModal";
import DishDetail from "./DishDetail";

const Food = ({ food }: { food: FoodType }) => {
  const { pathname } = useRouter();
  const { addToCart } = useCart();
  const { unavailableFoods } = useAvailability();
  const { toggle, setSelected } = useModal();
  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      store_id: food.store_id,
      store_name: food.store_name,
      store_city: food.store_city,
      store_phone: food.store_phone
    });
  };

  return (
    <div className="relative my-3 p-2 hover:shadow-md hover:bg-white rounded-xl ">
      <div className="relative h-36">
        <>
          <Image
            onClick={() => {
              toggle();
              setSelected(<DishDetail food={food} />);
            }}
            alt={food.name}
            src={food.image || "/"}
            className="w-full h-[170px] rounded-xl object-cover object-center"
            fill
          />
        </>
        {unavailableFoods.includes(food.id) ? (
          <div className="absolute top-0 left-0 text-neutral-100 grid place-items-center w-full h-full bg-[#1a1a1aee] rounded-xl ">
            <p>This meal is not available now</p>
          </div>
        ) : (
          <button
            className="flex justify-center items-center w-7 h-7 bg-white rounded-full text-neutral-600 absolute top-3 right-3"
            onClick={handleAddToCart}
          >
            <FaShoppingCart size={15} />
          </button>
        )}
      </div>

      <div className="mb-2 px-2">
        <div className="flex flex-col ">
          <h6
            className="capitalize cursor-pointer font-semibold mt-1 text-lg"
            onClick={() => {
              toggle();
              setSelected(<DishDetail food={food} />);
            }}
          >
            {food.name}
          </h6>

          <small className="text-primary text-sm  mt-1">
            {currencyFormat(food.price)}
          </small>
          {!pathname.includes("stores") && (
            <div className="flex gap-2  text-neutral-500 mt-1">
              <Link href={`/stores/${food.store_id}`}>
                <small className=" flex gap-1 items-center">
                  {food.store_name}
                </small>
              </Link>
              <small className=" flex gap-1 items-center">
                {food.store_city}
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Food;
