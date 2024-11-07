import React from "react";
import PropTypes from "prop-types";
import { Accordion as BootstrapAccordion } from 'react-bootstrap';

function AccordionItem({ title, children }) {
  return (
    <BootstrapAccordion.Item>
      <BootstrapAccordion.Header>${title}</BootstrapAccordion.Header>
      <BootstrapAccordion.Body className="d-flex flex-column gap-3">
        ${children}
      </BootstrapAccordion.Body>
    </BootstrapAccordion.Item>
  );
}

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default AccordionItem;
