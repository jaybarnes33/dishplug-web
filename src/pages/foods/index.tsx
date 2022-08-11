import Food from "@/components/App/Main/Cards/Food";

import admin from "@/lib/firebase/node";
import { FoodType } from "@/types";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { Col, Container, Row } from "react-bootstrap";

const Foods = ({ foods }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <section className="mt-4 pt-5" style={{ minHeight: "90vh" }}>
      <Head>
        <title>Foods</title>
        <meta
          name="keywords"
          content="Food delivery in Ghana, Food in Tarkwa, UMaT Food, Tarkwa Fried Rice, Hostel Crust Pizza"
        />
      </Head>
      <h2 className="text-center">Foods</h2>
      <Container>
        <Row>
          {foods.map((food, index) => (
            <Col xs={6} md={4} lg={3} key={index}>
              <Food food={food} />
            </Col>
          ))}
        </Row>
      </Container>
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
    .get();

  const foods = products.docs.map(doc => {
    const [, storeId] = doc.ref.path.split("/");

    return {
      id: doc.id,
      storeId,
      ...doc.data()
    } as unknown as FoodType;
  });

  return { props: { foods }, revalidate: 1 };
};

export default Foods;
