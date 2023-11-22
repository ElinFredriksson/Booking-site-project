import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import MapContainer from '../components/MapContainer';

import { FaLocationDot } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { LuChefHat } from "react-icons/lu";
import { RiFullscreenFill } from "react-icons/ri";
import { FaWifi } from "react-icons/fa";
import { MdMicExternalOn } from "react-icons/md";
import { PiProjectorScreenDuotone } from "react-icons/pi";
import { FaBus, FaCar } from "react-icons/fa";
import { IoSubway } from "react-icons/io5";








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
        <div className="booking-heading-textgroup">
        <h2>Booking Number #{reservation.booking_nr}</h2>
        <h4>{new Date(reservation.date).toLocaleDateString()} - {reservation.time}</h4>
        </div>
        <div className="booking-heading-btn">
        <button>Add To Calendar +</button>
        </div>
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
        <div className="booking-details-over-bottom">
          <div className="booking-details-over-bottom-left">
            <div className="booking-details-icons-container">
          <div className="booking-details-icons">
            <p><RiFullscreenFill /></p>
            <p>{reservation?.bookable_id.size}m2</p>
            </div>
            <div className="booking-details-icons">
            <p><FaWifi /></p>
            <p>Wifi</p>
            </div>
            <div className="booking-details-icons">
            <p><MdMicExternalOn /></p>
            <p>Microphone</p>
            </div>
            <div className="booking-details-icons">
            <p><PiProjectorScreenDuotone /></p>
            <p>Projector</p>
            </div>
            </div>
            <div className="booking-details-description">
            <h2 className='sub-heading'>Informtaion</h2>
            <p>{reservation?.bookable_id.description}</p>
            <h2 className='sub-heading'>Catering</h2>
            <p>You have chosen catering for this booking. You will be contacted by Catering Company within 2 days. If you are not contacted, let us know at <span>catering@techspace.com</span>.</p>
            </div>
          </div>
          <div className="booking-details-over-bottom-right">
            
            <h2 className='sub-heading'>Terms</h2>
            <p>When it comes to cancellations, notify us at least 24 hours to avoid charges. After your meeting,  leave the room in a tidy state and dispose of any trash properly.
We expect responsible usage and reporting of any damage. Please aim to start and finish your session as scheduled to avoid overtime charges. Make sure to keep your valuables attended. The number of attendees should not exceed the room's capacity. Kindly inform us in advance if you have specific accessibility requirements so we can make necessary accommodations. There is always staff on scene should you need us</p>
            
            <div className="contact-box">
              <div className="contact-box-left">
                <h2>{reservation?.bookable_id.name}</h2>
                <p>{reservation?.bookable_id.address}</p>

              </div>
              <div className="contact-box-right">
                <h2>Contact Person</h2>
                <p>Phone: {reservation?.bookable_id.contact_person.name}</p>
                <p>Email: {reservation?.bookable_id.contact_person.email}</p>
                <p>Phone: {reservation?.bookable_id.contact_person.phone}</p>
                </div>
            </div>
          </div>
          </div>
      </div>

      <div className="booking-details-bottom-box-wrapper">
        <div className="booking-heading-textgroup-venue-location">
        <h2>Venue Location</h2>
        <h4>{reservation?.bookable_id.address}</h4>
        </div>
        <div className="booking-details-bottom-box-top">
        <div className="booking-details-bottom-box-left">
          <div className="left-img">
        <img src={reservation?.bookable_id.images?.[0]} alt="Big Image" />
        </div>
        </div>
        <div className="booking-details-bottom-box-right">
          <h3>Directions</h3>
          <div className="booking-details-bottom-box-right-directions">
          <div className="directions-box">
            <p><FaBus /></p>
            <p>{reservation?.bookable_id.location.busDistance}</p>
          </div>
          <div className="directions-box">
            <p><IoSubway /></p>
            <p>{reservation?.bookable_id.location.subwayDistance}</p>
            </div>
            <div className="directions-box">
            <p><FaCar /></p>
            <p>{reservation?.bookable_id.location.parkingDistance}</p>
            </div>
            </div>
        </div>
        </div>
        <div className="bottom-box-maps">
        <MapContainer
        latitude={reservation?.bookable_id.latitude}
        longitude={reservation?.bookable_id.longitude}
      />
        </div>
      </div>

      <div className="billing-wrapper">
        
        <div className="billing-box">
          <div className="billing-top">
            <div className="billing-top-left">
              <h3>Billing</h3>
              <p>Due Date:</p>
              </div>
              <div className="billing-top-right">
                <button className="billing-button">Download PDF</button>
            </div>
          </div>
          <div className="billing-middle">
            <h4>Billing Adress</h4>
            <p>See attached PDF</p>
          </div>
          <div className="billing-bottom-description">
            <div className="section-1-description">
              <h4>Invoice Description</h4>
              <p>Venue rent</p>
              <p>Cleaning fee</p>
            </div>
            <div className="section-2-description">
              <h4>Qty</h4>
              <p>1</p> 
              <p>1</p>
            </div>
            <div className="section-3-description">
              <h4>Unit</h4>
              <p>hour</p>
              <p>pce</p>
            </div>
            <div className="section-4-description">
              <h4>Unit Price</h4>
              <p>SEK 500,00</p>
              <p>SEK 399,00</p>
            </div>
            <div className="section-5-description">
              <h4>VAT 20%</h4>
              <p>SEK 100,00</p>
              <p>SEK 79,80</p>
            </div>
            <div className="section-6-description">
              <h4>Total Price</h4>
              <p>SEK {reservation.total_price},00</p>
              <p>SEK 399,00</p>
            </div>
          </div>
          <hr></hr>
          <div className="billing-box-bottom">
            <h3>Total Price: SEK {reservation.total_price},00</h3>
          </div>
        </div>
      </div>
      <div className='back-to-home-container'>
        <button className='back-to-home'><Link to="/">Back to home</Link> </button>
        </div>
    </div>
  );
};

export default BookingDetails;
