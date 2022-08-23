import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Spinner
} from "react-bootstrap";

import { FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import Search from "../App/Search/NavSearch";
import Link from "next/link";
import { useAuth } from "../Context/Auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useCart } from "../Context/Cart";
import Image from "next/image";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

const Header = () => {
  const nav = useRef<HTMLElement>(null);
  const { itemsInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { pathname, replace } = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
      replace("/login");
    } catch (error) {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.location.pathname === "/") {
        if (window.scrollY > 0) {
          nav.current?.classList.add("bg-change");
        } else {
          nav.current?.classList.remove("bg-change");
        }
      } else {
        nav.current?.classList.add("bg-change");
      }
    });
  });

  const noSearch = ["/login", "/register"];
  return (
    <Navbar fixed="top" ref={nav}>
      <Container className="d-flex flex-wrap  flex-md-nowrap justify-content-between">
        <Navbar.Brand className="order-1">
          <Link href="/" passHref>
            {/* <span>
              <FaUtensils /> Dishplug
            </span> */}
            <Image
              src={"/logoblack.png"}
              width={170}
              height={50}
              objectFit="contain"
              alt="Dishplug"
            />
          </Link>
        </Navbar.Brand>

        <>
          <Nav className="order-3 order-md-2">
            {!noSearch.includes(pathname) && <Search />}
          </Nav>

          <Nav className="ms-auto gap-3 order-2 order-md-3">
            {isAuthenticated ? (
              <>
                <NavDropdown
                  title={
                    <>
                      {loggingOut && (
                        <Spinner
                          animation="border"
                          size="sm"
                          style={{ marginRight: "0.25rem" }}
                        />
                      )}
                      <FaUser color="black" />
                    </>
                  }
                >
                  <NavDropdown.Item>
                    <span onClick={logout}>Logout</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href="/orders">Orders</Link>
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item>
                    <Link href="/profile">Profile</Link>
                  </NavDropdown.Item> */}
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav className="d-none d-md-flex gap-2">
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
                </Nav>

                <NavDropdown
                  title={<FaUser color="black" />}
                  className="d-block d-md-none"
                >
                  <NavDropdown.Item>
                    <Link href="/login">Sign in</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href="/register">Sign up</Link>
                  </NavDropdown.Item>
                </NavDropdown>
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
