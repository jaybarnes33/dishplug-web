import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FoodType } from "@/types";

import Food from "@/components/App/Main/Cards/Food";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import admin from "@/lib/firebase/node";
import { useKeyword } from "@/hooks/useKeyWord";
import { foodConverter } from "..";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export const getStaticProps: GetStaticProps<{
  foods: FoodType[];
}> = async ({}) => {
  const db = admin.firestore();

  db.doc("get_static_props/search").set({
    count: FieldValue.increment(1),
    date: Timestamp.now()
  });

  const products = await db
    .collectionGroup("products")
    .withConverter(foodConverter)
    .get();

  const foods = products.docs.map(doc => {
    return doc.data();
  });

  return { props: { foods }, revalidate: 60 };
};

const Search = ({
  foods: items
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const keyword = useKeyword();
  useEffect(() => {
    if (items) {
      setFoods(
        items.filter(item =>
          [item.name, item.description].some(i =>
            i?.toLowerCase().includes(String(keyword.toLowerCase()))
          )
        )
      );
    }
  }, [keyword, items]);
  return (
    <>
      <section className="mt-5 pt-5" style={{ minHeight: "90vh" }}>
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
