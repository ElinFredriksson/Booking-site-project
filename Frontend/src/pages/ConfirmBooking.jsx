import React, { useEffect, useState } from 'react';

const ConfirmBooking = () => {
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Retrieve booking details from localStorage
    const storedBookingDetails = localStorage.getItem('bookingDetails');

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

  const { attendees, date, time, addCatering, bookable } = bookingDetails;
  const formattedDate = date ? new Date(date).toDateString() : "";

  return (
    <div>
      <h2>Confirm Booking</h2>
      <div>
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
    </div>
  );
};

export default ConfirmBooking;
