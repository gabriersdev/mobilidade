import Title from "../title/Title.jsx";
import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";

function GuideBanner() {
  return (
    <Link to={"/guide"} className={"p-4 bg-warning-subtle rounded-3 border border-warning-subtle d-flex flex-column gap-3 text-decoration-none"}>
      <div className={"d-flex flex-column gap-4 align-items-start"}>
        <Badge className={"badge bg-warning text-body fw-normal fs-6"}>Confira</Badge>
        <Title type={"h2"} classX={" fs-3 m-0 p-0 text-warning-emphasis"}>Guia de Transporte Público</Title>
      </div>
      <div>
        <p className={"fs-5 lh-sm text-balance m-0 text-warning-emphasis"}>Organizados por locais e pontos de parada, o guia ajuda te ajuda a verificar quais linhas param em determinado lugar atendidos pelas linhas da cidade.</p>
      </div>
    </Link>
  );
}

export default GuideBanner;
