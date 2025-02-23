import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import "./footer.css";
import {useEffect, useState} from "react";

const Footer = () => {
  const [version, setVersion] = useState("1.0.0");
  const [cacheVersion, setCacheVersion] = useState("V11");

  useEffect(() => {
    fetch("package.json").then((res) => {
      return res.json();
    }).then(data => {
      if (data && data.version) setVersion(data.version);
    })

    fetch("service-worker.js").then((res) => {
      return res.text();
    }).then(data => {
      const match = data.match(/const cacheVersion = "(\w*\d{1,})"/);
      if (match && match[1]) setCacheVersion(match[1].toUpperCase());
    })
  }, []);

  return (
    <footer className="footer border-top bg-body-tertiary">
      <Container className="d-flex flex-column gap-2rem">
        <p className="mb-0 text-body-secondary">&copy; {new Date().getFullYear() || '2024'} Mobilidade</p>
        <ul className="d-flex flex-column g-3 m-0 p-0 footer-link-list">
          <Link to={"./development#topo"} className="footer-link-list-item">Desenvolvimento</Link>
          <Link to="./terms-of-service#topo" className="footer-link-list-item">Termos de serviços</Link>
          <Link to="./privacy#topo" className="footer-link-list-item">Privacidade</Link>
        </ul>
        <p className={"text-body-secondary"}>Versão: {version || "1.0.0"} | Cachê: {cacheVersion || "V11"} </p>
      </Container>
    </footer>
  )
}

export default Footer;
