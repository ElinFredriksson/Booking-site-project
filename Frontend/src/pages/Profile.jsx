import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import BookingDetails from './BookingDetails';
import BookableCard from '../components/BookableCard';
import { useLikedBookables } from '../contexts/LikedBookablesContext';

const Profile = () => {
  const { isLoggedIn } = useAuth(); // Make sure isLoggedIn is defined here
  const { likedBookables, setLikedBookables, toggleLikedStatus,updateLikedBookables } = useLikedBookables();

  const [userData, setUserData] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  

  const handleLike = (bookableId) => {
    updateLikedBookables(bookableId);
  };

  const handleUnlike = (bookableId) => {
    updateLikedBookables(bookableId);
  };
  

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
    // console.log('Reservation Data:', reservationData);
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


  useEffect(() => {
    const fetchLikedBookables = async () => {
        // Use the appropriate API endpoint to fetch LikedBookables
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3001/api/likedBookables/${userData._id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Liked Bookables:', data.data.likedBookables);
                // Set the likedBookables state
                setLikedBookables(data.data.likedBookables);
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (isLoggedIn && userData) {
        fetchLikedBookables();
    }
}, [isLoggedIn, userData]);



console.log('Liked Bookables in Profile:', likedBookables);

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
        <h1 className='heading2 section-headline'>Liked Venues</h1>
         <div className="liked-bookables">
        <div className="bookable-list-liked">
     {/* Render BookableCard for each liked bookable */}
     {likedBookables && Array.isArray(likedBookables) && likedBookables.length > 0 ? (
  <div>
    {likedBookables.map((likedBookable) => {
      if (!likedBookable ||
        !likedBookable.bookable ||
        !likedBookable.bookable._id) {
        // Log a warning and return null if likedBookable or bookable is missing
        
        return null;
      }
      // Check if the current bookable is liked
      const isLiked = likedBookable._id === likedBookable.bookable._id;
      console.log('onLikeToggle:', typeof handleUnlike, handleUnlike);
      return (
        <BookableCard
          key={likedBookable._id.toString()}  // Convert _id to string
          bookable={likedBookable.bookable}
          onLikeToggle={() => handleUnlike(likedBookable.bookable._id)}
          setLikedBookables={setLikedBookables}
          
        />
      );
    })}
    
  </div>
) : (
  <div className="liked-bookables">
    <h1 className='heading2 section-headline'>Liked Venues</h1>
    <p>You have not liked any venues yet.</p>
  </div>
)}
</div>
      
      </div>

        <div className="previous-booking">
        <h1 className='heading2 section-headline'>Previous Bookings</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
