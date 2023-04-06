import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from "next";
import type { FoodType } from "@/types";
import Head from "next/head";
import Image from "next/image";
import admin from "@/lib/firebase/node";

import { foodConverter } from "..";
import { useCart } from "@/components/Context/Cart";
import { currencyFormat } from "@/helpers/utils";
import { useAvailability } from "@/components/Context/Availability";
import Rating from "@/components/App/Rating";

import colors from "@/styles/colors";
import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export const getStaticPaths: GetStaticPaths = async () => {
  const db = admin.firestore();
  const products = await db.collectionGroup("products").get();

  const paths = products.docs.map(doc => ({ params: { id: doc.id } }));

  return {
    paths,
    fallback: "blocking" // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<{
  food: FoodType;
}> = async ({ params }) => {
  const db = admin.firestore();

  const products = await db
    .collectionGroup("products")
    .withConverter(foodConverter)
    .get();

  const foodDoc = products.docs.find(doc => doc.id === params?.id);
  const food = foodDoc ? foodDoc.data() : null;

  if (!food) {
    throw new Error(`missing document for ${params?.id}`);
  }

  return { props: { food }, revalidate: 60 };
};

const Food = ({ food }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { addToCart, itemsInCart } = useCart();
  const { unavailableFoods } = useAvailability();

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
    <>
      <Head>
        <title>{food.name}</title>
        <meta
          name="keywords"
          content={`Tarkwa ${food.name}, ${food.description}`}
        />
        <meta name="description" content={food.description} />
        <meta property="og:image" content={food.image} />
      </Head>
      <div
        className="relative mt-4 pt-5 flex flex-col md:px-[30%]"
        style={{ minHeight: "90vh", backgroundColor: "white" }}
      >
        <div className="bg-white shadow-md p-3 rounded-xl">
          <Image
            src={food.image || ""}
            width={200}
            height={130}
            alt=""
            className="w-full h-[450px] rounded-xl"
          />

          <div>
            <div>
              <div className="my-1">
                <h1 className="text-2xl font-bold mt-1">{food.name}</h1>

                <h2 className="mt-1" style={{ color: colors.accent2 }}>
                  {currencyFormat(food.price)}
                </h2>

                <p className="mt-1">{food.description}</p>
                <p className="mt-1">{food.rating || 0} reviews</p>
              </div>

              <div
                className="flex justify-between flex-wrap  mt-2  w-full  gap-2"
                style={{ bottom: "2rem" }}
              >
                <button
                  className="w-full bg-primary hover:bg-primary2 text-neutral-100 px-2 py-3 rounded"
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
        </div>
      </div>
    </>
  );
};

export default Food;
