import Image from "next/image";
import React from "react";

import Link from "next/link";
import colors from "@/styles/colors";
const Success = () => {
  return (
    <div
      className="flex  top-0 flex-col bg-white items-center justify-center fixed w-full min-h-full z-[5]"
      style={{ height: "100vh" }}
    >
      <Image
        src="/seller.webp"
        width={230}
        className="rounded-full h-[200px] w-[200px]"
        height={230}
        alt=""
      />
      <div className="mt-5 text-center px-2">
        <h2>Your order is being processed</h2>
        {/* <p>Refer a friend and get up to 25% discount on your next order</p> */}
        <div className="flex justify-center gap-2">
          {/* <Link href="/refer" passHref>
            <button className="py-2 mt-4 mx-2">Refer a friend</button>
          </Link> */}
          <Link href="/" passHref>
            <button
              className="pt-2 mt-4 mx-2"
              style={{
                border: "none",
                borderRadius: 15,
                background: "white",
                color: colors.primary
              }}
            >
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
