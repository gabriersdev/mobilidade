import React from "react";
import { Nav as BootstrapNav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="my-3">
        <Navbar.Brand as={Link} to="./mobilidade/">mobilidade</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="me-auto">
            <BootstrapNav.Link as={Link} to="./mobilidade/">Home</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="./mobilidade/lines">Linhas</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="./mobilidade/search">Pesquisar</BootstrapNav.Link>
          </BootstrapNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Nav;
