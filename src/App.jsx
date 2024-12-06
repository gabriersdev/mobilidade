import './App.css'

import React, {useEffect} from 'react'
import {Routes, Route} from 'react-router-dom';

import Nav from './components/nav/Nav'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'

import Home from './pages/home/Home'
import Lines from './pages/lines/Lines.jsx'
import Development from './pages/development/Development.jsx'
import TermsOfService from './pages/termsOfService/TermsOfService.jsx'
import Privacy from './pages/privacy/Privacy.jsx'

const Context = React.createContext()
const obj = {}

function App() {
  useEffect(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/mobilidade/service-worker.js")
          .then(() => console.log("Service Worker registrado com sucesso!"))
          .catch((err) => console.error("Erro ao registrar o Service Worker:", err));
      }
    }, []);

  return (
    <Context.Provider value={obj}>
      <Nav/>
      <Main>
        <Routes>
          <Route path="/mobilidade/" element={<Home/>}/>
          <Route path="/mobilidade/lines/:id?" element={<Lines/>}/>
          <Route path="/mobilidade/development" element={<Development/>}/>
          <Route path="/mobilidade/terms-of-service" element={<TermsOfService/>}/>
          <Route path="/mobilidade/privacy" element={<Privacy/>}/>
        </Routes>
      </Main>
      <Footer/>
    </Context.Provider>
  )
}

export default App
