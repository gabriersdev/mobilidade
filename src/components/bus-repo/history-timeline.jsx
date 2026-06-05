import React from 'react';
import moment from 'moment';
import Title from '@/components/ui/title/title.jsx';

const getIconForIncident = (type) => {
  switch (type) {
    case 'Acidente': return 'bi-exclamation-triangle text-danger';
    case 'Defeito Mecânico': return 'bi-wrench text-warning';
    case 'Vandalismo/Depreciação': return 'bi-slash-circle text-dark';
    default: return 'bi-info-circle text-primary';
  }
};

export default function HistoryTimeline({incidents, maintenances}) {
  // Combinar incidentes e manutenções em uma única timeline e ordenar
  const timelineEvents = [
    ...(incidents || []).map(inc => ({...inc, isMaintenance: false})),
    ...(maintenances || []).map(maint => ({...maint, isMaintenance: true, type: 'Manutenção'}))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section id="historico">
      <Title type="h2" title="Histórico do Veículo" classX="text-body-secondary mb-4" />
      {timelineEvents.length === 0 ? (
        <p className="text-body">Nenhum evento registrado no histórico deste veículo.</p>
      ) : (
        <div className="position-relative ms-3 border-start border-2 pb-2 border-primary-subtle">
          {timelineEvents.map((event, index) => (
            <div key={event.id || index} className="position-relative mb-4 ps-4">
              <div 
                className="position-absolute bg-white border border-2 border-primary-subtle rounded-circle d-flex justify-content-center align-items-center"
                style={{width: '30px', height: '30px', left: '-16px', top: '0'}}
              >
                <i className={`bi ${event.isMaintenance ? 'bi-tools text-success' : getIconForIncident(event.type)} fs-6`}></i>
              </div>
              <div className="bg-body-tertiary p-3 rounded">
                <h6 className="fw-bold mb-1">{event.type}</h6>
                <small className="text-muted d-block mb-2">
                  <i className="bi bi-calendar me-1"></i>
                  {moment(event.date).format('DD/MM/YYYY [às] HH:mm')}
                </small>
                <p className="mb-0 text-body">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
