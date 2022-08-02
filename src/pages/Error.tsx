import Image from "next/image";
import React from "react";
import { Button } from "react-bootstrap";

const Error = () => {
  return (
    <div className="mt-5 pt-4 d-flex justify-content-center flex-column align-items-center">
      <div className="my-5  d-flex justify-content-center">
        <Image width={200} height={200} alt="Error" src="/500.webp" />
      </div>
      <p className="text-center fs-2">Something went wrong. </p>
      <Button variant="danger" onClick={() => window.location.reload()}>
        Try refreshing
      </Button>
    </div>
  );
};

export default Error;
