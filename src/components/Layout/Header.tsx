import React, { ElementRef } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        nav.current!.classList.add("bg-change");
      } else {
        nav.current!.classList.remove("bg-change");
      }
    });
  });
  return (
    <Navbar fixed="top" expand="lg" collapseOnSelect ref={nav}>
      <Container>
        <Navbar.Brand>
          <span>Dish</span>
          <span>plug</span>
        </Navbar.Brand>
        <NavbarCollapse>
          <Nav className="ms-auto gap-3">
            <Nav.Item>
              <Button variant="light">
                <>
                  <FaUser className="me-1" />
                  Sign in
                </>
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button variant="dark">Sign up</Button>
            </Nav.Item>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default Header;
