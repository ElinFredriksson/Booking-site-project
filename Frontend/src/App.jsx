import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Home from './pages/Home';
import AllVenues from './pages/AllVenues';
// import Profile from './pages/Profile';
import BookableDetails from './pages/BookableDetails';
import ConfirmBooking from './pages/ConfirmBooking';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './utils/PrivateRoute';




// import Login from './pages/Login'; 

// const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/allvenues" element={<AllVenues />} />
        <Route path="/bookable/:id" element={<BookableDetails />} />

        {/* Protected */}
        <Route
            path="/confirm-booking"
            element={
            <PrivateRoute>
              <ConfirmBooking />
              </PrivateRoute> } 
          />
       
 
          {/* <PrivateRoute path="/confirm-booking" element={<ConfirmBooking />} /> */}

        {/* <Route path="/profile" element={isAuthenticated ? <Profile /> : <Home />} /> */}

      </Routes>
      {/* <Footer /> */}
    </Router>
    </AuthProvider>
  );
};

export default App;
