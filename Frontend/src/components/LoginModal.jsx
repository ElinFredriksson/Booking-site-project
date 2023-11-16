// LoginModal.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ onClose, onSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 
  const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(formData);
          // Additional logic after successful login
          // If login is successful, call the onLogin callback
        // onLogin();
        onClose();
        } catch (error) {
          console.error('Error during login:', error);
          // Handle login error (e.g., show error message to the user)
        }
    };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3001/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('accessToken', data.data.token);
//         // If login is successful, call the onLogin callback
//         onLogin();
//         onClose(); // Close the modal after submission
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

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
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="modal-header">Login</h2>
        <p className="modal-sub-header">Welcome back to techspace!</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
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
