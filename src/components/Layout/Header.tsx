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

import { BsPerson, BsCart, BsChevronLeft } from "react-icons/bs";
import { Buy, Document, Home, User } from "react-iconly";
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
  const isHomePage = router.pathname === "/";

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
      if (link.icon === "home" && router.pathname === "/") {
        return <Home set="bold" primaryColor={colors.primary} />;
      } else if (
        link.icon === "home" &&
        router.asPath.substring(1) !== "home"
      ) {
        return <Home set="light" size="small" primaryColor={colors.primary} />;
      }
    } else if (link.icon === "profile") {
      if (link.icon === "profile" && router.asPath.substring(1) === "profile") {
        return <User set="bold" primaryColor={colors.primary} />;
      } else if (
        link.icon === "profile" &&
        router.asPath.substring(1) !== "profile"
      ) {
        return <User set="two-tone" primaryColor={colors.primary} />;
      }
    } else if (link.icon === "cart") {
      if (link.icon === "cart" && router.asPath.substring(1) === "cart") {
        return <Buy set="bold" primaryColor={colors.primary} />;
      } else if (
        link.icon === "cart" &&
        router.asPath.substring(1) !== "cart"
      ) {
        return <Buy set="two-tone" primaryColor={colors.primary} />;
      }
    } else if (link.icon === "orders") {
      if (link.icon === "orders" && router.asPath.substring(1) === "orders") {
        return <Document set="bold" primaryColor={colors.primary} />;
      } else if (
        link.icon === "orders" &&
        router.asPath.substring(1) !== "orders"
      ) {
        return <Document set="two-tone" primaryColor={colors.primary} />;
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
    "refer",
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
          <BsChevronLeft color={colors.accent} />
        </Button>
      )}
      {!noSearch && (
        <Navbar fixed="top" ref={nav}>
          <Container className="d-flex flex-wrap  flex-md-nowrap">
            <NavbarBrand
              as={Image}
              src="/green-dish.png"
              width={35}
              height={35}
              objectFit="contain"
            />
            <>
              <Nav className="order-3 order-md-2">
                {!isHomePage && !noSearch && <Search />}
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
                          <BsPerson color="black" />
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
                            <BsPerson className="me-1" />
                            Sign in
                          </>
                        </Button>
                      </Nav.Item>
                      <Nav.Item as={Link} href="/register">
                        <Button variant="dark">Sign up</Button>
                      </Nav.Item>
                    </Nav>

                    <NavDropdown
                      title={<BsPerson color="black" />}
                      className="d-block d-md-none"
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
                    <BsCart size={24} />
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
          className="mobi-nav bg-white rounded m-2 py-2"
          fixed="bottom"
          style={{ boxShadow: "12px 26px 50px rgba(90, 108, 234, 0.07)" }}
        >
          <Container className="d-flex justify-content-between">
            {links.map((link, key) => (
              <div key={key}>
                <Link
                  href={`/${link.icon !== "home" ? link.icon : ""}`}
                  passHref
                >
                  <div
                    className="d-flex align-items-center gap-1"
                    style={
                      (router.pathname === "/" && link.icon === "home") ||
                      router.pathname.includes(link.icon)
                        ? {
                            width: "100%",
                            padding: "0.3rem",
                            borderRadius: 12,
                            background:
                              "linear-gradient(98.81deg, rgba(254, 173, 29, 0.1) 0.82%, rgba(249, 168, 77, 0.1)101.53%)"
                          }
                        : { color: "inherit" }
                    }
                  >
                    <span className="position-relative">
                      {getIcon(link)}
                      {link.name === "Cart" && (
                        <sup>
                          <Badge
                            bg="danger"
                            style={{
                              position: "absolute",
                              top: -5,
                              right: -10
                            }}
                          >
                            {itemsInCart}
                          </Badge>
                        </sup>
                      )}
                    </span>

                    <small className="text-dark" style={{ fontSize: "0.7rem" }}>
                      {link.name}
                    </small>
                  </div>
                </Link>
              </div>
            ))}
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
