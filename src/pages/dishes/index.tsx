import Food from "@/components/App/Main/Cards/Food";
import { useMealsByLocation } from "@/hooks/useMealsByLocation";

import admin from "@/lib/firebase/node";
import type { FoodType } from "@/types";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { foodConverter } from "..";

const Foods = ({ foods }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const sortedFoods = useMealsByLocation(foods);

  return (
    <section className="pt-2" style={{ minHeight: "90vh" }}>
      <Head>
        <title>Dishes</title>
        <meta
          name="keywords"
          content="Food delivery in Ghana, Food in Tarkwa, UMaT Food, Tarkwa Fried Rice, Hostel Crust Pizza"
        />
      </Head>
      <h2 className="text-2xl font-bold mt-5">Dishes</h2>
      <div>
        <div className="grid md:grid-cols-3 gap-3">
          {sortedFoods.map(food => (
            <Food key={food.id} food={food} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps<{
  foods: FoodType[];
}> = async ({}) => {
  const db = admin.firestore();

  const products = await db
    .collectionGroup("products")
    .orderBy("available", "desc")
    .withConverter(foodConverter)
    .get();

  const foods = products.docs.map(doc => {
    return doc.data();
  });

  return {
    props: { foods },
    revalidate: 60
  };
};

export default Foods;
