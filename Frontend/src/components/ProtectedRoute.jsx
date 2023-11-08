// // ProtectedRoute.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = (Component) => {
//   const AuthRoute = (props) => {
//     const isAuthenticated = !!localStorage.getItem('token'); // !! boolean casting
//     const navigate = useNavigate();

//     if (isAuthenticated) {
//       return <Component {...props} />;
//     } else {
//       navigate('/login');
//       return null;
//     }
//   };

//   return AuthRoute;
// };

// export default ProtectedRoute;
