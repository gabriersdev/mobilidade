import {Card, CardBody, CardHeader, ListGroup, ListGroupItem, Placeholder} from 'react-bootstrap';

const GuidePlaceholder = () => (
  <div className="row">
    <div className="col-lg-8">
      <Placeholder as="div" animation="glow">
        <Placeholder xs={12} size="lg"/>
      </Placeholder>
      <Placeholder as="div" animation="glow" className="mt-4">
        <Placeholder xs={2}/>
        <Placeholder xs={10}/>
      </Placeholder>
      <Placeholder as="div" animation="glow" className="mt-4">
        <Placeholder xs={2}/>
        <Placeholder xs={10}/>
      </Placeholder>
    </div>
    
    <div className="col-lg-4 mt-3 mt-lg-0">
      <Card className="p-0 position-sticky" style={{top: '6rem'}}>
        <CardHeader className="bg-body-secondary">
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6}/>
          </Placeholder>
        </CardHeader>
        <CardBody>
          <ListGroup>
            {[...Array(5)].map((_, i) => (
              <ListGroupItem key={i} as="div" className="bg-body text-primary border-secondary-subtle">
                <Placeholder as="span" animation="glow">
                  <Placeholder xs={4}/>
                </Placeholder>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  </div>
);

export default GuidePlaceholder;
