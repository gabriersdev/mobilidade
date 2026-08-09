import {ListGroup} from 'react-bootstrap';
import Util from '@/lib/Util.jsx';

export default function FareHistoryDetails({fare, lastModified}) {
  return (
    <ListGroup>
      <ListGroup.Item>
        <span className="d-block text-primary">BRL {fare?.toString()?.replace(".", ",")}</span>
        <span className="text-body-tertiary">
          Tarifa atualizada em {Util.renderText(Util.safeParseDate(lastModified?.toString()).format("DD/MM/YYYY"))}
        </span>
      </ListGroup.Item>
    </ListGroup>
  );
}
