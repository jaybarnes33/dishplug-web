import Intro from "@/components/App/Main/Intro";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Featured from "@/components/App/Main/Featured/Featured";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { FoodType } from "@/types";
import admin from "@/lib/firebase/node";
import type { FirestoreDataConverter } from "firebase-admin/firestore";

export const foodConverter: FirestoreDataConverter<FoodType> = {
  toFirestore(item) {
    return {
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      store: {
        id: item.store_id,
        name: item.store_name,
        contact: item.store_phone
      }
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      name: data.name,
      price: data.price,
      image: data.image,
      available: data.available,
      store_id: data.store.id,
      store_name: data.store.name,
      store_phone: data.store.contact
    };
  }
};

export const getStaticProps: GetStaticProps<{
  foods: FoodType[];
}> = async ({}) => {
  const db = admin.firestore();

  const products = await db
    .collectionGroup("products")
    .limit(4)
    .where("store.id", "==", "YFCveCnKxblPWRtyytdq")

    .withConverter(foodConverter)
    .get();

  const foods = products.docs.reverse().map(doc => {
    return doc.data();
  });

  return { props: { foods }, revalidate: 1 };
};

export default function Home({
  foods
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dishplug || Have your food delivered in minutes.</title>
        <meta name="description" content="Your meal is just a click away." />
        <meta
          name="keywords"
          content="Food delivery in Ghana, Food in Tarkwa, UMaT Food, Tarkwa Fried Rice, Hostel Crust Pizza"
        />
        <meta property="og:image" content="/logo2.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Intro />
        <Featured foods={foods} />
        {/* <Join /> */}
      </main>
    </div>
  );
}
