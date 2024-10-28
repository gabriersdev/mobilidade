import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import "./main.css";

const Main = ({ children }) => {
  return (
    <main className="main">
      <Container>
        {children}
      </Container>
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Main;
