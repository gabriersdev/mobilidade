import {Nav as BootstrapNav, Navbar, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./nav.css";

const infos = [
  {
    title: "Linhas afetadas pela redução do quadro de horários",
    message: (<>Redução afeta as linhas 03, 04, 05 e 07 do transporte público municipal de Sabará-MG, operadas pela
      Vinscol. Válido a partir de quinta-feira, 03<span className={"arial"}>/</span>04</>)
  }
]

const BarInfo = () => {
  return infos.map(({title, message}, index) => (
    <div className={"py-4 bg-danger-subtle"} key={index}>
      <div className="container">
        <h2 className={"fs-6 mb-2 fw-bold text-danger"}>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {title}
        </h2>
        <p className={"fw-light mb-0 text-balance"}>{message}</p>
      </div>
    </div>
  ))
}

const Nav = () => {
  return (
    <>
      <BarInfo/>
      <Navbar expand="lg" className="bg-body-tertiary border-bottom">
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
