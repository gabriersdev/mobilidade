import PropTypes from 'prop-types';
import Grid from '../ui/grid/grid.jsx';
import Card from '../ui/card/card.jsx';
import BusCard from './bus-card.jsx';
import {Col, Row} from 'react-bootstrap';

export default function BusListResults({loading, error, vehicles}) {
  if (loading) {
    return (
      <div className="mt-5">
        <Grid>
          <Card title="Carregando" subtitle="Aguarde...">
            Estamos buscando as informações dos veículos. Esse processo geralmente é rápido. Por favor, aguarde alguns instantes.
          </Card>
          {Array.from({length: 9}).map((_, i) => (
            <Card key={i} variant="placeholder"/>
          ))}
        </Grid>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="mt-5">
        <Grid>
          <Card title="Erro" subtitle="Falha ao carregar">
            {error}
          </Card>
        </Grid>
      </div>
    );
  }
  
  if (!vehicles || vehicles.length === 0) {
    return (
      <div className={"mt-5"}>
        <Grid>
          <Card title="Nenhum veículo encontrado" subtitle="Não há resultados">
            Não encontramos nenhum veículo com os filtros selecionados.
          </Card>
        </Grid>
      </div>
    );
  }
  
  return (
    <div className={"mt-5"}>
      {/*<p className="text-muted mb-3">{vehicles.length} veículo(s) encontrado(s).</p>*/}
      <Row className="g-4">
        {vehicles.map(vehicle => (
          <Col xs={12} md={6} lg={4} key={vehicle.id}>
            <BusCard vehicle={vehicle}/>
          </Col>
        ))}
      </Row>
      
      <p className={"mb-0 mt-3 text-sml text-muted"}>{vehicles.length} veículos encontrados</p>
    </div>
  );
}

BusListResults.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  vehicles: PropTypes.array
};
