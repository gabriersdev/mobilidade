import React from "react";
import PropTypes from "prop-types";
import { Accordion as BootstrapAccordion } from 'react-bootstrap';

function AccordionItem({ title, key }, childrens) {
  return (
    <BootstrapAccordion.Item eventKey={key}>
      <BootstrapAccordion.Header>${title}</BootstrapAccordion.Header>
      <BootstrapAccordion.Body className="d-flex flex-column gap-3">
        ${childrens}
      </BootstrapAccordion.Body>
    </BootstrapAccordion.Item>
  );
}

AccordionItem.defaultProps = {
  key: 0
}

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  key: PropTypes.number,
  childrens: PropTypes.node.isRequired
}

export default AccordionItem;
