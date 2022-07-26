import Rating from "@/components/App/Rating";
import foods from "@/data/foods";
import { FoodType } from "@/types";
import { iteratorSymbol } from "immer/dist/internal";
import Head from "next/head";
import Image from "next/image";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

const Food = () => {
  const { query } = useRouter();

  const [food, setFood] = useState<FoodType>({
    id: 0,
    name: "",
    price: 0,
    image: "",
    rating: 0,
  });
  useEffect(() => {
    console.log(query.id);
    setFood(foods[Number(query.id)]);
  }, [query]);
  return (
    <>
      <Head>
        <title>{food?.name}</title>
      </Head>
      <div className="mt-4 pt-5" style={{ minHeight: "70vh" }}>
        <Container className="pt-5">
          <Row className="d-flex align-items-center">
            <Col md={6} className="position-relative" style={{ height: 500 }}>
              {food?.image && <Image src={food?.image} layout="fill" alt="" />}
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{food?.name}</h1>
                  <Rating value={food?.rating} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="text-danger">GH{food?.price}.00</h2>
                </ListGroup.Item>
                <ListGroup.Item>{food?.rating} reviews</ListGroup.Item>
                <ListGroup.Item>
                  {food?.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Recusandae illum quo velit rem. Laudantium
                  dolore optio, sed labore maxime nesciunt corrupti ex facere
                  blanditiis dolorum aliquam nihil ut quaerat libero earum unde
                  cum. Deleniti quod mollitia consequuntur modi nostrum placeat
                  voluptatibus facere, quidem at error, tempore esse, totam
                  ipsum saepe?
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-grid gap-4">
                  <Button variant="danger" size="lg">
                    Add to cart
                  </Button>
                  <Button variant="outline-danger" size="lg">
                    Order now
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Food;
