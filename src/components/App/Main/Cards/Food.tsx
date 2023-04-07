import React from "react";

import Image from "next/image";
import type { FoodType } from "@/types";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { currencyFormat } from "@/helpers/utils";
import { useCart } from "@/components/Context/Cart";
import { useRouter } from "next/router";
import { useAvailability } from "@/components/Context/Availability";

const Food = ({ food }: { food: FoodType }) => {
  const { pathname } = useRouter();
  const { addToCart } = useCart();
  const { unavailableFoods } = useAvailability();

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
      <Link href={`/foods/${food.id}`}>
        <Image
          alt={food.name}
          src={food.image || "/"}
          className="w-full h-[160px] rounded-xl object-cover"
          width={100}
          height={100}
        />
      </Link>
      {unavailableFoods.includes(food.id) ? (
        <p>Not available</p>
      ) : (
        <button
          className="flex justify-center items-center w-7 h-7 bg-yellow-600 rounded-full text-white absolute top-3 right-3"
          onClick={handleAddToCart}
        >
          <FaShoppingCart color="white" size={15} />
        </button>
      )}

      <div className="mb-2 px-2">
        <div className="flex flex-col ">
          <Link href={`/foods/${food.id}`}>
            <h6 className="capitalize font-semibold mt-1 text-lg">
              {food.name}
            </h6>
          </Link>

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
