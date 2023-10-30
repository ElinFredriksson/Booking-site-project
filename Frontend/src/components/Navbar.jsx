import { Link } from 'react-router-dom'
import React from 'react'
import logo from '../assets/logo.png'
import masthead from '../assets/masthead.jpg'


const Navbar = () => {
  return (
    <>
    <nav className="nav">
    <Link to="/" className="site-title"><img src={logo} alt="logo" />
    </Link>
    <ul>
      <Link to="/allvenues">All Venues</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
    </ul>
  </nav>
  <div className="masthead">
    <img src={masthead} alt="masthead" />
  </div>
    </>
  )
}

export default Navbar