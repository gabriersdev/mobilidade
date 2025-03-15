import './App.css'

import {createContext, useEffect, useState} from 'react'
import {Routes, Route, useLocation} from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';

import Nav from './components/nav/Nav'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'

import Home from './pages/home/Home'
import Lines from './pages/lines/Lines.jsx'
import Development from './pages/development/Development.jsx'
import TermsOfService from './pages/termsOfService/TermsOfService.jsx'
import Privacy from './pages/privacy/Privacy.jsx'
import Search from "./pages/search/Search.jsx";
import Company from './pages/company/Company.jsx'
import config from "./config.js";
import BreadcrumbApp from "./components/breadcrumbApp/BreadcrumbApp.jsx";

const Context = createContext();
const obj = {};

function App() {
  const [publicIp, setPublicIp] = useState(0);

  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.hostname !== "localhost") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registrado com sucesso!"))
        .catch((err) => console.error("Erro ao registrar o Service Worker:", err));
    }

    fetch("https://api64.ipify.org?format=json")
      .then(response => response.json())
      .then(data => {
        if (data && data.ip) setPublicIp(data.ip);
      })
      .catch(error => {
        setPublicIp(1);
        console.log("Erro ao obter IP:", error)
      })
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
  }, [])

  // Define um REL para os links da página
  useEffect(() => {
    document.querySelectorAll('a').forEach(link => link.setAttribute('rel', 'noopener noreferrer'));
  }, []);

  if (publicIp && window.location.hostname !== "localhost") {
    try {
      axios.post(`${config.host}/api/logs/`, {
        event_type: 'Acesss page',
        event_details: `Access URL: ${window.location.origin}${window.location.pathname}${window.location.search} ${new Date().getTime()}`,
        os: navigator.userAgent.includes('Windows') ? 'Windows' : navigator.userAgent.includes('MacOS') ? 'MacOS' : navigator.userAgent.slice(0, 254),
        browser: navigator.userAgent.slice(0, 254),
        ip_address: publicIp,
        user_agent: navigator.userAgent.slice(0, 254),
        page: window.location.pathname,
        line_id_access: window.location.pathname.includes("lines") ? !isNaN(parseInt(window.location.pathname.split('/').pop())) ? window.location.pathname.split('/').pop() : null : null,
      }).then(() => {
      })
    } catch (error) {
      console.log(`Ocorreu um erro ao registrar log.`);
      if (window.location.hostname === "localhost") console.log(error);
    }
  }

  try {
    const location = useLocation();
    // Verificar se #[id] existe e rolar a página até ele
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) window.scrollTo({top: element.offsetTop, behavior: 'smooth'})
      else window.scrollTo({top: 0, behavior: 'smooth'});
    } else window.scrollTo({top: 0, behavior: 'smooth'});
  } catch (error) {
    console.log('Ocorreu um erro ao tentar verificar os parâmetros passados. %s', error);
  }

  return (
    <Context.Provider value={obj}>
      <Nav/>
      <Main>
        <BreadcrumbApp/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/lines/:id?" element={<Lines/>}/>
          <Route path="/development" element={<Development/>}/>
          <Route path="/terms-of-service" element={<TermsOfService/>}/>
          <Route path="/privacy" element={<Privacy/>}/>
          <Route path="/company/:id?" element={<Company/>}/>
        </Routes>
      </Main>
      <Footer/>
    </Context.Provider>
  )
}

export default App
