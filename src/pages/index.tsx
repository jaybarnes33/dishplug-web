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
  const foods: FoodType[] = [];

  const storesRef = db.collection("stores");
  const docs = await storesRef.listDocuments();

  for (const doc of docs) {
    const products = await doc.collection("products").get();
    const name = (await doc.get()).data()?.name;
    const foodDocs = products.docs.map((product) => ({
      id: product.id,
      storeId: doc.id,
      storeName: name,
      ...product.data(),
    })) as unknown as FoodType[];

    foods.push(...foodDocs);
  }

  return { props: { foods }, revalidate: 1 };
};

export default function Home({
  foods,
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
