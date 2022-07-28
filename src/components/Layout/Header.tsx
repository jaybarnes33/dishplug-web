import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import Search from "../App/Search/NavSearch";
import Link from "next/link";
import { useAuth } from "../Context/Auth";
// import { signOut } from "firebase/auth";
// import { auth } from "@/lib/firebase/client";
import { useCart } from "../Context/Cart";

const Header = () => {
  const nav = useRef<HTMLElement>(null);
  // const { replace } = useRouter();
  const { itemsInCart } = useCart();
  const { user } = useAuth();
  const { pathname } = useRouter();
  // const logout = async () => {
  //   await signOut(auth);
  //   replace("/login");
  // };

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
    <Navbar fixed="top" expand="lg" collapseOnSelect ref={nav}>
      <Container>
        <Navbar.Brand>
          <Link href="/" passHref>
            <span>
              <FaUtensils /> Dishplug
            </span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="#my-nav" />
        <>
          <NavbarCollapse id="my-nav">
            <div className="ms-auto"></div>
            {!noSearch.includes(pathname) && <Search />}

            <Nav className="ms-auto gap-3">
              {!user?.isAnonymous ? (
                <Nav.Item as={Link} href="/profile">
                  <Button variant="light">
                    <FaUser className="me-1" /> {user?.displayName}
                  </Button>
                </Nav.Item>
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
                  <>
                    <FaShoppingCart className="me-1" size={24} />
                    <sup>
                      <Badge bg="danger">{itemsInCart}</Badge>
                    </sup>
                  </>
                </Button>
              </Nav.Item>
            </Nav>
          </NavbarCollapse>
        </>
      </Container>
    </Navbar>
  );
};

export default Header;
