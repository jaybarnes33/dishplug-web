import { FoodType, StoreType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { firestore } from "@/lib/firebase/client";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Food from "@/components/App/Main/Cards/Food";
import { FaMapMarkerAlt, FaPhone, FaPhoneAlt } from "react-icons/fa";

const Shops = () => {
  const {
    query: { id }
  } = useRouter();

  const [foods, setFoods] = useState<FoodType[]>([]);
  const [store, setStore] = useState<StoreType>();

  useEffect(() => {
    (async () => {
      const storesRef = collection(firestore, "stores");

      const [foods, store] = await Promise.all([
        getDocs(collection(storesRef, id as string, "products")),
        getDoc(doc(firestore, "stores", id as string))
      ]);

      const foodsData = foods.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<FoodType, "id">)
      }));

      const storeData = {
        id: store.id,
        ...(store.data() as Omit<StoreType, "id">)
      };
      console.log(storeData);
      setStore(storeData);
      setFoods(foodsData);
    })();
  }, [id]);

  return (
    <div>
      <div
        className="d-flex align-items-center"
        style={{ backgroundColor: "var(--dp-primary)", minHeight: "50vh" }}
      >
        <Container className="d-flex align-items-center justify-content-center mt-4 pt-2">
          <div className="text-center">
            <h1 className="text-center">{store?.name}</h1>
            <div className="d-flex gap-4">
              <p className="d-flex align-items-center gap-1">
                <FaMapMarkerAlt /> {store?.city}
              </p>
              <p className="d-flex align-items-center gap-1">
                <a href={`tel:+233${store?.contact.slice(1)}`}>
                  {" "}
                  <FaPhoneAlt /> {store?.contact}
                </a>{" "}
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <Row>
          {foods.map(food => (
            <Col xs={6} md={4} lg={3} key={food.id}>
              <Food food={food} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Shops;
