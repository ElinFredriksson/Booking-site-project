// LoginModal.js
import React, { useState, useEffect } from 'react';

const LoginModal = ({ onClose, onLogin, onSignup }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData);
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
                <h2 className='modal-header'>Login</h2>
                <p className='modal-sub-header'>Welcome back to techspace!</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="button-group">
                        <p>
                            You don't have an account?{' '}
                            <button onClick={onSignup}>Sign up here</button>
                        </p>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
