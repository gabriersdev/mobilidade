import {Card, CardBody, CardHeader, CardTitle, ListGroup, ListGroupItem} from 'react-bootstrap';
import PropTypes from 'prop-types';

import AnimatedComponents from '@/components/ui/animated-component/animated-components.jsx';

const GuideIndex = ({letters}) => (
  <Card className="p-0 position-sticky" style={{top: '6rem'}}>
    <CardHeader className="bg-body-secondary">
      <CardTitle className="fs-6 px-3 py-3 m-0 border-bottom">Índice de letras</CardTitle>
    </CardHeader>
    <CardBody className="p-3">
      <ListGroup className="bg-body">
        {letters.map((letter) => (
          <ListGroupItem as="a" key={letter} className="bg-body text-primary border-secondary-subtle" href={`#${letter}`}>
            <AnimatedComponents>
              <span className="d-block py-1">{letter}</span>
            </AnimatedComponents>
          </ListGroupItem>
        ))}
      </ListGroup>
    </CardBody>
  </Card>
);

GuideIndex.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GuideIndex;
