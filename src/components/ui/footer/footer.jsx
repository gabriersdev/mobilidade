import {Container} from "react-bootstrap";
import "./footer.css";
import AnimatedComponents from "../animated-component/animated-components.jsx";
import {ActionButtons, FooterLinkList, LineLinks, LotusBanner, PageLinks, VersionInfo,} from "./components";

const Footer = () => {
  return (
    <AnimatedComponents>
      <footer className="footer border-top bg-body-tertiary">
        <Container className="d-flex flex-column gap-2rem">
          <p className="mb-0 text-body-secondary">&copy; {new Date().getFullYear() || '2024'} Mobilidade</p>
          <LineLinks/>
          <PageLinks/>
          <FooterLinkList/>
          <ActionButtons/>
          <VersionInfo/>
        </Container>
      </footer>
      
      <LotusBanner/>
    </AnimatedComponents>
  )
}

export default Footer;
