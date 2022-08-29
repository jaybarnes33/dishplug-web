import React from "react";
import styles from "@/styles/Home.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Search from "../Search/Search";
import Pattern from "../../../../public/Pattern2.png";
import Image from "next/image";

const Intro = () => {
  return (
    <div className={`${styles.intro} `}>
      <Container>
        <Row className="d-flex  align-items-center flex-column-reverse flex-md-row pt-5">
          <Col md={6}>
            <p className={` ${styles.text} `}>
              <span>Hey, what do you want to eat?</span>
            </p>
            <Search />
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
