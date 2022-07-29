import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import { FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import Search from "../App/Search/NavSearch";
import Link from "next/link";
import { useAuth } from "../Context/Auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useCart } from "../Context/Cart";

const Header = () => {
  const nav = useRef<HTMLElement>(null);
  // const { replace } = useRouter();
  const { itemsInCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { pathname, replace } = useRouter();
  const logout = async () => {
    await signOut(auth);
    replace("/login");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        nav.current?.classList.add("bg-change");
      } else {
        nav.current?.classList.remove("bg-change");
      }
    });
  });

  const noSearch = ["/login", "/register"];
  return (
    <Navbar fixed="top" ref={nav}>
      <Container className="d-flex flex-wrap flex-md-nowrap">
        <Navbar.Brand className="order-1">
          <Link href="/" passHref>
            <span>
              <FaUtensils /> Dishplug
            </span>
          </Link>
        </Navbar.Brand>

        <>
          <Nav className="mx-auto order-3 order-md-2">
            {!noSearch.includes(pathname) && <Search />}
          </Nav>

          <Nav className="ms-auto gap-3 order-2 order-md-3">
            {isAuthenticated ? (
              <>
                <NavDropdown title={<FaUser color="black" />}>
                  <NavDropdown.Item>
                    <span onClick={async () => await logout()}>Logout</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href="/orders">Orders</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href="/profile">Profile</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Item as={Link} href="/login">
                  <Button variant="light">
                    <>
                      <FaUser className="me-1" />
                      Sign in
                    </>
                  </Button>
                </Nav.Item>
                <Nav.Item as={Link} href="/register">
                  <Button variant="dark">Sign up</Button>
                </Nav.Item>
              </>
            )}
            <Nav.Item as={Link} href="/cart">
              <Button variant=" ">
                <FaShoppingCart className="me-1" size={24} />
                <sup>
                  <Badge bg="danger">{itemsInCart}</Badge>
                </sup>
              </Button>
            </Nav.Item>
          </Nav>
        </>
      </Container>
    </Navbar>
  );
};

export default Header;
