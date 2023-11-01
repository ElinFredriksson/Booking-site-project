
import React, { useState, useEffect } from 'react';

const SignupModal = ({ onClose, onSignup }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(formData);
        onClose(); // Close the modal after submission
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.classList.contains('modal')) {
                onClose();
            }
        };
    
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className="modal">
            <div className="modal-content">
            <button className="close-button" onClick={onClose}>X</button>
                <h2 className='modal-header'>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id='lastName' value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id='email' value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id='password' value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="button-group">
                    <button className="signup-button button" type="submit">Signup</button>
                    <p>I agree to the terms and use</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
