import React from 'react';
import { Placeholder } from 'react-bootstrap';

const CompanyPlaceholder = () => (
  <div>
    <Placeholder as="div" animation="glow" className="mb-3">
      <Placeholder xs={4} />
    </Placeholder>
    <Placeholder as="span" animation="glow">
      <Placeholder xs={6} />
    </Placeholder>
    <div>
      <Placeholder as="h1" animation="glow">
        <Placeholder xs={8} />
      </Placeholder>
    </div>
    <div className="d-flex flex-column gap-4 mt-5">
      <Placeholder as="div" animation="glow">
        <Placeholder xs={2} />
        <Placeholder xs={4} />
      </Placeholder>
      <Placeholder as="div" animation="glow">
        <Placeholder xs={2} />
        <Placeholder xs={4} />
      </Placeholder>
      <Placeholder as="div" animation="glow">
        <Placeholder xs={2} />
        <Placeholder xs={4} />
      </Placeholder>
      <Placeholder as="div" animation="glow">
        <Placeholder xs={2} />
        <div className="d-flex flex-wrap gap-2">
          <Placeholder.Button xs={1} />
          <Placeholder.Button xs={1} />
          <Placeholder.Button xs={1} />
        </div>
      </Placeholder>
    </div>
  </div>
);

export default CompanyPlaceholder;
