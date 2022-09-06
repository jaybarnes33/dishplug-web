import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from "next";
import type { FoodType } from "@/types";
import Head from "next/head";
import Image from "next/image";
import admin from "@/lib/firebase/node";
import { Badge, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { foodConverter } from "..";
import { useCart } from "@/components/Context/Cart";
import { currencyFormat } from "@/helpers/utils";
import { useAvailability } from "@/components/Context/Availability";
import Rating from "@/components/App/Rating";

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
  const { unavailableFoods } = useAvailability();

  const isUnavailable = unavailableFoods.includes(food.id);

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      store_id: food.store_id,
      store_name: food.store_name,
      store_phone: food.store_phone
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
        style={{ minHeight: "90vh", backgroundColor: "white" }}
      >
        <>
          <Row className="d-flex align-items-center">
            <Col
              md={6}
              className="position-fixed top-0 rounded"
              style={{ height: 500 }}
            >
              <Image
                src={food.image || ""}
                layout="fill"
                alt=""
                objectFit="cover"
                objectPosition="center"
              />
              {["75zBdBfJlCZP3i5Qdk8R", "ghrgy8qgGAJEpvS8CtNV"].includes(
                food.store_id
              ) && <Badge bg="dark"></Badge>}
            </Col>
            <Col
              md={6}
              style={{
                marginTop: 410,
                backgroundColor: "white"
              }}
            >
              <ListGroup variant="flush" style={{ borderRadius: 30 }}>
                <ListGroup.Item>
                  <h1>{food.name}</h1>
                  <Rating value={food.rating || 0} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="text-danger">{currencyFormat(food.price)}</h2>
                </ListGroup.Item>
                <ListGroup.Item>{food.rating || 0} reviews</ListGroup.Item>
                <ListGroup.Item>
                  {food.description} Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Delectus, illum! Possimus laudantium, alias
                  nobis maiores veniam eaque dolor dolorum! Tenetur, officia
                  ullam commodi vel labore delectus minus nihil doloremque
                  eligendi!
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-grid gap-4">
                  <Button
                    variant="dark"
                    size="lg"
                    style={
                      isUnavailable
                        ? {
                            color: "#212121",
                            border: "2px solid dark",
                            backgroundColor: "transparent"
                          }
                        : undefined
                    }
                    onClick={handleAddToCart}
                    disabled={isUnavailable}
                  >
                    {isUnavailable ? "NOT AVAILABLE" : "Add to cart"}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      </div>
    </>
  );
};

export default Food;
