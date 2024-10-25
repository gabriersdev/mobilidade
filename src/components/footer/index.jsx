import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="d-flex flex-column gap-5">
      <Container>
        <p>(C) {new Date().getFullYear() || '2024'} Mobilidade</p>
        <ul className="d-flex flex-column g-3">
          <Link to={"/development"} className="">Desenvolvimento</Link>
          <Link to="/terms-of-service" className="">Termos de serviços</Link>
          <Link to="/privacy" className="">Privacidade</Link>
        </ul>
      </Container>
    </footer>
  )
}

export default Footer;
