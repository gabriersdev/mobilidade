import React from "react";
import PropTypes from "prop-types";

import { Accordion as BootstrapAccordion } from 'react-bootstrap';

function Accordion({ title, children }) {
  return (
    <BootstrapAccordion aria-description={title | ''}>
      {children}
    </BootstrapAccordion>
  );
}

Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Accordion;
