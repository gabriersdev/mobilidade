import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

import "./main.css";

const Main = ({ children }) => {
  return (
    <main className="main mt-3 mb-3 mt-sm-5 mb-sm-5">
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
