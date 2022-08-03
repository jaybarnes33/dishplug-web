import Intro from "@/components/App/Main/Intro";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Featured from "@/components/App/Main/Featured/Featured";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { FoodType } from "@/types";
import admin from "@/lib/firebase/node";

export const getStaticProps: GetStaticProps<{
  foods: FoodType[];
}> = async ({}) => {
  const db = admin.firestore();

  const products = await db.collectionGroup("products").limit(8).get();

  const foods = products.docs.map(doc => {
    const [, storeId] = doc.ref.path.split("/");

    return {
      id: doc.id,
      storeId,
      ...doc.data()
    } as FoodType;
  });

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
