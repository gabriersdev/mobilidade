import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer border-top bg-body-tertiary">
      <Container className="d-flex flex-column gap-2rem">
        <p className="mb-0" style={{ color: '#4C4C4C' }}>(C) {new Date().getFullYear() || '2024'} Mobilidade</p>
        <ul className="d-flex flex-column g-3 m-0 p-0 footer-link-list">
          <Link to={"./mobilidade/development#topo"} className="footer-link-list-item">Desenvolvimento</Link>
          <Link to="./mobilidade/terms-of-service#topo" className="footer-link-list-item">Termos de serviços</Link>
          <Link to="./mobilidade/privacy#topo" className="footer-link-list-item">Privacidade</Link>
        </ul>
      </Container>
    </footer>
  )
}

export default Footer;
