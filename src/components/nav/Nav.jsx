import {Nav as BootstrapNav, Navbar, Container} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";

import "./nav.css";
import {useCallback, useEffect, useRef, useState} from "react";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";

const infos = [
  {
    title: "Linhas afetadas pela redução do quadro de horários",
    message: (<>Redução afeta as linhas 03, 04, 05 e 07 do transporte público municipal de Sabará-MG, operadas pela
      Vinscol. Válido a partir de quinta-feira, 03<span className={"arial"}>/</span>04</>),
    init: "2025-04-03T00:00:00-03:00",
    finish: "2025-04-13T00:00:00-03:00",
  }
]

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
  const [elements, setElements] = useState({})
  const [areaFocus, setAreaFocus] = useState(null)
  const variable = useRef(null)
  
  const includeElements = useCallback(() => {
    ["partidas", "paradas", "pontos-de-recarga"].forEach(i => {
      setElements(prev => {
        return {
          ...prev,
          [i]: document.querySelector(`#${i}`)
        }
      })
    })
  }, [])
  
  useEffect(() => {
    includeElements()
  }, []);
  
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
      
      distances.sort((a, b) => a.distance > b.distance)
      let moreProximity = null
      
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
  }, [elements]);
  
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(`${id}`)
    const navbar = document.querySelector(`nav.navbar`)
    window.scrollTo({
      top: el.offsetTop - navbar.clientHeight,
      behavior: "smooth"
    })
  }
  
  return (
    <AnimatedComponents>
      <BootstrapNav.Item className={"h-100 d-flex align-items-center me-2 py-2 d-none"}>Navegue por</BootstrapNav.Item>
      <BootstrapNav.Link className={"text-body-secondary"} style={areaFocus === "partidas" ? {fontWeight: "bold"} : {fontWeight: "normal"}} onClick={(e) => scrollTo(e, "#partidas")}>Horários</BootstrapNav.Link>
      <BootstrapNav.Link className={"text-body-secondary"} style={areaFocus === "paradas" ? {fontWeight: "bold"} : {fontWeight: "normal"}} onClick={(e) => scrollTo(e, "#paradas")}>Paradas</BootstrapNav.Link>
      <BootstrapNav.Link className={"text-body-secondary"} style={areaFocus === "pontos-de-recarga" ? {fontWeight: "bold"} : {fontWeight: "normal"}} onClick={(e) => scrollTo(e, "#pontos-de-recarga")}>Recarga</BootstrapNav.Link>
    </AnimatedComponents>
  )
}

const Nav = () => {
  const [width, setWidth] = useState(document.body.offsetWidth);
  const location = useLocation();
  const [isInLinePage, setIsInLinePage] = useState(null);
  
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(document.body.offsetWidth);
    })
  }, []);
  
  useEffect(() => {
    if (location.pathname.match(/lines\/\d*/)) setIsInLinePage(true)
    else setIsInLinePage(false)
  }, [location]);
  
  return (
    <>
      <AnimatedComponents>
        <BarInfo/>
      </AnimatedComponents>
      
      <div className={`${width > 766 ? "position-sticky top-0" : ""}`} style={width > 766 ? {zIndex: 200} : {zIndex: 100}}>
        <AnimatedComponents>
          <Navbar expand="lg" className={`bg-body-tertiary border-bottom ${width > 766 ? "position-sticky top-0" : ""}`}>
            <Container className="my-1 d-flex justify-content-between align-items-center w-100 flex-wrap">
              <Navbar.Brand as={Link} to="./" className={"text-body-secondary"} style={{letterSpacing: '-0.75px'}}>
                <img src={'./images/logo-transparent.png'} alt={'Logo'} className={'me-2'} style={{height: '3rem'}}/>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <BootstrapNav className="me-auto w-100">
                  <BootstrapNav.Link as={Link} className={"text-primary"} to="./">Início</BootstrapNav.Link>
                  <BootstrapNav.Link as={Link} className={"text-primary"} to="./lines">Linhas</BootstrapNav.Link>
                  <BootstrapNav.Link as={Link} className={"text-primary"} to="./search">Pesquisa</BootstrapNav.Link>
                  
                  {isInLinePage && width > 766 ? <div className={width > 991 ? "d-flex flex-wrap justify-content-end flex-grow-1" : ""} id={"nav-scrollspy"}><NavScrollspy/></div> : ""}
                
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
