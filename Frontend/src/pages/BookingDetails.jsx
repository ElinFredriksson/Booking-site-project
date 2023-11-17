import React from 'react';
import { useParams } from 'react-router-dom';

const BookingDetails = () => {
  // Access the route parameters
  const { id } = useParams();

  // Assume you have a state or context that holds the reservations data
  // You can fetch the reservation details based on the id or from your state/context

  // For demonstration purposes, let's assume you have a reservations state
  const reservations = [
    { id: '1', date: '2023-11-17', time: '12-04PM', attendees: '10-30', /* other details */ },
    // Other reservations...
  ];

  // Find the reservation with the matching id
  const reservation = reservations.find((r) => r.id === id);

  if (!reservation) {
    return <div>Reservation not found</div>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Date: {reservation.date}</p>
      <p>Time: {reservation.time}</p>
      <p>Attendees: {reservation.attendees}</p>
      {/* Render other reservation details as needed */}
    </div>
  );
};

export default BookingDetails;
