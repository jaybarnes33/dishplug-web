import Image from "next/image";
import Link from "next/link";
import React from "react";

import { FaEnvelope, FaPhoneAlt, FaTwitter, FaWhatsapp } from "react-icons/fa";
export const site = "https://app.dishplug.com";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const dishes = ["rice", "pizza", "fufu", "jollof"];
  return (
    <div className="px-7 md:px-32 relative top-[100px] bg-accent2 pt-16 pb-4  sm:px-3">
      <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row  justify-between pb-16 border-b">
        <div>
          <Image
            src="/logo.png"
            alt="website logo"
            width={200}
            height={50}
            className="object-cover cursor-pointer w-[190px] h-16 mb-3 "
          />
          <p className="text-base text-neutral-700 mb-8 w-[200px]">
            Food? Yes, delivered.
          </p>
          <div className="flex space-x-3 items-center">
            <Link
              href="https://wa.me/+233543288549"
              target={"_blank"}
              rel="noreferrer noopener"
            >
              <div className="w-10 h-10 rounded-full bg-primary2 hover:scale-105 hover:bg-neutral-800 flex items-center justify-center">
                <FaWhatsapp color="white" />
              </div>
            </Link>
            <Link
              href="https://twitter.com/mydishplug_gh"
              target={"_blank"}
              rel="noreferrer noopener"
            >
              <div className="w-10 h-10 rounded-full bg-primary2 hover:scale-105 hover:bg-neutral-800 flex items-center justify-center">
                <FaTwitter color="white" />
              </div>
            </Link>
            <Link
              href="tel://+233543288549"
              target={"_blank"}
              rel="noreferrer noopener"
            >
              <div className="w-10 h-10 rounded-full bg-primary2 hover:scale-105 hover:bg-neutral-800 flex items-center justify-center">
                <FaPhoneAlt color="white" />
              </div>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-medium text-textdark md:mb-4  ">
            Dishes near me
          </h3>
          <ul className="space-y-3">
            {dishes.map(dish => (
              <li key={dish}>
                <Link
                  target={"_blank"}
                  rel="noreferrer noopener"
                  href={`${site}/search?keyword=${dish}`}
                  className="text-neutral-700 text-base capitalize cursor-pointer hover:text-black"
                >
                  {dish} near me
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <div>
          <h3 className="text-xl font-medium text-textdark md:mb-4">
            Useful Links
          </h3>
          <ul className="space-y-3">
            <li>
              <p className="text-neutral-700 text-base cursor-pointer hover:text-black">
                Services
              </p>
            </li>
            <li>
              <p className="text-neutral-700 text-base cursor-pointer hover:text-black">
                Support
              </p>
            </li>
            <li>
              <p className="text-neutral-700 text-base cursor-pointer hover:text-black">
                Conditions
              </p>
            </li>
            <li>
              <p className="text-neutral-700 text-base cursor-pointer hover:text-black">
                Security
              </p>
            </li>
          </ul>
        </div> */}
        <div>
          <h3 className="text-xl font-medium text-textdark md:mb-4">
            Need help?
          </h3>
          {/* <div className="mb-6 flex justify-between items-center h-[50px] w-full rounded-lg bg-white pl-4 pr-2">
            <input
              type="email"
              name="email"
              className="focus:outline-0 focus:ring-0 text-neutral-700 mr-3"
              placeholder="Email Address"
            />
            <div className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-primary2">
              <Image
                src="/send.svg"
                alt="image of a send icon"
                width={14}
                height={14}
              />
            </div>
          </div> */}
          <Link
            href="tel:+233543288549"
            target={"_blank"}
            rel="noreferrer noopener"
          >
            <div className="flex items-center space-x-2 mb-3">
              <FaPhoneAlt />
              <p className="text-neutral-700 text-base hover:text-black">
                Call {"("}+233{")"} 543-288-549
              </p>
            </div>
          </Link>
          <Link
            href="mailto:ohenesetwumasi@gmail.com"
            target={"_blank"}
            rel="noreferrer noopener"
          >
            <div className="flex items-center space-x-2 mb-3">
              <FaEnvelope />
              <p className="text-neutral-700 text-base hover:text-black">
                ohenesetwumasi@gmail.com
              </p>
            </div>
          </Link>
          <Link
            href="https://wa.me/233543288549?text=Hi Dishplug,"
            target={"_blank"}
            rel="noreferrer noopener"
          >
            <div className="flex items-center space-x-2 mb-3">
              <FaWhatsapp />
              <p className="text-neutral-700 text-base hover:text-black">
                Whatsapp {"("}+233{")"} 543-288-549
              </p>
            </div>
          </Link>
        </div>
      </div>
      <p className="font-medium text-neutral-700 text-center pt-4">
        Dishplug - &copy; {year}
      </p>
    </div>
  );
};

export default Footer;
