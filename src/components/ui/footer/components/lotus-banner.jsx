import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import {contactLotus} from "@/assets/resources.js";

const LotusBanner = () => {
  return (
    <div className={"py-5 border-top bg-body-secondary"}>
      <Container className={"d-flex flex-column gap-3"}>
        <img src={"/images/icon-white.png"} height={48} width={48} alt={"Logo da Lotus Media"} className={"rounded-1"}/>
        <h3 className={"fs-3 m-0 p-0 d-flex flex-column align-items-start justify-content-center text-balance"} style={{color: "#FC0B65"}}>
          <span className={"fs-inherit fw-medium"}>Mobilidade.</span>
          <span className={"fs-inherit fw-medium"}>Pensado com amor.</span>
          <span className={"fs-inherit fw-medium"}>Feito com tecnologia.</span>
          <span className={"fs-inherit fw-bold"}>Hospedado na infraestrutura da <img src={"https://raw.githubusercontent.com/lotus-media/media-kit/refs/heads/main/favicon.svg"} height={24} width={24} style={{marginBottom: "0.25rem"}} alt={"Logo da Lotus Media"}/> Lotus.</span>
        </h3>
        <Link to={contactLotus} target={"_blank"} className={"text-decoration-none"}>
          <p className={"m-0 p-0"} style={{color: "#FC0B65"}}>Comece seu projeto hoje mesmo <span className={"fs-inherit d-inline-block"} style={{rotate: "-45deg", marginBottom: "1.15px"}}>{"->"}</span></p>
        </Link>
      </Container>
    </div>
  );
};

export default LotusBanner;
