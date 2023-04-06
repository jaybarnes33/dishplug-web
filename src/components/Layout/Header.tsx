import Image from "next/image";
import React from "react";

import LocationDisplay from "../App/LocationDisplay";
import Search from "../App/Search/NavSearch";
import { RxPerson as User } from "react-icons/rx";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
const Header = () => {
  return (
    <nav className="flex py-4 gap-5 border border-neutral-200 px-4 md:px-12 f">
      <Link href="/">
        <Image
          className="w-10 h-10"
          src={"/green-dish.png"}
          alt="logo"
          width={40}
          height={40}
        />
      </Link>

      <LocationDisplay />
      <Search />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="ml-[3rem] order-last md:order-3 h-10 w-10 flex items-center justify-center rounded-full bg-primary2">
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
                <button className="h-7 w-7 flex items-center justify-center rounded-full bg-primary2">
                  <User color="white" />
                </button>
                Log in
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Arrow className="DropdownMenuArrow" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  );
};

export default Header;
