import {Nav as BootstrapNav, Navbar, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./nav.css";
import {useEffect, useState} from "react";

const infos = [
  {
    title: "Linhas afetadas pela redução do quadro de horários",
    message: (<>Redução afeta as linhas 03, 04, 05 e 07 do transporte público municipal de Sabará-MG, operadas pela
      Vinscol. Válido a partir de quinta-feira, 03<span className={"arial"}>/</span>04</>)
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
  
  return infos.map(({title, message}, index) => (
    <div className={`py-4 bg-danger-subtle ${!show ? "position-sticky" : ""} top-0 border-bottom border-danger-subtle`} style={infos.length - 1 === index ? {zIndex: 100} : {}} key={index}>
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

const Nav = () => {
  const [width, setWidth] = useState(document.body.offsetWidth);
  
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(document.body.offsetWidth);
      console.log(document.body.offsetWidth);
    })
      console.log(document.body.offsetWidth)
  }, []);
  
  return (
    <>
      <BarInfo/>
      <Navbar expand="lg" className={`bg-body-tertiary border-bottom ${width > 766 ? "position-sticky top-0" : ""}`} style={width > 766 ? {zIndex: 101} : {zIndex: 99}}>
        <Container className="my-1 d-flex justify-content-between align-items-center w-100 flex-wrap">
          <Navbar.Brand as={Link} to="./" className={"text-body-secondary"} style={{letterSpacing: '-0.75px'}}>
            <img src={'./images/logo-transparent.png'} alt={'Logo'} className={'me-2'} style={{height: '3rem'}}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <BootstrapNav className="me-auto">
              <BootstrapNav.Link as={Link} className={"text-primary"} to="./">Início</BootstrapNav.Link>
              <BootstrapNav.Link as={Link} className={"text-primary"} to="./lines">Linhas</BootstrapNav.Link>
              <BootstrapNav.Link as={Link} className={"text-primary"} to="./search">Pesquisa</BootstrapNav.Link>
            </BootstrapNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Nav;
