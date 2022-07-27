import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRef } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import Search from "../App/Search/NavSearch";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAuth } from "../Context/Auth";
import { useAppSelector } from "@/redux/hooks";

const Header = () => {
  const nav = useRef<HTMLElement>(null);

  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        nav.current?.classList.add("bg-change");
      } else {
        nav.current?.classList.remove("bg-change");
      }
    });
  });
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
            <Search />
            <Nav className="ms-auto gap-3">
              {!user?.isAnonymous ? (
                <Nav.Item as={Link} href="/login">
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
                      <Badge bg="danger">{cart.length}</Badge>
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
