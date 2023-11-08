import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllVenues from './pages/AllVenues';
import Profile from './pages/Profile';
import BookableDetails from './pages/BookableDetails';
// import Login from './pages/Login'; 

const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allvenues" element={<AllVenues />} />
        <Route path="/bookable/:id" element={<BookableDetails />} />
        <Route path="/profile/:id" element={isAuthenticated ? <Profile /> : <Home />} />

      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
