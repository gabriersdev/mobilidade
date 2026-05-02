import {Link} from 'react-router-dom';
import Title from '@/components/ui/title/title.jsx';

export default function FareHistoryHeader({lineId, lineNumber, departureLocation, destinationLocation}) {
  return (
    <>
      <h1 className="m-0 p-0"><span className="text-body-secondary">Histórico de Tarifas</span></h1>
      <Link to={`/lines/${lineId}`} className="text-decoration-none">
        <Title type="h2" classX=" fs-3 d-inline mt-1 p-0 d-block mb-0">
          <span className="d-block" style={{fontSize: "inherit"}}>
            Linha {lineNumber ? `${lineNumber} - ${departureLocation} ⇄ ${destinationLocation}`.replaceAll("/", " ⇄ ") : ""}
          </span>
        </Title>
      </Link>
    </>
  );
}
