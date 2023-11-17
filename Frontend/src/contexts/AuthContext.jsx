import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });

  const login = async (formData) => {
    try {
        const response = await fetch('http://localhost:3001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Log the response status
        console.log('Response Status:', response.status);

        // Log the response headers
        console.log('Response Headers:', response.headers);

        const data = await response.json();


        // Log the response data
        console.log('Response Data:', data);

        if (!response.ok) {
            console.error('Login failed:', response.status, data.message);
            throw new Error(data.message);
        }

        setIsLoggedIn(true);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
  

  const signup = async (formData) => {
    try {
      // Your signup logic here
      const response = await fetch('http://localhost:3001/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      console.log(data);

      setIsLoggedIn(true);
      localStorage.setItem('token', data.data.token);
    } catch (error) {
      console.error('Error during signup:', error);
      throw error; // Propagate the error to handle it in the component
    }
  };

  const logout = () => {
    // Your logout logic here
    // ...

    // Set isLoggedIn to false and remove the token from localStorage
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
