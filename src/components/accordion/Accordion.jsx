import PropTypes from "prop-types";

import {Accordion as BootstrapAccordion} from 'react-bootstrap';
import {useEffect} from "react";

function Accordion({defaultEventKey, title, children}) {
  useEffect(() => {
    // Define o titulo do accordion com text-balance
    document.querySelectorAll('.lh-base.accordion-header button').forEach(el => {
      el.classList.add('text-nx');
    })
  }, []);
  
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

export default Accordion;
