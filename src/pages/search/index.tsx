import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FoodType } from "@/types";

import Food from "@/components/App/Main/Cards/Food";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import admin from "@/lib/firebase/node";
import { useKeyword } from "@/hooks/useKeyWord";

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

const Search = ({
  foods: items,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const keyword = useKeyword();
  useEffect(() => {
    console.log(keyword);
    if (items) {
      setFoods(
        items.filter((item) =>
          [item.name, item.description].some((i) =>
            i?.toLowerCase().includes(String(keyword))
          )
        )
      );
    }
  }, [keyword, items]);
  return (
    <>
      <section className="mt-4" style={{ minHeight: "70vh" }}>
        <Container className="py-5">
          {foods.length ? (
            <Row>
              {foods.map((food, index) => (
                <Col xs={6} md={4} lg={3} key={index}>
                  <Food food={food} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-danger">
              Your search for {keyword} didn&apos;t match any
            </p>
          )}
        </Container>
      </section>
    </>
  );
};

export default Search;
