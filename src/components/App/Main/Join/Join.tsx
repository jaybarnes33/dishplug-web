import React from "react";

import CTA from "../Cards/CTA";

const Join = () => {
  return (
    <div className="py-3">
      <h2 className="pt-5 pb-2 text-center">Join Us</h2>
      <div className="flex items-center justify-content-center pt-1 ">
        <CTA text="Become a seller" href="/sell" image={"/seller.jpg"} />

        <CTA text="Sign up to deliver" href="/deliver" image="/rider2.jpg" />

        <CTA text="Become a cook" href="/cook" image="/friedrice.jpg" />
      </div>
    </div>
  );
};

export default Join;
