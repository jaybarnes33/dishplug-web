import CTA from "@/components/App/Main/Cards/CTA";
import Join from "@/components/App/Main/Join/Join";
import Intro from "@/components/App/Main/Intro";
import Header from "@/components/Layout/Header";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Featured from "@/components/App/Main/Featured/Featured";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { FoodType } from "@/types";
import admin from "@/lib/firebase/node";
import { collection, FirestoreDataConverter } from "firebase/firestore/lite";

// const foodConverter:FirestoreDataConverter<FoodType[]> = {
//   toFirestore(store) {
//     return store.
//   }
//   // toFirestore: (city) => {
//   //     return {
//   //         name: city.name,
//   //         state: city.state,
//   //         country: city.country
//   //         };
//   // },
//   fromFirestore: (snapshot, options) => {
//       const data = snapshot.data(options);
//       return new City(data.name, data.state, data.country);
//   }
// };

export const getStaticProps: GetStaticProps<{
  foods: FoodType[];
}> = async ({}) => {
  const db = admin.firestore();
  const foods: FoodType[] = [];

  const storesRef = db.collection("stores");
  const docs = await storesRef.listDocuments();

  for (const doc of docs) {
    const products = await doc.collection("products").limit(4).get();
    const foodDocs = products.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as FoodType[];

    foods.push(...foodDocs);
  }

  return { props: { foods }, revalidate: 60 };
};

export default function Home({
  foods
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dishplug || Have your food delivered in minutes.</title>
        <meta name="description" content="Your meal is just a click away." />
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
