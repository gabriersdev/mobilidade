import PropTypes from "prop-types";

import {Accordion as BootstrapAccordion} from 'react-bootstrap';

function AccordionItem({title, children, eventKey, className}) {
  return (
    <BootstrapAccordion.Item eventKey={eventKey} className={className}>
      <BootstrapAccordion.Header className={"inter lh-base"}>{typeof title === "string" ? title.trim() : title}</BootstrapAccordion.Header>
      <BootstrapAccordion.Body className="d-flex flex-column text-left">
        {children}
      </BootstrapAccordion.Body>
    </BootstrapAccordion.Item>
  );
}

AccordionItem.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  eventKey: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default AccordionItem;
