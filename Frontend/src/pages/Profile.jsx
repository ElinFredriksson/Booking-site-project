import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { isLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3001/api/users/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.data.user);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (!isLoggedIn) {
      // Redirect to login page or handle as needed
    } else {
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <div className="profile-wrapper">
      {userData && (
        <div>
          <h1>Hello {userData.firstName}!</h1>
          {/* <p>Email: {userData.email}</p> */}
        </div>
      )}
      <div className="profile-content-container">
        <div className="current-bookings">
        <h1 className='heading2 section-headline'>Current Bookings</h1>
        {/* Reneder out reservations */}
        
        </div>
        <div className="liked-bookables">
        <h1 className='heading2 section-headline'>Liked Venues</h1>
        </div>

        <div className="previous-booking">
        <h1 className='heading2 section-headline'>Previous Bookings</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
