import React from 'react';

const ContactUs = () => {
  return (
    <div className="contact-us-wrapper">
    <div className="contact-us-grid">
      <div className="contact-form">
        <h2>Contact Us</h2>
        <p>Do you have any questions or thoughts you would like to share with us? Let us know!</p>
        <p></p>
        <form>
          <div className="form-group">
            <label className='input-label' htmlFor="email">Email</label>
            <input className='input-contact' type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label className='input-label' htmlFor="title">Title</label>
            <input className='input-contact' type="text" id="title" name="title" required />
          </div>
          <div className="form-group">
            <label className='input-label' htmlFor="message">Message</label>
            <textarea className='input-contact textarea' id="message" name="message" required></textarea>
          </div>
          <button className='contact-us-btn' type="submit">Send</button>
        </form>
      </div>
      <div className="contact-details-map-container">
        <div className="contact-details">
          <h2>Find us</h2>
          <p>Phone: +1 234 567 890</p>
          <p>Email: info@techspace.com</p>
          <p>Address: 123 Main Street, Stockholm, 10001</p>
        </div>
        <div className="GMaps-placeholder">Google Maps</div>
      </div>
    </div>
    </div>
  );
}

export default ContactUs;
