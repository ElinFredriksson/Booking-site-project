import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {


  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`http://localhost:3001/api/users/profile/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        

        if (response.ok) {
          const data = await response.json();
          console.log(data); 
          setUserData(data.data.user);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  },[] );

  return (
    <div className="profile">
      {userData && (
        <div>
          <h1>Welcome, {userData.firstName} {userData.lastName}</h1>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
