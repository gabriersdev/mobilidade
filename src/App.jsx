import './App.css'

import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Nav from './components/nav/Nav'
import Main from './components/main/Main'
import Home from './pages/home/Home'
import Lines from './pages/lines/Lines.jsx'
import Search from './pages/search/Search.jsx'
import Footer from './components/footer/Footer'

function App() {
  return (
    <>
      <Nav />
      <Main>
        <Routes>
          <Route path="/mobilidade/" element={<Home />} />
          <Route path="/mobilidade/lines" element={<Lines />} />
          <Route path="/mobilidade/search" element={<Search />} />
        </Routes >
      </Main>
      <Footer />
    </>
  )
}

export default App
