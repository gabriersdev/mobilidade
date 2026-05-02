import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Title from '@/components/ui/title/title.jsx';
import Accordion from '@/components/ui/accordion/accordion.jsx';
import GuideAddress from '@/components/guide-list-components/guide-address.jsx';

const GuideLetterSection = ({letter, addresses, nextLetter}) => (
  <div id={letter} className="w-100">
    <div className="d-inline-flex justify-content-between gap-2 flex-wrap w-100">
      <Title type="h4" classX="fs-6 fw-bold">{letter}</Title>
      {nextLetter && (
        <Link to={`#${nextLetter}`} className="text-decoration-none text-sml text-body-tertiary">
          Ir para a próxima letra do índice
        </Link>
      )}
    </div>
    <Accordion defaultEventKey={["0"]}>
      {Object.entries(addresses).map(([key, value], index) => (
        <GuideAddress
          key={key}
          address={key}
          lines={value}
          eventKey={index.toString()}
        />
      ))}
    </Accordion>
  </div>
);

GuideLetterSection.propTypes = {
  letter: PropTypes.string.isRequired,
  addresses: PropTypes.object.isRequired,
  nextLetter: PropTypes.string,
};

export default GuideLetterSection;
