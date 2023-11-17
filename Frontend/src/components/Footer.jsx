import React from 'react';
import footerLogo from '../assets/footerLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Footer = () => {
  return (
    <footer>
      <div className="footer-left">
        {/* Your logo goes here */}
        <img src={footerLogo} alt="Logo" />
      </div>
      <div className="footer-middle">
        {/* Four links */}
        <a href="#">All venues</a>
        <a href="#">About us</a>
        <a href="#">Contact</a>
        <a href="#">Log in</a>
        {/* Social icons */}
        <div className="social-icons">
          {/* <FontAwesomeIcon icon={} />
          <FontAwesomeIcon icon={faInstagram} /> */}
          
        </div>
      </div>
      <hr /> {/* Line separator */}
      <div className="footer-bottom">
        <p>All rights reserved. Copyright</p>
        {/* Payment icons */}
        <div className="payment-icons">
          {/* <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faInstagram} /> */}
          {/* <FontAwesomeIcon icon={faTwitter} /> */}
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
