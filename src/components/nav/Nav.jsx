import React from "react";
import {Nav as BootstrapNav, Navbar, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./nav.css";

const Nav = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary border-bottom">
      <Container className="my-2 d-flex justify-content-between align-items-center w-100 flex-wrap">
        <Navbar.Brand as={Link} to="./" className={"text-body-secondary"} style={{letterSpacing: '-0.75px'}}>mobilidade</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="me-auto">
            <BootstrapNav.Link as={Link} className={"text-primary"} to="./">Início</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} className={"text-primary"} to="./lines">Linhas</BootstrapNav.Link>
          </BootstrapNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Nav;
