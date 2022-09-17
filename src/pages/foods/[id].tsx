import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from "next";
import type { FoodType } from "@/types";
import Head from "next/head";
import Image from "next/image";
import admin from "@/lib/firebase/node";
import { Badge, Button, Card, Image as RoundImg, Toast } from "react-bootstrap";
import { foodConverter } from "..";
import { useCart } from "@/components/Context/Cart";
import { currencyFormat } from "@/helpers/utils";
import { useAvailability } from "@/components/Context/Availability";
import Rating from "@/components/App/Rating";

import colors from "@/styles/colors";
import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

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

  db.doc("get_static_props/food").set({
    count: FieldValue.increment(1),
    date: Timestamp.now()
  });

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
  const [toast, setToast] = useState<boolean>(false);
  const { addToCart, itemsInCart } = useCart();
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

    setToast(true);
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
        <div
          className="position-fixed top-0 end-0 me-3 mt-4 pt-1 d-flex align-items-center justify-content-center"
          style={{
            zIndex: 9,
            backgroundColor: colors.white,
            width: 40,
            height: 40,
            borderRadius: 40
          }}
        >
          <FaShoppingCart color={colors.accent2} />
          <sup className="position-absolute end-0 mt-2 ms-2">
            <Badge bg="danger">{itemsInCart}</Badge>
          </sup>
        </div>
        <>
          <div
            className="position-fixed top-0 rounded"
            style={{ height: "50vh", width: "100%" }}
          >
            <Image
              src={food.image || ""}
              layout="fill"
              alt=""
              objectFit="cover"
              objectPosition="center"
            />
          </div>

          <div
            style={{
              marginTop: "35vh",
              width: "100vw"
            }}
          >
            <Card
              style={{
                backgroundColor: "white!important",
                border: "none",
                borderRadius: 30
              }}
            >
              <Card.Body>
                <p>
                  <h1>{food.name}</h1>
                  <Rating value={food.rating || 0} />
                </p>
                <p>
                  <h2 style={{ color: colors.accent2 }}>
                    {currencyFormat(food.price)}
                  </h2>
                </p>
                <p>{food.description}</p>
                <p>{food.rating || 0} reviews</p>
              </Card.Body>

              <div
                className="d-grid place-items-center px-3 position-fixed w-100 left-0"
                style={{ bottom: "3rem" }}
              >
                <Button
                  size="lg"
                  style={
                    isUnavailable
                      ? {
                          color: "#212121",
                          border: "2px solid dark",
                          backgroundColor: "transparent"
                        }
                      : {
                          backgroundColor: colors.accent,
                          border: "none"
                        }
                  }
                  onClick={handleAddToCart}
                  disabled={isUnavailable}
                >
                  {isUnavailable ? "NOT AVAILABLE" : "Add to cart"}
                </Button>
                <Toast
                  animation
                  className="position-absolute me-2"
                  style={{ top: "-5rem", right: 0 }}
                  onClose={() => setToast(false)}
                  show={toast}
                  delay={5000}
                  autohide
                >
                  <Toast.Header>
                    <RoundImg
                      rounded
                      alt={food.name}
                      src={food.image}
                      width={20}
                      height={20}
                    />
                    <span className="px-2">
                      {food.name} has been added to your cart
                    </span>
                  </Toast.Header>
                  <Toast.Body className="text-primary">
                    <Link href="/checkout/address">Proceed to checkout?</Link>
                  </Toast.Body>
                </Toast>
              </div>
            </Card>
          </div>
        </>
      </div>
    </>
  );
};

export default Food;
