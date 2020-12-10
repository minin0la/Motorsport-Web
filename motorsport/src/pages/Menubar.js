import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Menubar() {
  return (
    <>
      <Navbar className="" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            src="/logo/logo.png"
            width="100"
            className="d-inline-block align-top"
            alt=""
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/catalogue">Catalogue</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default Menubar;
