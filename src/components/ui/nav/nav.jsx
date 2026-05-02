import "./nav.css";
import moment from 'moment';
import {Link} from "react-router-dom";
import {Badge, Container, Nav as BootstrapNav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";

import {useNavState} from "./use-nav-state.js";
import {dateConfigs, navLinks} from "@/assets/resources.js";
import Util from "@/lib/Util.jsx";
import FormNav from "./form-nav.jsx";
import BarInfo from "./bar-info.jsx";
import NavScrollspy from "./nav-scrollspy.jsx";
import AnimatedComponents from "../animated-component/animated-components.jsx";
import InstallPWAButton from "../../install-PWA-button/install-PWA-button.jsx";

moment.locale(dateConfigs.lang);

const Nav = () => {
  const {width, isInLinePage, sabaraTime, expanded, setExpanded, navbarRef} = useNavState();
  
  return (
    <>
      <AnimatedComponents>
        <BarInfo/>
      </AnimatedComponents>
      
      <div ref={navbarRef} className={`${width > 1200 ? "position-sticky top-0" : ""}`} style={{zIndex: width > 766 ? 200 : 100}}>
        <AnimatedComponents>
          <Navbar expand="lg" className={`bg-body-tertiary border-bottom ${width > 766 ? "position-sticky top-0" : ""}`} expanded={expanded} onToggle={setExpanded}>
            <Container className="my-1 d-flex align-items-start justify-content-between flex-md-column align-items-xl-center flex-xl-row w-100 flex-wrap">
              <div className="d-flex align-items-center justify-content-between gap-1 flex-row w-100 flex-wrap">
                <Navbar.Brand as={Link} to="./" onClick={() => setExpanded(false)} className="text-body-secondary me-5 d-flex justify-content-center align-items-center flex-wrap">
                  <img src={'/images/logo-transparent.png'} alt={'Logo'} className={'me-2'} style={{height: '3rem'}}/>
                  <div style={{fontFamily: "'Inter', 'Inter Tight', sans-serif"}} className="d-flex flex-column">
                    <span className="text-primary d-block">Mobilidade</span>
                    <span className="text-primary-emphasis text-sml d-none d-sm-inline-block">Transporte Público em Sabará-MG</span>
                    <span className="text-primary-emphasis text-sml d-inline-block d-sm-none">em Sabará-MG</span>
                  </div>
                </Navbar.Brand>
                
                <div className="d-none d-lg-block"><FormNav/></div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mt-3 mt-sm-0 p-0 me-2 mb-2 border-0 rounded-0" style={{boxShadow: "none"}}/>
              </div>
              
              <Navbar.Collapse id="basic-navbar-nav">
                <BootstrapNav className={`me-auto w-100 d-flex ${width > 1200 ? "align-items-center" : "flex-column align-items-start justify-content-end my-3"}`}>
                  {navLinks.filter(n => !n.showOnlyFooter).map(link => (
                    <BootstrapNav.Link as={Link} className={`text-primary-emphasis ${link.mobileOnly ? 'd-inline-block d-lg-none' : ''}`} to={link.path} onClick={() => setExpanded(false)} key={link.name}>
                      {link.isLive ? (
                        <div className="d-flex align-items-center flex-wrap">
                          {moment().diff(moment("2025-11-14T23:59:00"), "minutes") < 0 && (<Badge className="rounded-pill me-2 text-uppercase fw-bold" style={{paddingBottom: "4.25px", paddingTop: "4.25px"}}>Novo</Badge>)}
                          <div className="live-indicator me-1">
                            <div className="live-dot"></div>
                          </div>
                          <span className="text-danger-emphasis">{link.name}</span>
                        </div>
                      ) : link.name}
                    </BootstrapNav.Link>
                  ))}
                  
                  <OverlayTrigger overlay={<Tooltip placement="bottom"><p className="m-0 p-0 text-sml">{Util.translateWeekDay(sabaraTime?.split(" ")?.[0], {suffix: true})}, {Util.renderText((sabaraTime?.split(" ")?.[1]))}</p></Tooltip>}>
                    <Link to="/sabara" onClick={() => setExpanded(false)} className={`d-flex flex-row align-items-center gap-1 text-decoration-none ${width > 1200 ? "mx-2" : "mt-2 mx-0"}`}>
                      <span className="text-body-secondary d-inline-block">Sabará</span>
                      <i style={{fontSize: "2px"}} className="bi bi-circle-fill"></i>
                      <div className="text-body-secondary d-none d-sm-inline-block">
                        <span className="text-uppercase">{Util.renderText((sabaraTime?.split(" ")?.[1]))}</span>
                        <span> {sabaraTime?.split(" ")?.[2]}</span>
                      </div>
                      <div className="text-body-secondary d-inline-block d-sm-none">
                        <span className="text-uppercase">{Util.renderText((sabaraTime?.split(" ")?.[1])?.normalize("NFD"))}</span>
                        <span> {sabaraTime?.split(" ")?.[2]}</span>
                      </div>
                    </Link>
                  </OverlayTrigger>
                  
                  <div className="ms-2"><InstallPWAButton onClick={() => setExpanded(false)}/></div>
                  {isInLinePage && width > 766 && (
                    <div className={width > 991 ? "d-flex flex-wrap justify-content-end flex-grow-1" : ""} id="nav-scrollspy">
                      <NavScrollspy closeNav={() => setExpanded(false)}/>
                    </div>
                  )}
                </BootstrapNav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </AnimatedComponents>
      </div>
      
      {isInLinePage && width < 766 && (
        <div className="position-sticky top-0" style={{zIndex: 200}}>
          <AnimatedComponents>
            <div className="bg-body-tertiary border-bottom py-2">
              <div className="container d-flex align-items-center justify-content-center gap-3 flex-wrap" id="nav-scrollspy">
                <NavScrollspy/>
              </div>
            </div>
          </AnimatedComponents>
        </div>
      )}
    </>
  );
};

export default Nav;
