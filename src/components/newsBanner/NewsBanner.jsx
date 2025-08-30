import Title from "../title/Title.jsx";
import {Badge} from "react-bootstrap";
import {Link} from "react-router-dom";

function NewsBanner() {
  return (
    <Link to={"/news"} className={"pt-4 px-4 pb-3 bg-primary-subtle rounded-3 border border-primary-subtle d-flex flex-column gap-3 text-decoration-none"}>
      <div className={"d-flex flex-column gap-4 align-items-start"}>
        <Badge className={"badge bg-primary text-white fw-normal fs-6"}>Leia</Badge>
        <Title type={"h2"} classX={" fs-3 m-0 p-0 text-primary-emphasis"}>Notícias do Transporte Público</Title>
      </div>
      <div>
        <p className={"lh-base text-balance m-0 text-primary-emphasis"} style={{maxWidth: "580px"}}>Trazemos atualizações das linhas que monitoramos, mudanças de itinerário e eventos na cidade.</p>
      </div>
    </Link>
  );
}

export default NewsBanner;
