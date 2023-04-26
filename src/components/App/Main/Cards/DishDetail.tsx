import { useAvailability } from "@/components/Context/Availability";
import { useCart } from "@/components/Context/Cart";
import { currencyFormat } from "@/helpers/utils";
import { useModal } from "@/hooks/useModal";

import { FoodType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsX } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const DishDetail = ({ food }: { food: FoodType }) => {
  const { addToCart, itemsInCart } = useCart();
  const { unavailableFoods } = useAvailability();
  const { toggle } = useModal();
  const isUnavailable = unavailableFoods.includes(food.id);

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      store_id: food.store_id,
      store_name: food.store_name,
      store_city: food?.store_city,
      store_phone: food.store_phone
    });
  };

  return (
    <div className="relative shadow-md bg-white w-full  md:w-[500px] rounded-xl pb-4 top-[-5rem] md:top-0">
      <div className="h-72 relative">
        <Image
          src={food.image || ""}
          fill
          alt=""
          className="w-full max-h-[350px] object-cover rounded-t-xl"
        />
      </div>

      <button
        onClick={toggle}
        className="absolute top-3 right-3 bg-white rounded-full h-10 w-10 flex justify-center items-center focus:outline-none"
      >
        <BsX size={20} />
      </button>
      <div className="px-3">
        <div className="my-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mt-1">{food.name}</h1>

            <h2 className="mt-1 text-primary">{currencyFormat(food.price)}</h2>
          </div>

          <p className="mt-1">{food.description}</p>
          <p className="mt-1">{food.rating || 0} reviews</p>
        </div>

        <div className="flex justify-between flex-wrap  mt-2  w-full  gap-2">
          <button
            className="w-full bg-primary2 hover:bg-primary text-neutral-100 px-2 py-3 rounded focus:outline-none"
            onClick={handleAddToCart}
            disabled={isUnavailable}
          >
            {isUnavailable ? "NOT AVAILABLE" : "Add to my order"}
          </button>
          {itemsInCart > 0 && (
            <Link
              href="/checkout/address"
              className="w-full border rounded border-neutral-700 px-2 py-3 text-neutral-700 hover:bg-neutral-700 hover:text-neutral-100"
            >
              <button className="w-full">Proceed to checkout</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
