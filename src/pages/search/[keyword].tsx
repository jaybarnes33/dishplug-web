import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchBox from "@/components/App/Search/Search";
import styles from "@/styles/search.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { FoodType } from "@/types";
import foods from "@/data/foods";
import Food from "@/components/App/Main/Cards/Food";
const Search = () => {
  const [items, setItems] = useState<FoodType[]>(foods);

  return (
    <>
      <section className="mt-4">
        <Container fluid className="py-5">
          <Row>
            {foods.map((food, index) => (
              <Col xs={6} md={4} lg={3}>
                <Food food={food} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Search;
