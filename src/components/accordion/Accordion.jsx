import PropTypes from "prop-types";

import {Accordion as BootstrapAccordion} from 'react-bootstrap';

function Accordion({defaultEventKey, title, children, id}) {
  return (
    <BootstrapAccordion defaultActiveKey={defaultEventKey} aria-description={title ? title.trim() : ''} alwaysOpen id={id || (new Date().getTime() + Math.random().toString())}>
      {children}
    </BootstrapAccordion>
  );
}

Accordion.propTypes = {
  defaultEventKey: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
	id: PropTypes.string,
}

export default Accordion;
