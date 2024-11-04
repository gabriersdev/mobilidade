import React from "react";
import PropTypes from "prop-types";

import { Accordion as BootstrapAccordion } from 'react-bootstrap';

function Accordion({ title, key }, childrens) {
  return (
    <BootstrapAccordion defaultActiveKey={key} aria-description={title}>
      {childrens}
    </BootstrapAccordion>
  );
}

Accordion.defaultProps = {
  key: 0
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  key: PropTypes.number,
  childrens: PropTypes.node.isRequired
}

export default Accordion;
