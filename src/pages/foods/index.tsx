import Food from "@/components/App/Main/Cards/Food";

import admin from "@/lib/firebase/node";
import { FoodType } from "@/types";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Foods = ({ foods }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <section className="mt-4 pt-5" style={{ minHeight: "70vh" }}>
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
  const foods: FoodType[] = [];

  const storesRef = db.collection("stores");
  const docs = await storesRef.listDocuments();

  for (const doc of docs) {
    const products = await doc.collection("products").limit(4).get();
    const foodDocs = products.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as FoodType[];

    foods.push(...foodDocs);
  }

  return { props: { foods }, revalidate: 60 };
};

export default Foods;
