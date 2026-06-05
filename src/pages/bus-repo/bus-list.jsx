import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { busRepoService } from '../../lib/bus-repo-service';
import BusCard from '../../components/bus-repo/bus-card';
import BusFilters from '../../components/bus-repo/bus-filters';

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

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await busRepoService.getVehicles();
        setVehicles(data);
      } catch (err) {
        setError('Falha ao carregar lista de veículos.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

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
    <Container className="py-5" style={{ minHeight: '80vh' }}>
      <div className="mb-4">
        <h1 className="fw-bold"><i className="bi bi-bus-front me-2"></i> Repositório de Ônibus</h1>
        <p className="text-muted">Consulte a base de dados de frota e operadoras da rede.</p>
      </div>

      <BusFilters filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
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
                <BusCard vehicle={vehicle} />
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
    </Container>
  );
}
