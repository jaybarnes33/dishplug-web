import React from "react";

import Image from "next/image";
import Link from "next/link";
const CTA = ({
  text,
  href,
  image
}: {
  text: string;
  href: string;
  image: string;
}) => {
  return (
    <div style={{ border: "none" }}>
      <Image alt="" src={image || ""} height={300} width={300} />
      <div>
        <Link href={href}>
          <a className="link">
            <h5>{text}</h5>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CTA;
