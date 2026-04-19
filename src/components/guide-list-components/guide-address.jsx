import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

import AccordionItem from '@/components/ui/accordion/accordion-item.jsx';
import GuideLineList from '@/components/guide-list-components/guide-line-list.jsx';

const GuideAddress = ({address, lines, eventKey}) => (
  <AccordionItem title={address.replace(/\\/g, ' - ')} eventKey={eventKey}>
    <ul className="ps-3 mt-0 mb-3" style={{lineHeight: 1.75}}>
      <GuideLineList lines={lines}/>
    </ul>
    <div className="mt-1">
      <Button
        variant="primary"
        as={Link}
        to={`/live?ei=${lines?.[0]?.data?.departure_point_id ?? -1}`}
        className="d-inline-flex align-items-center gap-2 flex-wrap"
      >
        Acompanhar aproximação de ônibus
        <i className="bi bi-shop-window"></i>
      </Button>
    </div>
  </AccordionItem>
);

GuideAddress.propTypes = {
  address: PropTypes.string.isRequired,
  lines: PropTypes.array.isRequired,
  eventKey: PropTypes.string.isRequired,
};

export default GuideAddress;
