import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import "./footer.css";
import {useCallback, useEffect, useState} from "react";
import InstallPWAButton from "../installPWAButton/InstallPWAButton.jsx";

const Footer = () => {
  const [version, setVersion] = useState("1.0.0");
  const [cacheVersion, setCacheVersion] = useState("V11");
  
  const [theme, setTheme] = useState("default");
  
  useEffect(() => {
    fetch("package.json").then((res) => {
      return res.json();
    }).then(data => {
      if (data && data.version) setVersion(data.version);
    })
    
    fetch("/service-worker.js").then((res) => {
      return res.text();
    }).then(data => {
      const match = data.match(/const cacheVersion = "(\w*\d{1,})"/);
      if (match && match[1]) setCacheVersion(match[1].toUpperCase());
    })
  }, []);
  
  useEffect(() => {
    if (!("localStorage" in window)) {
      console.log("Navegador não suporta localStorage");
    } else {
      let ls
      
      try {
        ls = JSON.parse(localStorage.getItem("mobilidade-app"));
        if (ls && ls["theme"]) handleTheme(ls["theme"]);
      } catch (err) {
        console.log(err.message)
      }
    }
  }, [])
  
  const handleTheme = useCallback((themeParam) => {
    if (!["default", "light", "dark"].includes(themeParam)) {
      throw new Error(`Theme "${themeParam}" is not supported`);
    }
    
    if ("localStorage" in window) {
      try {
        let ls = JSON.parse(localStorage.getItem("mobilidade-app"));
        if (ls && ls["theme"]) {
          localStorage.setItem("mobilidade-app", JSON.stringify({
            ...ls,
            theme: themeParam
          }));
        };
        setTheme(themeParam)
        document.querySelector('html').dataset.bsTheme = themeParam;
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [theme])
  
  return (
    <footer className="footer border-top bg-body-tertiary">
      <Container className="d-flex flex-column gap-2rem">
        <p className="mb-0 text-body-secondary">&copy; {new Date().getFullYear() || '2024'} Mobilidade</p>
        <ul className="d-flex flex-column g-3 m-0 p-0 footer-link-list">
          <Link to={"./development#topo"} className="footer-link-list-item">Desenvolvimento</Link>
          <Link to="./terms-of-service#topo" className="footer-link-list-item">Termos de serviços</Link>
          <Link to="./privacy#topo" className="footer-link-list-item">Privacidade</Link>
        </ul>
        <div className="d-flex gap-3 flex-wrap">
          <p className={"text-body-secondary p-0 m-0"}>Versão: {version || "1.0.0"} | Cache: {cacheVersion || "Não definido"} </p>
          <button className={"btn text-start p-0 m-0 text-primary-emphasis border-0"} onClick={() => {
            if ('serviceWorker' in navigator) {
              caches.keys().then(function (names) {
                for (let name of names) caches.delete(name);
              });
            }
            window.location.reload();
          }}>
            <span className={"me-1"}>Limpar cache</span>
            <i className="bi bi-database-fill-x"></i>
          </button>
          {/*TODO - separar em um componente a parte*/}
          <div className="dropdown mt-1">
            <button className="btn btn-secondary dropdown-toggle rounded-pill px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Tema
            </button>
            <ul className="dropdown-menu">
              <li><a className={"dropdown-item cursor-pointer" + (["default", "light"].includes(theme) ? " active" : "")} onClick={() => handleTheme("light")}>Claro</a></li>
              <li><a className={"dropdown-item cursor-pointer" + ((theme === "dark") ? " active" : "")} onClick={() => handleTheme("dark")}>Escuro</a></li>
            </ul>
          </div>
          <InstallPWAButton/>
        </div>
      </Container>
    </footer>
  )
}

export default Footer;
