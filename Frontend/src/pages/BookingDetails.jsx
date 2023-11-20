import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FaLocationDot } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { LuChefHat } from "react-icons/lu";





const BookingDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Assume you have a function to fetch reservation details based on the ID
    const fetchReservationDetails = async () => {
      const token = localStorage.getItem('token');
    
      try {
        const response = await fetch(`http://localhost:3001/api/reservations/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setReservation(data.data.reservation);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Fetch reservation details only if the ID is available
    if (id) {
      fetchReservationDetails();
    }
  }, [id]);

  if (!reservation) {
    return <div>Loading...</div>;
  }
  const handleImageClick = (index) => {
    setSelectedImage(index);
}

// const bookable = reservation?.bookable_id;

// if (!bookable) {
//     return <div>No bookable found</div>;
// }

  return (
    <div className='booking-details-wrapper'>
      <div className="booking-heading">
        <h2>Booking Number #{reservation.booking_nr}</h2>
        <h4>{new Date(reservation.date).toLocaleDateString()} - {reservation.time}</h4>
        <button>Add To Calendar +</button>
      </div>

      <div className="booking-details-top-box">
        <div className="booking-details-over">
          <div className="booking-details-over-left">
            {/* Check the structure of reservation and adjust the path accordingly */}
            <p>{reservation?.bookable_id.name || 'No Name'} </p>
            <div className="small-info-box">
              <p><FaLocationDot /> {reservation?.bookable_id.address || 'No Address'}</p>
              <p><GoClockFill /> {reservation.time}</p>
              <p><MdDateRange /> {new Date(reservation.date).toLocaleDateString()}</p>
              <p><FaUsers /> {reservation.attendees}</p>
              <p><RiMoneyDollarCircleFill /> {reservation.total_price} SEK</p>
              <p><LuChefHat /> Catering</p>
              <Link to={`/booking-details/${reservation._id}`}>To venue page</Link>
            </div>
          </div>
          <div className="booking-details-over-right">
          <div className="images-container-booking-details">
  <div className="big-image-booking-details">
    <img src={reservation?.bookable_id.images?.[0]} alt="Big Image" />
  </div>
  <div className="small-images-booking-details">
    {reservation?.bookable_id.images?.slice(1, 3).map((images, index) => (
      <div key={index} className="small-image-booking-details">
        <img src={images} alt={`Image ${index}`} />
      </div>
    ))}
  </div>
</div>
          </div>
        </div>
      </div>

      <h2>Booking Details</h2>
      <p>Date: {reservation.date}</p>
      <p>Time: {reservation.time}</p>
      <p>Attendees: {reservation.attendees}</p>
      {/* Render other reservation details as needed */}
    </div>
  );
};

export default BookingDetails;
