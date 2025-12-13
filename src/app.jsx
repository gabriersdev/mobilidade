import './styles/app.css'

import AOS from 'aos';
import axios from 'axios';
import {Button, Image} from "react-bootstrap";
import {createContext, useEffect, useState} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';

import Util from "./assets/Util.jsx";
import config from "./assets/config.js";

import {
  Nav,
  BreadcrumbApp,
  Main,
  Footer
} from "./components/index.d.ts"

import {
  Home,
  Lines,
  Development,
  Live,
  Privacy,
  Search,
  Company,
  News,
  Guide,
  NotFound,
  TermsOfService,
  HistoryDepartureTimes,
  HistoryDayDepartureTimes,
  SabaraInfo,
  HistoryFares,
  DeparturePoints,
  OneDeparturePoints,
  Manifest
} from "./pages/index.d.ts"

// TODO - reorganizar os arquivos em diretórios e pastas conforme o sentido fizer
const Context = createContext({});
const obj = {};

function App() {
  const [publicIp, setPublicIp] = useState(0);
  const location = useLocation();
  
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.hostname !== "localhost") {
      // if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registrado com sucesso!"))
        .catch((err) => console.error("Erro ao registrar o Service Worker:", err));
    }
    
    if (window.location.hostname !== "localhost") {
      fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
          if (data && data?.["ip"]) setPublicIp(data?.["ip"] ?? -1);
        })
        .catch(error => {
          setPublicIp(1);
          console.log("Erro ao obter IP:", error)
        })
    }
  }, []);
  
  useEffect(() => {
    AOS.init();
    
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    });
  }, []);
  
  // Define um REL para os links da página
  useEffect(() => {
    document.querySelectorAll('a').forEach(link => link.setAttribute('rel', 'noopener noreferrer'));
  }, []);
  
  // Define um parâmetro para o import do "script" que forçará a atualizar a versão do cache
  useEffect(() => {
    let [tent, matched] = [0, false]
    
    while (tent < 5 && matched === false) {
      setTimeout(() => {
        const scripts = Array.from(document.querySelectorAll("script"))
        if (scripts) {
          const script = scripts.find(s => s.type === "module" && s.src.match(/\/assets\/index\.\w*\.js/))
          if (script) script.src = script.src + "?v=" + new Date().getTime();
          matched = true
        }
      }, tent > 0 ? 1000 * tent : 1000)
      tent += 1
    }
  }, []);
  
  // Oculta loader
  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.overlay-mobi').style.display = 'none';
    }, 1000);
  }, []);
  
  // Sobe a página ou vai para o item #
  useEffect(() => {
    if (publicIp && window.location.hostname !== "localhost") {
      try {
        axios.post(`${config.host}/api/logs/`, {
          event_type: 'Access page',
          event_details: `Access URL: ${window.location.origin}${window.location.pathname}${window.location.search} ${new Date().getTime()}`,
          os: navigator.userAgent.includes('Windows') ? 'Windows' : navigator.userAgent.includes('MacOS') ? 'MacOS' : navigator.userAgent.slice(0, 254),
          browser: navigator.userAgent.slice(0, 254),
          ip_address: publicIp,
          user_agent: navigator.userAgent.slice(0, 254),
          page: window.location.pathname,
          line_id_access: window.location.pathname.includes("lines") ? !isNaN(parseInt(window.location.pathname.split('/').pop())) ? window.location.pathname.split('/').pop() : null : null,
          referrer: document?.referrer || "",
        }).then(() => {
        })
      } catch (error) {
        console.log(`Ocorreu um erro ao registrar log.`);
        if (window.location.hostname === "localhost") console.log(error);
      }
    }
    
    try {
      // Verificar se #[id] existe e rolar a página até ele
      if (location.hash && (location.pathname !== "lines") && !location.pathname?.split("/")?.[1]?.match(/\d/)) {
        const id = location.hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) window.scrollTo({top: element.offsetTop, behavior: 'smooth'})
        else {
          setTimeout(() => {
            window.scrollTo({top: 0, behavior: 'smooth'})
          }, 100);
        }
      } else if (!location.pathname.match(/lines\/\d+\/#\w+/)) {
        setTimeout(() => {
          window.scrollTo({top: 0, behavior: 'smooth'})
        }, 100);
      }
    } catch (error) {
      console.log('Ocorreu um erro ao tentar verificar os parâmetros passados. %s', error);
    }
  }, [location, publicIp]);
  
  // Limpeza de cache do SW
  useEffect(() => {
    // TODO - FN - Verificar versão de SW salva no localStorage e a versão de SW atual
    Util.clearServiceWorker();
  }, []);
  
  return (
    <Context.Provider value={obj}>
      <div className={'position-relative'}>
        <Nav/>
        <Main>
          <BreadcrumbApp/>
          <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/404" element={<NotFound/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/lines/:id?" element={<Lines/>}/>
            <Route path="/development" element={<Development/>}/>
            <Route path="/terms-of-service" element={<TermsOfService/>}/>
            <Route path="/privacy" element={<Privacy/>}/>
            <Route path="/company/:id?" element={<Company/>}/>
            <Route path="/news/:id?" element={<News/>}/>
            <Route path="/guide" element={<Guide/>}/>
            <Route path="/live" element={<Live/>}/>
            <Route path="/history/departure-times/:id" element={<HistoryDepartureTimes/>}/>
            <Route path="/history/departure-times/:id/:id" element={<HistoryDayDepartureTimes/>}/>
            <Route path="/history/fares/:id" element={<HistoryFares/>}/>
            <Route path="/history/departure-points/:id" element={<DeparturePoints/>}/>
            <Route path="/history/departure-points/:id/:id" element={<OneDeparturePoints/>}/>
            <Route path="/sabara" element={<SabaraInfo/>}/>
            <Route path="/manifest" element={<Manifest/>}/>
          </Routes>
        </Main>
        <Footer/>
        <Button onClick={(e) => {
          e.preventDefault();
          window.scrollTo({top: 0, behavior: 'smooth'});
        }} className={"position-fixed rounded-2 z-2 bg-body"} style={{right: "1rem", bottom: "1rem"}}>
          <div className={"d-flex flex-wrap align-items-center justify-content-center gap-2"}>
            <span>Subir</span>
            <Image src={"/static/mobilidade-blue.png"} width={20} height={20} className={"object-fit-cover rounded-1"}/>
            <i className="bi bi-arrow-up-square"></i>
          </div>
        </Button>
      </div>
    </Context.Provider>
  )
}

export default App
