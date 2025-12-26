import "./nav.css";

import moment from 'moment';
import 'moment/locale/pt-br';
import Tooltip from "react-bootstrap/Tooltip";
import {Link, useLocation} from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {useCallback, useEffect, useRef, useState} from "react";
import {Nav as BootstrapNav, Navbar, Container, Badge} from "react-bootstrap";

import FormNav from "./form-nav.jsx";
import Util from "../../../assets/Util.jsx";
import infos from "../../../assets/infos.jsx"
import AnimatedComponents from "../animated-component/animated-components.jsx";
import InstallPWAButton from "../../install-PWA-button/install-PWA-button.jsx";

moment.locale("pt-br");

const BarInfo = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setShow(document.body.offsetWidth > 766);
    
    window.addEventListener("resize", () => {
      setShow(document.body.offsetWidth > 766);
    })
  }, []);
  
  const isValidInfos = infos.filter(i => {
    return new Date().getTime() >= new Date(i.init).getTime() &&
      new Date().getTime() <= new Date(i.finish).getTime()
  })
  
  return isValidInfos.map(({title, message}, index) => (
    <div className={`py-4 bg-danger-subtle border-bottom border-danger-subtle`} style={infos.length - 1 === index ? {zIndex: 100} : {}} key={index}>
      <details className={"container"} open={show}>
        <summary className={"fs-6 mb-0 fw-bold text-danger text-balance bar-info-summary sm-text-center"}>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {title}
        </summary>
        <p className={"fw-light mt-2 mb-0 text-balance sm-text-center"}>{message}</p>
      </details>
    </div>
  ))
}

const NavScrollspy = () => {
  const [elements, setElements] = useState({});
  const [areaFocus, setAreaFocus] = useState(null);
  const variable = useRef(null);
  
  const includeElements = useCallback(() => {
    ["partidas", "paradas", "pontos-de-recarga", "resume"].forEach(i => {
      setElements(prev => {
        return {
          ...prev,
          [i]: document.querySelector(`#${i}`)
        }
      })
    })
  }, []);
  
  useEffect(() => {
    includeElements();
  }, [includeElements]);
  // }, []);
  
  useEffect(() => {
    if (!elements || !Object.keys(elements).length) return;
    
    const handleScroll = () => {
      const distances = Object.entries(elements).map(([key, value]) => {
        if (!value) return;
        return {id: key, distance: value.getBoundingClientRect().y};
      });
      
      if (!distances || distances.every(d => !d)) {
        includeElements()
        return
      }
      
      distances.sort((a, b) => a.distance > b.distance);
      let moreProximity;
      
      if (distances.every(d => d.distance < 0)) moreProximity = distances[distances.length - 1]
      else if (distances.find(d => d.distance < 0)) moreProximity = distances.find(d => d.distance > 0);
      else moreProximity = distances[0];
      
      if (moreProximity) setAreaFocus(moreProximity.id)
      else setAreaFocus(null)
    };
    
    variable.current = handleScroll;
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      if (variable.current) {
        window.removeEventListener("scroll", variable.current);
        variable.current = null;
      }
    };
  }, [includeElements, elements]);
  // }, [elements]);
  
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(`${id}`);
    const navbar = document.querySelector(`nav.navbar`);
    window.scrollTo({
      top: el.offsetTop - navbar.clientHeight,
      behavior: "smooth"
    });
    window.location.hash = id;
  }
  
  return (
    <AnimatedComponents>
      <div className={"d-inline-flex gap-3 flex-wrap align-items-center justify-content-center py-2"}>
        <BootstrapNav.Item className={"h-100 align-items-center me-2 py-2 d-none gap-3 flex-wrap"}>Navegue por</BootstrapNav.Item>
        <BootstrapNav.Link className={"text-primary p-0 d-none d-sm-inline-block"} style={areaFocus === "id" ? {fontWeight: "bold"} : {fontWeight: "normal"}} onClick={(e) => scrollTo(e, "#id")}>Informações</BootstrapNav.Link>
        <BootstrapNav.Link className={"text-primary p-0"} style={areaFocus === "partidas" ? {fontWeight: "bold"} : {fontWeight: "normal"}} onClick={(e) => scrollTo(e, "#partidas")}>Horários</BootstrapNav.Link>
        <BootstrapNav.Link className={"text-primary p-0"} style={areaFocus === "paradas" ? {fontWeight: "bold"} : {fontWeight: "normal"}} onClick={(e) => scrollTo(e, "#paradas")}>Paradas</BootstrapNav.Link>
        <BootstrapNav.Link className={"text-primary p-0"} style={areaFocus === "pontos-de-recarga" ? {fontWeight: "bold"} : {fontWeight: "normal"}} onClick={(e) => scrollTo(e, "#pontos-de-recarga")}>Recarga</BootstrapNav.Link>
        <BootstrapNav.Link className={"text-primary p-0 d-none"} style={areaFocus === "resume" ? {fontWeight: "bold"} : {fontWeight: "normal"}} onClick={(e) => scrollTo(e, "#resume")}>Sobre</BootstrapNav.Link>
      </div>
    </AnimatedComponents>
  )
}

const Nav = () => {
  const [width, setWidth] = useState(document.body.offsetWidth);
  const location = useLocation();
  const [isInLinePage, setIsInLinePage] = useState(null);
  const formatString = useRef("dddd DD/MM HH[h]mm[min]");
  const [sabaraTime, setSabaraTime] = useState(moment().format(formatString.current));
  
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(document.body.offsetWidth);
    })
  }, []);
  
  useEffect(() => {
    if (location.pathname.match(/lines\/\d*/)) setIsInLinePage(true)
    else setIsInLinePage(false)
  }, [location]);
  
  useEffect(() => {
    const int = setInterval(() => {
      setSabaraTime(moment().format(formatString.current));
    }, 1000);
    
    return () => {
      clearInterval(int);
    }
  }, []);
  
  return (
    <>
      <AnimatedComponents>
        <BarInfo/>
      </AnimatedComponents>
      
      <div className={`${width > 1200 ? "position-sticky top-0" : ""}`} style={width > 766 ? {zIndex: 200} : {zIndex: 100}}>
        <AnimatedComponents>
          <Navbar expand="lg" className={`bg-body-tertiary border-bottom ${width > 766 ? "position-sticky top-0" : ""}`}>
            <Container className="my-1 d-flex align-items-start justify-content-between flex-md-column  align-items-xl-center flex-xl-row w-100 flex-wrap ">
              <div className={"d-flex align-items-center justify-content-between gap-1 flex-row w-100 flex-wrap"}>
                <Navbar.Brand as={Link} to="./" className={"text-body-secondary me-5 d-flex justify-content-center align-items-center flex-wrap"} style={{letterSpacing: '-0.75px'}}>
                  <img src={'/images/logo-transparent.png'} alt={'Logo'} className={'me-2'} style={{height: '3rem'}}/>
                  <div style={{fontFamily: "'Inter', 'Inter Tight', sans-serif"}} className={"d-flex flex-column"}>
                    <span className={"text-primary d-block"}>Mobilidade</span>
                    <span className={"text-body-secondary text-sml d-none d-sm-inline-block"}>Transporte Público em Sabará-MG</span>
                    <span className={"text-body-secondary text-sml d-inline-block d-sm-none"}>em Sabará-MG</span>
                  </div>
                </Navbar.Brand>
                <div className={"d-none d-lg-block"}>
                  <FormNav/>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={"mt-3 mt-sm-0"}/>
              </div>
              <Navbar.Collapse id="basic-navbar-nav">
                <BootstrapNav className={"me-auto w-100 d-flex " + (width > 1200 ? "align-items-center" : "flex-column align-items-start justify-content-end my-3")}>
                  <BootstrapNav.Link as={Link} className={"text-primary-emphasis"} to="./">Início</BootstrapNav.Link>
                  <BootstrapNav.Link as={Link} className={"text-primary-emphasis"} to="./lines">Linhas</BootstrapNav.Link>
                  <BootstrapNav.Link as={Link} className={"text-primary-emphasis d-inline-block d-lg-none"} to="./search">Pesquisa</BootstrapNav.Link>
                  <BootstrapNav.Link as={Link} className={"text-primary-emphasis"} to="./news">Notícias</BootstrapNav.Link>
                  <BootstrapNav.Link as={Link} className={"text-primary-emphasis"} to="./guide">Guia</BootstrapNav.Link>
                  <BootstrapNav.Link as={Link} className={"text-primary-emphasis"} to="./live">
                    <div className={"d-flex align-items-center flex-wrap"}>
                      {moment().diff(moment("2025-11-14T23:59:00"), "minutes") < 0 && (<Badge className={"rounded-pill me-2 text-uppercase fw-bold"} style={{paddingBottom: "4.25px", paddingTop: "4.25px"}}>Novo</Badge>)}
                      <div className={"live-indicator me-1"}>
                        <div className={"live-dot"}></div>
                      </div>
                      <span className={"text-danger-emphasis"}>Ao vivo</span>
                    </div>
                  </BootstrapNav.Link>
                  <OverlayTrigger overlay={
                    <Tooltip placement={"bottom"}>
                      <p className={"m-0 p-0 text-sml"}>
                        {Util.translateWeekDay(sabaraTime?.split(" ")?.[0], {suffix: true})},{" "}
                        {Util.renderText((sabaraTime?.split(" ")?.[1]))}
                      </p>
                    </Tooltip>
                  }>
                    <Link to={"/sabara"} className={"d-flex flex-row align-items-center gap-1 text-decoration-none " + (width > 1200 ? "mx-2" : "mt-2 mx-0")}>
                      <span className={"text-body-secondary d-inline-block"}>Sabará</span>
                      <i style={{fontSize: "2px"}} className="bi bi-circle-fill"></i>
                      <div className={"text-body-secondary d-none d-sm-inline-block"}>
                        <span className={"text-uppercase"}>{Util.renderText((sabaraTime?.split(" ")?.[1]))}</span>
                        <span>{" "}{sabaraTime?.split(" ")?.[2]}</span>
                      </div>
                      <div className={"text-body-secondary d-inline-block d-sm-none"}>
                        <span className={"text-uppercase"}>{Util.renderText((sabaraTime?.split(" ")?.[1])?.normalize("NFD"))}</span>
                        <span>{" "}{sabaraTime?.split(" ")?.[2]}</span>
                      </div>
                    </Link>
                  </OverlayTrigger>
                  <div className={"ms-2"}><InstallPWAButton/></div>
                  {isInLinePage && width > 766 ? (
                    <div className={width > 991 ? "d-flex flex-wrap justify-content-end flex-grow-1" : ""} id={"nav-scrollspy"}>
                      <NavScrollspy/>
                    </div>
                  ) : ""
                  }
                </BootstrapNav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </AnimatedComponents>
      </div>
      
      {
        isInLinePage && width < 766 ? (
          <div className={`${width < 766 ? "position-sticky top-0" : ""}`} style={width < 766 ? {zIndex: 200} : {zIndex: 100}}>
            <AnimatedComponents>
              <div className={"bg-body-tertiary border-bottom py-2"}>
                <div className={"container d-flex align-items-center justify-content-center gap-3 flex-wrap"} id={"nav-scrollspy"}>
                  <NavScrollspy/>
                </div>
              </div>
            </AnimatedComponents>
          </div>
        ) : ""
      }
    </>
  )
}

export default Nav;
