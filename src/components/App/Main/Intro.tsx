import React from "react";
import styles from "@/styles/Home.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Search from "../Search/Search";

const Intro = () => {
  return (
    <div className={`${styles.intro} `}>
      <Container>
        <Row className="d-flex  align-items-center flex-column-reverse flex-md-row">
          <Col md={6}>
            <p className={` ${styles.text} `}>
              <span>Hey, what do you want to eat?</span>
            </p>
            <Search />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Intro;
