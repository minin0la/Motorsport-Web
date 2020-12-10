import React from "react";
import Navbar from "react-bootstrap/Navbar";

function Menubar() {
  return (
    <>
      <Navbar bg="dark">
        <Navbar.Brand href="#home">
          <img
            src="/logo/logo.png"
            width="100"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default Menubar;
