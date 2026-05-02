import PropTypes from "prop-types";

import {Accordion as BootstrapAccordion} from 'react-bootstrap';
import {useCallback} from "react";

function Accordion({defaultEventKey, title, children, id}) {
  const generateId = useCallback(() => {
    return id || (new Date().getTime() + Math.random().toString());
  }, [id])
  
  return (
    <>
      <BootstrapAccordion defaultActiveKey={defaultEventKey} aria-description={title ? title.trim() : ''} alwaysOpen id={generateId()}>
        {children}
      </BootstrapAccordion>
    </>
  );
}

Accordion.propTypes = {
  defaultEventKey: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
}

export default Accordion;
