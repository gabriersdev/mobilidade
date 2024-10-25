import React from "react";
import { Nav as BootstrapNav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="my-3">
        <Link to="/">
          <Navbar.Brand href="">mobilidade</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="me-auto">
            <Link to="/">
              <BootstrapNav.Link>Home</BootstrapNav.Link>
            </Link>
            <Link to="/lines">
              <BootstrapNav.Link>Linhas</BootstrapNav.Link>
            </Link>
            <Link to="/search">
              <BootstrapNav.Link>Pesquisar</BootstrapNav.Link>
            </Link>
          </BootstrapNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Nav;
