import React from 'react'
import './App.css'

import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import AllVenues from './pages/AllVenues'
import Profile from './pages/Profile'



const App = () => {
  

  return (
    <>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allvenues" element={<AllVenues />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
      </Router>
    </>
  )
}


export default App
