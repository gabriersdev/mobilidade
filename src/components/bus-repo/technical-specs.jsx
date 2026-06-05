import {Col, Row, Table} from 'react-bootstrap';
import Title from '@/components/ui/title/title.jsx';
import Util from "@/lib/Util.jsx";

export default function TechnicalSpecs({vehicle}) {
  const techSpecsData = [
    {label: 'Fabricante do chassi', value: vehicle.chassis.manufacturer},
    {label: 'Modelo do chassi', value: vehicle.chassis.model},
    {label: 'Encarroçadora', value: vehicle.bodywork.manufacturer},
    {label: 'Modelo da carroceria', value: vehicle.bodywork.model},
    {label: 'Dimensão', value: vehicle.dimensionDescription},
    {label: 'Tecnologia de otimização', value: vehicle.optimizationTechnology},
    {label: 'Geração/Leva', value: vehicle.generationBatch}
  ];
  
  const comfortSpecsData = [
    {label: 'Capacidade (sentados)', value: vehicle.capacitySeated},
    {label: 'Capacidade (em pé)', value: vehicle.capacityStanding},
    {label: 'Capacidade de acomodação total', value: vehicle.capacitySeated + vehicle.capacityStanding},
    {label: 'Ar condicionado', value: vehicle.hasAc ? 'Sim' : 'Não'},
    {label: 'Suspensão a Ar', value: vehicle.hasAirSuspension ? 'Sim' : 'Não'},
    {label: 'Wi-Fi', value: vehicle.hasWifi ? 'Sim' : 'Não'},
    {label: 'Tipo de piso', value: vehicle.floorType},
    {label: 'Tipo de banco', value: vehicle.seatType},
    {label: 'Elevador', value: vehicle.accessibilityElevator},
    {label: 'Bancos exclusivos', value: vehicle.accessibilityExclusiveSeats},
    {label: 'Contraste visual', value: vehicle.accessibilityVisualContrast},
    {label: 'Portas', value: `${vehicle.doorsQuantity} (${vehicle.accessibilityDisembarkDoor})`}
  ];
  
  return (
    <>
      <section>
        <Title type="h2" title="Especificações Técnicas" classX="text-body-secondary mb-4"/>
        <Row className="g-5 align-items-stretch">
          <Col id="especificacoes-tecnicas">
            <div className="d-flex flex-column gap-3">
              <Table responsive className="mb-0 table-bordered table-striped table-hover">
                <tbody>
                {techSpecsData.map((spec, index) => (
                  <tr key={index}>
                    <th className="text-body-secondary w-50 fw-medium">{Util.renderText(spec.label)}</th>
                    <td>{Util.renderText(spec.value)}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </section>
      
      <section>
        <Title type="h2" title="Conforto e Acessibilidade" classX="text-body-secondary mb-4"/>
        <Row className="g-5 align-items-stretch">
          <Col id="conforto-e-acessibilidade">
            <div className="d-flex flex-column gap-3">
              <Table responsive className="mb-0 table-bordered table-striped table-hover">
                <tbody>
                {comfortSpecsData.map((spec, index) => (
                  <tr key={index}>
                    <th className="text-body-secondary w-50 fw-medium">{Util.renderText(spec.label)}</th>
                    <td>{Util.renderText(spec.value)}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
}
