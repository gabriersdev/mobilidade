import {useEffect, useMemo, useState} from 'react';
import {Alert, Col, Row, Spinner} from 'react-bootstrap';
import {busRepoService} from '../../lib/bus-repo-service';
import BusCard from '../../components/bus-repo/bus-card';
import BusFilters from '../../components/bus-repo/bus-filters';
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";
import Title from "@/components/ui/title/title.jsx";

export default function BusList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    searchQuery: '',
    status: '',
    hasAc: false,
    hasWifi: false,
    hasAirSuspension: false,
  });
  
  // TODO - implementar forma de trocar document.title
  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await busRepoService.getVehicles();
        setVehicles(data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Falha ao carregar lista de veículos.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles().then();
  }, []);
  
  // TODO - separar código de acordo com funcionalidades e responsabilidades em sub componentes
  
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Filtro Textual
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchPlate = v.licensePlate.toLowerCase().includes(query);
        const matchFleet = v.fleetNumber.toLowerCase().includes(query);
        const matchCompany = v.company.name.toLowerCase().includes(query);
        if (!matchPlate && !matchFleet && !matchCompany) return false;
      }
      
      // Filtro Status
      if (filters.status && v.status !== filters.status) return false;
      
      // Filtros Booleanos
      if (filters.hasAc && !v.hasAc) return false;
      if (filters.hasWifi && !v.hasWifi) return false;
      if (filters.hasAirSuspension && !v.hasAirSuspension) return false;
      
      return true;
    });
  }, [vehicles, filters]);
  
  return (
    <div>
      <div className="d-flex flex-column gap-4 gap-sm-5 align-items-start">
        <AnimatedComponents>
          <Title title="Informações de Ônibus" id="topo" classX="text-body-secondary"/>
          
          <section className="w-100">
            <AnimatedComponents>
              {/*Componente de pesquisa*/}
              <BusFilters filters={filters} onChange={setFilters}/>
              
              {/*TODO - usar os mesmos recursos de feedback e informação que nada foi encontrado que em @get-and-list-lines.jsx*/}
              <div>
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary"/>
                    <p className="mt-3 text-muted">Carregando frota...</p>
                  </div>
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  <>
                    <p className="text-muted mb-3">{filteredVehicles.length} veículo(s) encontrado(s).</p>
                    <Row className="g-4">
                      {filteredVehicles.map(vehicle => (
                        <Col xs={12} md={6} lg={4} key={vehicle.id}>
                          <BusCard vehicle={vehicle}/>
                        </Col>
                      ))}
                      {filteredVehicles.length === 0 && (
                        <Col xs={12}>
                          <Alert variant="info" className="text-center">
                            Nenhum veículo encontrado com os filtros selecionados.
                          </Alert>
                        </Col>
                      )}
                    </Row>
                  </>
                )}
              </div>
            </AnimatedComponents>
          </section>
        </AnimatedComponents>
      </div>
    </div>
  );
}
