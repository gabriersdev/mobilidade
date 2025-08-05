import {Link} from "react-router-dom";
import {Container, DropdownButton, DropdownItem} from "react-bootstrap";
import "./footer.css";
import {useCallback, useEffect, useState} from "react";
import InstallPWAButton from "../installPWAButton/InstallPWAButton.jsx";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";
import Util from "../../assets/Util.jsx";
import moment from "moment";

const Footer = () => {
  const [version, setVersion] = useState("1.0.0");
  const [cacheVersion, setCacheVersion] = useState("V11");
  
  const [theme, setTheme] = useState("light");
  const [dataBuild, setDataBuild] = useState({datetimeCreate: null});
  
  useEffect(() => {
    fetch((window.location.pathname !== "/" ? "." : "") + "./register.build.json").then((response) => {
      response.json().then((data) => {
        setDataBuild({...data})
      });
    })
  }, []);
  
  useEffect(() => {
    fetch("package.json").then((res) => {
      return res.json();
    }).then(data => {
      if (data && data.version) setVersion(data.version);
    })
    
    fetch("/service-worker.js").then((res) => {
      return res.text();
    }).then(data => {
      const match = data.match(/const cacheNumber = (\d+)/g);
      const cacheN = match.toString().split(" ")[match.toString().split(" ").length - 1];
      if (match && cacheN) setCacheVersion(`V${cacheN}`);
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
        else if (!ls) localStorage.setItem("mobilidade-app", JSON.stringify({theme: theme}));
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
        }
        ;
        setTheme(themeParam)
        document.querySelector('html').dataset.bsTheme = themeParam;
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [theme])
  
  return (
    <AnimatedComponents>
      <footer className="footer border-top bg-body-tertiary">
        <Container className="d-flex flex-column gap-2rem">
          <p className="mb-0 text-body-secondary">&copy; {new Date().getFullYear() || '2024'} Mobilidade</p>
          <ul className="d-flex flex-column g-3 m-0 p-0 footer-link-list">
            <Link to={"./development#topo"} className="footer-link-list-item">Desenvolvimento</Link>
            <Link to="./terms-of-service#topo" className="footer-link-list-item">Termos de serviços</Link>
            <Link to="./privacy#topo" className="footer-link-list-item">Privacidade</Link>
          </ul>
          <div className="d-flex gap-3 flex-wrap">
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
            <DropdownButton id="dropdown-basic-button" title="Tema" variant="secondary" className="mt-1 rounded-circle">
              <DropdownItem active={["default", "light"].includes(theme)} onClick={() => handleTheme("light")}>
                Claro
              </DropdownItem>
              <DropdownItem active={theme === "dark"} onClick={() => handleTheme("dark")}>
                Escuro
              </DropdownItem>
            </DropdownButton>
            
            <InstallPWAButton/>
            {
              (
                <div className={"d-b lock mt-2 text-sml d-flex flex-column gap-1"}>
                  <p className={"text-body-secondary p-0 m-0 fs-inherit"}>Versão: {version || "1.0.0"} | Cache: {cacheVersion || "Não definido"} </p>
                    <p className={"text-body-secondary p-0 m-0 fs-inherit"}>{dataBuild.datetimeCreate && <span>Versão de build: {Util.renderText(moment(dataBuild.datetimeCreate).utc(true).format("HH[h]mm[m] DD/MM/YYYY [GMT-03:00]"))}</span>}</p>
                </div>
              )
            }
          </div>
        </Container>
      </footer>
    </AnimatedComponents>
  )
}

export default Footer;
