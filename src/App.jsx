import './App.css'

import {createContext, useEffect} from 'react'
import {Routes, Route, useLocation} from 'react-router-dom';

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

const Context = createContext()
const obj = {}

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.hostname !== "localhost") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registrado com sucesso!"))
        .catch((err) => console.error("Erro ao registrar o Service Worker:", err));
    }
  }, []);

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
