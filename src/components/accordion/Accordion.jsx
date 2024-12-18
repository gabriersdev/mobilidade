import React from "react";
import PropTypes from "prop-types";

import { Accordion as BootstrapAccordion } from 'react-bootstrap';

function Accordion({ defaultEventKey, title, children }) {
  return (
    <BootstrapAccordion defaultActiveKey={defaultEventKey} aria-description={title ? title.trim() : ''} alwaysOpen>
      {children}
    </BootstrapAccordion>
  );
}

Accordion.propTypes = {
  defaultEventKey: PropTypes.array.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Accordion;
