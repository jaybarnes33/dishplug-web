import React from "react";
import styles from "@/styles/Home.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Search from "../Search/Search";

const Intro = () => {
  return (
    <div
      className={`${styles.intro} d-flex justify-content-center align-items-center`}
    >
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={6} className="mt-3 pt-5">
            <p className={` ${styles.text} `}>
              <span>Hungry?</span> Order food and have it delivered in minutes.
            </p>
            <Search />
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <video loop autoPlay={true} muted>
              <source src="/videos/foods.webm"></source>
            </video>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Intro;
