import React from 'react'
import './App.css'

import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import AllVenues from './pages/AllVenues'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  

  return (
    <>
      <Router>
      <Navbar />
      <Switch>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allvenues" element={<AllVenues />} />
        <ProtectedRoute path="/profile" element={<Profile />} />
      </Routes>
      </Switch>
      <Footer />
      </Router>
    </>
  )
}


export default App
