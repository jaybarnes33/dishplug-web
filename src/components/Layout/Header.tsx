import Image from "next/image";
import React from "react";

import LocationDisplay from "../App/LocationDisplay";
import Search from "../App/Search/NavSearch";
import { RxPerson as User } from "react-icons/rx";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useCart } from "../Context/Cart";
import Places from "../Location/Places";
import { useModal } from "@/hooks/useModal";
import Modal from "../Core/Modal";

const Header = () => {
  const { open, toggle, selected } = useModal();
  const { itemsInCart } = useCart();
  return (
    <>
      <nav className="flex py-4 flex-wrap gap-5 border border-neutral-200 px-2 md:px-12 fixed top-0 w-full z-50 bg-white">
        <Link href="/">
          <Image
            className="w-7 h-7 md:w-10 md:h-10"
            src={"/green-dish.png"}
            alt="logo"
            width={40}
            height={40}
          />
        </Link>

        <LocationDisplay />

        <div className="order-last w-full md:w-[40%] ml-auto">
          <Search />
        </div>

        <div className="flex gap-3 ml-auto md:order-last">
          <Link href="/cart">
            <button className="relative md:ml-[3rem]  3 h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full bg-accent2">
              <BsCart4 />
              <span className="absolute -top-1 -right-1 text-white bg-accent w-4 h-4 text-xs rounded-full">
                {itemsInCart}
              </span>
            </button>
          </Link>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="md:ml-[3rem] order-last md:order-3 h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full bg-primary2">
                <User color="white" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-white p-2 min-w-[120px] rounded-lg border border-neutral-500 relative mx-4 -mt-2 "
                sideOffset={5}
              >
                <DropdownMenu.Item
                  className="py-2 flex items-center gap-2 hover:outline-none"
                  asChild
                >
                  <Link href="/login">
                    <button className="h-7 w-7 flex items-center justify-center rounded-full bg-accent">
                      <User color="white" />
                    </button>
                    Log in
                  </Link>
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="DropdownMenuArrow" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </nav>
      <Modal open={open} toggle={toggle} data={selected} />
    </>
  );
};

export default Header;
