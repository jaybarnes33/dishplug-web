import React from "react";
import styles from "@/styles/Home.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Search from "../Search/Search";
import Pattern from "../../../../public/Pattern2.png";
import Image from "next/image";
import Promos from "../Promos/Promos";

const Intro = () => {
  return (
    <span className={`${styles.intro} mt-5`}>
      <h1 className="pb-3 pt-4 mt-5 pe-5 me-5">
        Hey, what do you want to eat?
      </h1>

      <div
        style={{
          width: "100%",
          backgroundColor: "#f4f4f4",
          zIndex: 100,
          position: "sticky",
          top: "3.5rem",
          overflowX: "hidden",
          borderBottom: "1px solid rgb(238, 238, 238)"
        }}
      >
        <Search />
      </div>
      <Promos />

      <div className="position-fixed top-0 end-0">
        <Image src={Pattern} alt=" " objectPosition={"right"} />
      </div>
    </span>
  );
};

export default Intro;
