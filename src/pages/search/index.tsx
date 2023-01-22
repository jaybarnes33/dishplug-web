import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FoodType } from "@/types";

import Food from "@/components/App/Main/Cards/Food";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import admin from "@/lib/firebase/node";
import { useMealsByLocation } from "@/hooks/useMealsByLocation";
import { foodConverter } from "..";
import { useSearch } from "@/components/Context/Search";

export const getStaticProps: GetStaticProps<{
  foods: FoodType[];
}> = async ({}) => {
  const db = admin.firestore();

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
  const { debouncedKeyword: keyword } = useSearch();
  const [foods, setFoods] = useState<FoodType[]>([]);
  const sortedFoods = useMealsByLocation(foods);

  useEffect(() => {
    if (items) {
      setFoods(
        items.filter(item => {
          return [item.name, item.description].some(i =>
            i?.toLowerCase().includes(keyword.toLowerCase())
          );
        })
      );
    }
  }, [keyword, items]);

  return (
    <>
      <section className="mt-5 pt-5" style={{ minHeight: "90vh" }}>
        <Container className="py-5">
          {sortedFoods.length ? (
            <Row>
              {sortedFoods.map((food, index) => (
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
