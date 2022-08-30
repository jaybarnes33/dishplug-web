import React from "react";
import styles from "@/styles/Home.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Search from "../Search/Search";
import Pattern from "../../../../public/Pattern2.png";
import Image from "next/image";
import Promos from "../Promos/Promos";

const Intro = () => {
  return (
    <div className={`${styles.intro} `}>
      <Container>
        <Row className="d-flex  align-items-center flex-column-reverse flex-md-row pt-5">
          <Col sm={12}>
            <h1 className="pt-3 pe-5 me-5">Hey, what do you want to eat?</h1>

            <Search />
            <Promos />
          </Col>
          <div className="position-fixed top-0 end-0">
            <Image src={Pattern} alt=" " objectPosition={"right"} />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Intro;
