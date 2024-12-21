import './App.css'

import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Nav from './components/nav/Nav'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'

import Home from './pages/home/Home'
import Lines from './pages/lines/Lines.jsx'
import Development from './pages/development/Development.jsx'
import TermsOfService from './pages/termsOfService/TermsOfService.jsx'
import Privacy from './pages/privacy/Privacy.jsx'

function App() {
  return (
    <>
      <Nav />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lines/:id?" element={<Lines />} />
          <Route path="/development" element={<Development />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes >
      </Main>
      <Footer />
    </>
  )
}

export default App
