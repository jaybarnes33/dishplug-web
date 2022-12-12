import Food from "@/components/App/Main/Cards/Food";
import useFoodsInCity from "@/hooks/useFoodsInCity";

import admin from "@/lib/firebase/node";
import type { FoodType } from "@/types";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Col, Container, Row } from "react-bootstrap";
import { foodConverter } from ".";

const Foods = ({ foods }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { query } = useRouter();
  const foodsInCity = useFoodsInCity(foods, query.city as string);

  return (
    <section className="mt-5 pt-5" style={{ minHeight: "90vh" }}>
      <Head>
        <title>Foods</title>
        <meta
          name="keywords"
          content="Food delivery in Ghana, Food in Tarkwa, UMaT Food, Tarkwa Fried Rice, Hostel Crust Pizza"
        />
      </Head>
      <h2 className="text-center mt-5">Foods</h2>
      <Container>
        <Row>
          {foodsInCity.map((food, index) => (
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
