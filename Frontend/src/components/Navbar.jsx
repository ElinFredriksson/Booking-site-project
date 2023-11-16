import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import masthead from '../assets/masthead.jpg';
import LoginModal from './LoginModal'; // Import the LoginModal component
import SignupModal from './SignupModal'; // Import the SignupModal component
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isLoggedIn, login, signup, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  const handleLogin = async (formData) => {
    try {
      await login(formData);
      // Additional logic after successful login
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error (e.g., show error message to the user)
    }
  };

  const handleSignup = async (formData) => {
    try {
      await signup(formData);
      // Additional logic after successful signup
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle signup error (e.g., show error message to the user)
    }
  };

  
  

  return (
    <>
      <nav className="nav">
        <Link to="/" className="site-title">
          <img src={logo} alt="logo" />
        </Link>
        <ul>
          <Link to="/allvenues">All Venues</Link>
          <Link to={`/profile`}>Profile</Link>

          <li>
        <button onClick={toggleLoginModal}>Login</button>
      </li>
      {showLoginModal && (
        <LoginModal onClose={toggleLoginModal} onLogin={handleLogin} onSignup={toggleSignupModal} />
      )}
      {showSignupModal && (
        <SignupModal onClose={toggleSignupModal} onSignup={handleSignup} />
      )}
        </ul>
      </nav>
      <div className="masthead">
        <img src={masthead} alt="masthead" />
      </div>
    </>
  );
};

export default Navbar;
