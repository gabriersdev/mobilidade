import PropTypes from "prop-types";

import { Accordion as BootstrapAccordion } from 'react-bootstrap';

function Accordion({ defaultEventKey, title, children }) {
  console.log('render')
  return (
    <BootstrapAccordion defaultActiveKey={defaultEventKey} aria-description={title ? title.trim() : ''} alwaysOpen>
      {children}
    </BootstrapAccordion>
  );
}

Accordion.propTypes = {
  defaultEventKey: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default React.memo(Accordion);
