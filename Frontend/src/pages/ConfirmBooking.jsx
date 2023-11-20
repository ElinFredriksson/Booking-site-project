import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

const getUserFromStorage = () => {

  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};


const ConfirmBooking = () => {
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);
  const user = getUserFromStorage();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve booking details from localStorage
    const storedBookingDetails = localStorage.getItem('bookingDetails');
    const token = localStorage.getItem('token');


    if (storedBookingDetails) {
      setBookingDetails(JSON.parse(storedBookingDetails));
      // Clear booking details from localStorage after retrieval
      localStorage.removeItem('bookingDetails');
    }
  }, []);

  if (!bookingDetails) {
    // Handle the case when bookingDetails is not available
    return <div>Loading...</div>;
  }

  const { attendees, date, time, addCatering, bookable, calculateTotalPrice } = bookingDetails;
  const formattedDate = date ? new Date(date).toDateString() : "";

  

  const handleConfirmBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      

      if (!location.state || !location.state.token) {
        console.error('Token not found in location state.');
        return;
      }

      if (!bookable || !bookable._id) {
        console.error('Bookable information is missing.');
        return;
      }
      // Create a reservation object with the necessary details
      const reservation = {
        bookable_id: bookable._id, 
        user_id: user._id, 
        date: date,
        time: time,
        attendees: attendees, 
        created_at: new Date(date),
        catering: addCatering,
        total_price: calculateTotalPrice, 
        booking_nr: Math.floor(Math.random() * 1000000000),
        status: 'pending',
      };

       // Make a POST request to create a new reservation
    const response = await fetch('http://localhost:3001/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(reservation),
    });

    console.log('Token in headers:', token);

    if (!response.ok) {
      // Handle the case when the response status is not OK (e.g., 401 Unauthorized)
      console.error('Error creating reservation:', response.status, response.statusText);
      return;
    }

        // Parse the JSON response
    const responseData = await response.json();

    // Log the entire response data for debugging
    console.log('Complete Response Data:', responseData);

    // Check if responseData has the expected structure
    if (responseData && responseData.data && responseData.data.reservation) {
      // Handle the response accordingly (e.g., show a success message)
      console.log('Reservation created:', responseData.data.reservation);

      // Optionally, redirect to a success page or do other actions
    } else {
      // Log an error message or handle the case when the expected data is not present
      console.error('Error creating reservation: Invalid response data structure', responseData);
}
// Check if the reservation was created successfully
if (responseData.status === 'success') {
  console.log('Complete Response Data:', responseData);
  console.log('Reservation created:', responseData.data.reservation);

  // Navigate to the confirmation page
  // window.location.href = '/confirmation'; 
  navigate('/confirmation');
} else {
  // Handle the case when the reservation creation was not successful
  console.error('Error creating reservation:', responseData);
}

      // Optionally, redirect to a success page or do other actions
} catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error creating reservation:', error.message);
    }
  };

  return (
    <div className='confirm-booking-wrapper'>
      <h2 className='confirm-booking-h2'>Confirm Booking</h2>
      <div className='confirm-booking-details'>
        <p>Attendees: {attendees}</p>
        <p>Date: {formattedDate}</p>
        <p>Time: {time}</p>
        <p>Add Catering: {addCatering ? 'Yes' : 'No'}</p>
      </div>
      {bookable && (
        <div>
          <h3>Bookable Details</h3>
          <p>Address: {bookable.address}</p>
          {/* Add other bookable details here */}
        </div>
      )}
      <div className="buttons">
        <button>Cancel</button>
        <button className='confirm-button' onClick={handleConfirmBooking}>CONFIRM BOOKING</button>
        </div>
    </div>
  );
};

export default ConfirmBooking;
