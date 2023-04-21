import { FoodType, StoreType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { firestore } from "@/lib/firebase/client";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Food from "@/components/App/Main/Cards/Food";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Head from "next/head";

const Shops = () => {
  const {
    query: { id }
  } = useRouter();

  const [foods, setFoods] = useState<FoodType[]>([]);
  const [store, setStore] = useState<StoreType>();

  useEffect(() => {
    if (typeof id === "string") {
      (async () => {
        const storesRef = collection(firestore, "stores");

        const [foods, store] = await Promise.all([
          getDocs(collection(storesRef, id, "products")),
          getDoc(doc(firestore, "stores", id))
        ]);

        const foodsData = foods.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<FoodType, "id">)
        }));

        const storeData = {
          id: store.id,
          ...(store.data() as Omit<StoreType, "id">)
        };

        setStore(storeData);
        setFoods(foodsData);
      })();
    }
  }, [id]);

  return (
    <div>
      <Head>
        <title>{store?.name}</title>
        <meta name="description" content={store?.name} />
      </Head>
      <div
        className="flex justify-center items-center w-screen relative h-[40vh] "
        style={{
          backgroundColor: "#1a1a1aae",
          backgroundImage: `url(${store?.image ? store?.image : ""}`,
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
          backgroundPosition: "center"
        }}
      >
        <div className="flex items-center justify-center mt-4 pt-2 text-white">
          <div>
            <h1 className="text-center text-2xl font-bold tracking-wide">
              {store?.name}
            </h1>
            <div className="flex gap-4 items-center">
              <p className="flex items-center gap-1">
                <FaMapMarkerAlt /> {store?.city}
              </p>
              <p className="flex items-center gap-1 hover:text-primary2">
                <a
                  className="flex items-center gap-1"
                  href={`tel:+233${store?.contact.slice(1)}`}
                >
                  <FaPhoneAlt /> {store?.contact}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" md:px-[3rem] grid md:grid-cols-3 gap-3">
        {foods.map(food => (
          <Food food={food} key={food.id} />
        ))}
      </div>
    </div>
  );
};

export default Shops;
