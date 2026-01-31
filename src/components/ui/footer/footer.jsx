import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import "./footer.css";
import {useEffect, useState} from "react";
import InstallPWAButton from "../../install-PWA-button/install-PWA-button.jsx";
import AnimatedComponents from "../animated-component/animated-components.jsx";
import Util from "../../../assets/Util.jsx";
import moment from "moment";
import {contactLotus} from "../../../assets/resources.js";
import {useTheme} from "../theme-context/theme-context.jsx";
import ThemeSelector from "./theme-selector.jsx";

const Footer = () => {
  const [version, setVersion] = useState("1.17.0");
  const [cacheVersion, setCacheVersion] = useState("V40");
  const [dataBuild, setDataBuild] = useState({datetimeCreate: null});
  const {theme, handleTheme} = useTheme();
  
  useEffect(() => {
    fetch("/register.build.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDataBuild({...data});
        if (data.version) setVersion(data.version);
        if (data.cacheVersion) setCacheVersion(data.cacheVersion);
      })
      .catch((error) => {
        console.error("Failed to fetch build info:", error);
      });
  }, []);
  
  return (
    <AnimatedComponents>
      <footer className="footer border-top bg-body-tertiary">
        <Container className="d-flex flex-column gap-2rem">
          <p className="mb-0 text-body-secondary">&copy; {new Date().getFullYear() || '2024'} Mobilidade</p>
          <ul className="d-flex flex-column g-3 m-0 p-0 footer-link-list">
            <Link to={"/development#topo"} className="footer-link-list-item">Desenvolvimento</Link>
            <Link to="/terms-of-service#topo" className="footer-link-list-item">Termos de serviços</Link>
            <Link to="/privacy#topo" className="footer-link-list-item">Privacidade</Link>
            <Link to="/manifest#topo" className="footer-link-list-item">Manifesto</Link>
            <Link to="https://github.com/gabriersdev/mobilidade/" className="footer-link-list-item">Repositório no Github</Link>
            <Link to="https://github.com/gabriersdev/mobilidade/issues/new" className="footer-link-list-item">Reportar erro</Link>
          </ul>
          <div className="d-flex gap-3 flex-wrap">
            <button className={"btn text-start p-0 m-0 text-primary-emphasis border-0"} onClick={() => {
              Util.clearServiceWorker();
              window.location.reload();
            }}>
              <span className={"me-1"}>Limpar cache</span>
              <i className="bi bi-database-fill-x"></i>
            </button>
            
            <button className={"btn text-start p-0 m-0 text-primary-emphasis border-0"} onClick={() => {
              if (localStorage) localStorage.clear();
              window.location.reload();
            }}>
              <span className={"me-1"}>Limpar outros dados</span>
              <i className="bi bi-menu-button-fill"></i>
            </button>
            
            <ThemeSelector theme={theme} onThemeChange={handleTheme} />
            
            <InstallPWAButton/>
            {
              (
                <div className={"d-b lock mt-2 text-sml d-flex flex-column gap-1"}>
                  <p className={"text-body-secondary p-0 m-0 fs-inherit"}>Versão: {version} | Cache: {cacheVersion} </p>
                  <p className={"text-body-secondary p-0 m-0 fs-inherit"}>{dataBuild.datetimeCreate && <span>Versão de build: {Util.renderText(moment(dataBuild.datetimeCreate).utc(true).format("HH[h]mm[m] DD/MM/YYYY [GMT-03:00]"))}</span>}</p>
                </div>
              )
            }
          </div>
        </Container>
      </footer>
      <div className={"py-5 border-top bg-body-secondary"}>
        <Container className={"d-flex flex-column gap-3"}>
          <img src={"/images/icon-white.png"} height={48} width={48} alt={"Logo da Lotus Media"} className={"rounded-1"}/>
          <h3 className={"fs-3 m-0 p-0 d-flex flex-column align-items-start justify-content-center text-balance"} style={{color: "#FC0B65"}}>
            <span className={"fs-inherit"}>Mobilidade.</span>
            <span className={"fs-inherit"}>Pensado com amor.</span>
            <span className={"fs-inherit"}>Feito com tecnologia.</span>
            <span className={"fs-inherit fw-bold"}>Hospedado na infraestrutura da <img src={"https://raw.githubusercontent.com/lotus-media/media-kit/refs/heads/main/favicon.svg"} height={24} width={24} style={{marginBottom: "0.25rem"}} alt={"Logo da Lotus Media"}/> Lotus.</span>
          </h3>
          <Link to={contactLotus} target={"_blank"} className={"text-decoration-none"}>
            <p className={"m-0 p-0"} style={{color: "#FC0B65"}}>Comece seu projeto hoje mesmo <span className={"fs-inherit d-inline-block"} style={{rotate: "-45deg", marginBottom: "1.15px"}}>{"->"}</span></p>
          </Link>
        </Container>
      </div>
    </AnimatedComponents>
  )
}

export default Footer;
