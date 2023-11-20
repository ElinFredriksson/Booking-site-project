import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import BookingDetails from './BookingDetails';

const Profile = () => {
  const { isLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);
  const [reservationData, setReservationData] = useState(null);

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

  useEffect(() => {
    console.log('Reservation Data:', reservationData);
    const fetchReservationData = async () => {
      const token = localStorage.getItem('token');

      // Check if user data is available
      if (userData) {
        try {
          const response = await fetch(`http://localhost:3001/api/reservations/user/${userData._id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setReservationData(data.data.reservations);
          } else {
            console.error('Error:', response.status);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    // Fetch reservation data only if user data is available
    if (userData) {
      fetchReservationData();
    }
  }, [userData]);

  return (
    <div className="profile-wrapper">
      {userData && (
        <div>
          <h1 className='user-greeting'>Hello {userData.firstName}!</h1>
          {/* <p>Email: {userData.email}</p> */}
        </div>
      )}
        <h1 className='heading2 section-headline'>Current Bookings</h1>
      <div className="profile-content-container">
        {reservationData && reservationData.map((reservation) => (
          <div key={reservation._id} className="profile-content-box">
    <Link to={`/booking-details/${reservation._id}`}>
    <div className="profile-content-box-content">
      <div className="current-bookings-left">
       <p className='reservation-nr'>Booking number: {reservation.booking_nr}</p>
        <p>{reservation?.bookable_id.name || 'No Name'} </p>
        <p>{reservation?.bookable_id.address || 'No Address'}</p>
        <p>{reservation.total_price} SEK</p>
      </div>
      <div className="current-bookings-middle">
        <p>{new Date(reservation.date).toLocaleDateString()}</p>
        <p>{reservation.time}</p>
        </div>
      <div className="current-bookings-right">
        <div className="current-booking-img-container">
        <img src={reservation?.bookable_id.images?.[0] || 'default-image-url'} alt="" /> {/* Using optional chaining */}
        </div>
      </div>
    </div>
</Link>
  </div>
))}
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
