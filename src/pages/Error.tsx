import Image from "next/image";
import React from "react";

const Error = () => {
  return (
    <div className="mt-5 pt-5 flex justify-content-center flex-column items-center">
      <div className="my-5  flex justify-content-center">
        <Image width={200} height={200} alt="Error" src="/500.webp" />
      </div>
      <p className="text-center fs-2">Something went wrong. </p>
      <button onClick={() => window.location.reload()}>Try refreshing</button>
    </div>
  );
};

export default Error;
