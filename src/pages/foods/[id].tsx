import Rating from "@/components/App/Rating";
import { FoodType } from "@/types";
import { currencyFormat } from "@/helpers/utils";
import admin from "@/lib/firebase/node";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from "next";
import Head from "next/head";
import Image from "next/image";

import { Badge, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useCart } from "@/components/Context/Cart";
import { foodConverter } from "..";

export const getStaticPaths: GetStaticPaths = async () => {
  const db = admin.firestore();
  const products = await db.collectionGroup("products").get();

  const paths = products.docs.map(doc => ({ params: { id: doc.id } }));

  return {
    paths,
    fallback: "blocking" // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<{
  food: FoodType;
}> = async ({ params }) => {
  const db = admin.firestore();
  const products = await db
    .collectionGroup("products")
    .withConverter(foodConverter)
    .get();
  const foodDoc = products.docs.find(doc => doc.id === params?.id);

  const food = foodDoc ? foodDoc.data() : null;

  if (!food) {
    throw new Error(`missing document for ${params?.id}`);
  }

  return { props: { food }, revalidate: 1 };
};

const Food = ({ food }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      store_id: food.store_id,
      store_name: food.store_name
    });
  };

  return (
    <>
      <Head>
        <title>{food.name}</title>
        <meta
          name="keywords"
          content={`Tarkwa ${food.name}, ${food.description}`}
        />
        <meta name="description" content={food.description} />
        <meta property="og:image" content={food.image} />
      </Head>
      <div
        className="mt-4 pt-5 d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={6} className="position-relative" style={{ height: 500 }}>
              <Image
                src={food.image || ""}
                layout="fill"
                alt=""
                objectFit="contain"
              />
              {["75zBdBfJlCZP3i5Qdk8R", "ghrgy8qgGAJEpvS8CtNV"].includes(
                food.store_id
              ) && <Badge bg="dark"></Badge>}
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{food.name}</h1>
                  <Rating value={food.rating || 0} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="text-danger">{currencyFormat(food.price)}</h2>
                </ListGroup.Item>
                <ListGroup.Item>{food.rating || 0} reviews</ListGroup.Item>
                <ListGroup.Item>{food.description}</ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-grid gap-4">
                  <Button
                    variant="dark"
                    size="lg"
                    style={
                      food.available
                        ? undefined
                        : {
                            color: "#212121",
                            border: "2px solid dark",
                            backgroundColor: "transparent"
                          }
                    }
                    onClick={handleAddToCart}
                    disabled={!food.available}
                  >
                    {food.available ? "Add to cart" : "NOT AVAILABLE"}
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
