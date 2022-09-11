import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
  Spinner
} from "react-bootstrap";

import {
  FaChevronLeft,
  FaHome,
  FaListAlt,
  FaShoppingCart,
  FaUser,
  FaUserAlt
} from "react-icons/fa";

import Search from "../App/Search/NavSearch";
import Link from "next/link";
import { useAuth } from "../Context/Auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useCart } from "../Context/Cart";
import Image from "next/image";
import colors from "@/styles/colors";

const Header = () => {
  const router = useRouter();
  const nav = useRef<HTMLElement>(null);
  const { itemsInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { replace } = useRouter();
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

  const links: { icon: string; name: string }[] = [
    { icon: "home", name: "Home" },
    { icon: "profile", name: "Profile" },
    { icon: "cart", name: "Cart" },
    { icon: "orders", name: "Orders" }
  ];

  const getIcon = (link: { icon: string; name: string }) => {
    if (link.icon === "home") {
      if (link.icon === "home" && router.asPath.substring(1) === "home") {
        return <FaHome />;
      } else if (
        link.icon === "home" &&
        router.asPath.substring(1) !== "home"
      ) {
        return <FaHome />;
      }
    } else if (link.icon === "profile") {
      if (link.icon === "profile" && router.asPath.substring(1) === "profile") {
        return <FaUser />;
      } else if (
        link.icon === "profile" &&
        router.asPath.substring(1) !== "profile"
      ) {
        return <FaUserAlt />;
      }
    } else if (link.icon === "cart") {
      if (link.icon === "cart" && router.asPath.substring(1) === "cart") {
        return <FaShoppingCart />;
      } else if (
        link.icon === "cart" &&
        router.asPath.substring(1) !== "cart"
      ) {
        return <FaShoppingCart />;
      }
    } else if (link.icon === "orders") {
      if (link.icon === "orders" && router.asPath.substring(1) === "orders") {
        return <FaListAlt />;
      } else if (
        link.icon === "orders" &&
        router.asPath.substring(1) !== "orders"
      ) {
        return <FaListAlt />;
      }
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

  const noSearch = [
    "login",
    "register",
    "cart",
    "foods",
    "checkout",
    "success"
  ].some(path => router.pathname.includes(path));
  return (
    <>
      {noSearch && !router.pathname.includes("success") && (
        <Button
          className="position-fixed mt-3 ms-3"
          variant="light"
          style={{ zIndex: 5 }}
          onClick={() => router.back()}
        >
          <FaChevronLeft color={colors.accent} />
        </Button>
      )}
      {!noSearch && (
        <Navbar fixed="top" ref={nav}>
          <Container className="d-flex flex-wrap  flex-md-nowrap">
            <NavbarBrand
              as={Image}
              src="/logoblack.png"
              width={140}
              height={70}
              objectFit="contain"
            />
            <>
              <Nav className="order-3 order-md-2">
                {!noSearch && <Search />}
              </Nav>

              <Nav className="ms-auto gap-3 order-2 order-md-3">
                {isAuthenticated ? (
                  <>
                    <NavDropdown
                      drop="start"
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
                      <NavDropdown.Item>
                        <Link href="/profile">Profile</Link>
                      </NavDropdown.Item>
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
                      className="d-block d-md-none me-5"
                      drop="down"
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
                  <Button variant=" " className="d-none d-md-block">
                    <FaShoppingCart size={24} />
                    <sup>
                      <Badge
                        bg="warning"
                        style={{
                          backgroundColor: "var(--dp-accent2)!important"
                        }}
                      >
                        {itemsInCart}
                      </Badge>
                    </sup>
                  </Button>
                </Nav.Item>
              </Nav>
            </>
          </Container>
        </Navbar>
      )}
      {!noSearch && (
        <Navbar
          className="mobi-nav bg-white rounded"
          // style={{ boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.04)" }}
          style={{ borderTop: "1.5px solid rgba(0, 0, 0, 0.125)" }}
          fixed="bottom"
        >
          {/* <Container className="d-flex justify-content-start"> */}
          <Container>
            {/* <Nav className="row d-flex justify-content-around gap-4 w-100"> */}
            <Nav className="row w-100">
              {links.map((link, key) => (
                <div className="col-3" key={key}>
                  <Link
                    href={`/${link.icon !== "home" ? link.icon : ""}`}
                    passHref
                  >
                    <div className="d-flex flex-column align-items-center gap-1 mobi-nav  text-muted">
                      <span
                        className="d-flex flex-column position-relative"
                        style={
                          (router.pathname === "/" && link.icon === "home") ||
                          router.pathname.includes(link.icon)
                            ? {
                                color: "var(--dp-accent)",
                                transform: "scale(1.5)"
                              }
                            : { color: "inherit" }
                        }
                      >
                        {getIcon(link)}
                        {link.name === "Cart" && (
                          <sup>
                            <Badge
                              bg="danger"
                              style={{
                                position: "absolute",
                                top: -15,
                                right: -10
                              }}
                            >
                              {itemsInCart}
                            </Badge>
                          </sup>
                        )}
                      </span>
                      <small>{link.name}</small>
                    </div>
                  </Link>
                </div>
              ))}
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
