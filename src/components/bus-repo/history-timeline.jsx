import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

const getIconForIncident = (type) => {
  switch (type) {
    case 'Acidente': return 'bi-exclamation-triangle text-danger';
    case 'Defeito Mecânico': return 'bi-wrench text-warning';
    case 'Vandalismo/Depreciação': return 'bi-slash-circle text-dark';
    default: return 'bi-info-circle text-primary';
  }
};

export default function HistoryTimeline({ incidents, maintenances }) {
  // Combinar incidentes e manutenções em uma única timeline e ordenar
  const timelineEvents = [
    ...(incidents || []).map(inc => ({ ...inc, isMaintenance: false })),
    ...(maintenances || []).map(maint => ({ ...maint, isMaintenance: true, type: 'Manutenção' }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (timelineEvents.length === 0) {
    return (
      <Card className="border-0 shadow-sm mt-4">
        <Card.Body>
          <p className="text-muted mb-0">Nenhum evento registrado no histórico deste veículo.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm mt-4">
      <Card.Header className="bg-white fw-bold fs-5 border-bottom-0 pt-4 px-4">
        <i className="bi bi-clock-history me-2"></i> Histórico do Veículo
      </Card.Header>
      <Card.Body className="px-4">
        <div className="position-relative ms-3 border-start border-2 pb-2">
          {timelineEvents.map((event, index) => (
            <div key={event.id || index} className="position-relative mb-4 ps-4">
              <div 
                className="position-absolute bg-white border border-2 border-secondary rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: '30px', height: '30px', left: '-16px', top: '0' }}
              >
                <i className={`bi ${event.isMaintenance ? 'bi-tools text-success' : getIconForIncident(event.type)} fs-6`}></i>
              </div>
              <div className="bg-light p-3 rounded">
                <h6 className="fw-bold mb-1">{event.type}</h6>
                <small className="text-muted d-block mb-2">
                  <i className="bi bi-calendar me-1"></i>
                  {moment(event.date).format('DD/MM/YYYY [às] HH:mm')}
                </small>
                <p className="mb-0 text-dark">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
