import Rating from "@/components/App/Rating";
import { currencyFormat } from "@/helpers/utils";
import admin from "@/lib/firebase/node";
import type { FoodType } from "@/types";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from "next";
import Head from "next/head";
import Image from "next/image";

import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

export const getStaticPaths: GetStaticPaths = async () => {
  const db = admin.firestore();
  const storesRef = db.collection("stores");
  const docs = await storesRef.listDocuments();

  const paths = [];

  for (const doc of docs) {
    const products = await doc.collection("products").get();
    paths.push(...products.docs.map(doc => ({ params: { id: doc.id } })));
  }

  console.log(paths);

  return {
    paths,
    fallback: false // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<{
  food: FoodType;
}> = async ({ params }) => {
  const db = admin.firestore();
  const storesRef = db.collection("stores");
  const docs = await storesRef.listDocuments();

  let foodDoc: FoodType | null = null;

  for (const doc of docs) {
    const products = await doc.collection("products").get();
    const food = products.docs.find(doc => doc.id === params?.id);

    if (!food) {
      throw new Error(`missing document for ${params?.id}`);
    }

    foodDoc = { id: food.id, ...food.data() } as unknown as FoodType;
  }

  if (!foodDoc) {
    throw new Error(`missing document for ${params?.id}`);
  }

  return { props: { food: foodDoc }, revalidate: 60 };
};

const Food = ({ food }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{food.name}</title>
      </Head>
      <div className="mt-4 pt-5" style={{ minHeight: "70vh" }}>
        <Container className="pt-5">
          <Row className="d-flex align-items-center">
            <Col md={6} className="position-relative" style={{ height: 500 }}>
              <Image
                src={food.image}
                layout="fill"
                alt=""
                objectFit="contain"
              />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{food.name}</h1>
                  <Rating value={food.rating} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="text-danger">{currencyFormat(food.price)}</h2>
                </ListGroup.Item>
                <ListGroup.Item>{food.rating || 0} reviews</ListGroup.Item>
                <ListGroup.Item>{food.description}</ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-grid gap-4">
                  <Button variant="dark" size="lg">
                    Add to cart
                  </Button>
                  <Button variant="outline-dark" size="lg">
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
