import React from "react";
import styles from "@/styles/Home.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Search from "../Search/Search";
import Pattern from "../../../../public/Pattern2.png";
import Image from "next/image";
import Promos from "../Promos/Promos";

const Intro = () => {
  return (
    <div className={`${styles.intro} mt-5`}>
      <Container>
        <h1 className="pt-5 mt-5 mb-3 pe-5 me-5">
          Hey, what do you want to eat?
        </h1>

        <Search />
        <Promos />

        <div className="position-fixed top-0 end-0">
          <Image src={Pattern} alt=" " objectPosition={"right"} />
        </div>
      </Container>
    </div>
  );
};

export default Intro;
