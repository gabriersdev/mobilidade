import React from "react";
import PropTypes from "prop-types";

import {Accordion as BootstrapAccordion} from 'react-bootstrap';

function AccordionItem({title, children, eventKey}) {
  return (
    <BootstrapAccordion.Item eventKey={eventKey}>
      <BootstrapAccordion.Header className={"inter lh-base"}>{title.trim()}</BootstrapAccordion.Header>
      <BootstrapAccordion.Body className="d-flex flex-column text-left">
        {children}
      </BootstrapAccordion.Body>
    </BootstrapAccordion.Item>
  );
}

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  eventKey: PropTypes.string.isRequired,
}

export default React.memo(AccordionItem);
