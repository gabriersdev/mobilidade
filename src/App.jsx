import './App.css'

import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import Nav from './components/nav/Nav'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'

import Home from './pages/home/Home'
import Lines from './pages/lines/Lines.jsx'
import Search from './pages/search/Search.jsx'
import Development from './pages/development/Development.jsx'
import TermsOfService from './pages/termsOfService/TermsOfService.jsx'
import Privacy from './pages/privacy/Privacy.jsx'

function App() {
  return (
    <>
      <Nav />
      <Main>
        <Routes>
          <Route path="/mobilidade/" element={<Home />} />
          <Route path="/mobilidade/lines/:id?" element={<Lines />} />
          <Route path="/mobilidade/search" element={<Search />} />
          <Route path="/mobilidade/development" element={<Development />} />
          <Route path="/mobilidade/terms-of-service" element={<TermsOfService />} />
          <Route path="/mobilidade/privacy" element={<Privacy />} />
        </Routes >
      </Main>
      <Footer />
    </>
  )
}

export default App
