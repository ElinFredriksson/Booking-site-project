import React, { useState, useEffect } from 'react';
import BookableList from '../components/BookableList'
import { useParams } from 'react-router-dom';
import GMapsPlaceholder from '../assets/GMapsPlaceholder.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMaximize, faWifi, faWheelchair, faUtensils } from '@fortawesome/free-solid-svg-icons';
import  boardroom from '../assets/Arrangement-Icons/boardroom.png';
import classroom from '../assets/Arrangement-Icons/classroom.png';
import standing from '../assets/Arrangement-Icons/standing.png';
import theatre from '../assets/Arrangement-Icons/theatre.png';


const BookableDetails = () => {
    const { id } = useParams();
    const [bookable, setBookable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0); // Default to the first image
    const [startDate, setStartDate] = useState(new Date());
    const [showTooltip, setShowTooltip] = useState(false);

    const [attendees, setAttendees] = useState(""); // Initialize with an appropriate default value
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("option1"); 
    const [addCatering, setAddCatering] = useState(false); 

    const [pricePerHour, setPricePerHour] = useState(0); 
    const [cleaningFee, setCleaningFee] = useState(399);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        const hours = calculateHours(); // Calculate the total hours
        return pricePerHour * hours + cleaningFee;
      };

    const calculateHours = () => {
        //  logic to calculate hours based on the selected time
        switch (time) {
          case "option1":
            return 4; 
          case "option2":
            return 4; 
          case "option3":
            return 4; 
          case "option4":
            return 12; 
          default:
            return 0;
        }
      };

      useEffect(() => {
        const newTotalPrice = calculateTotalPrice();
        setTotalPrice(newTotalPrice);
      }, [time, pricePerHour, cleaningFee]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit button clicked');
    
        const bookingDetails = {
          attendees,
          date: startDate,
          time,
          addCatering,
        };
    
        // Use localStorage to store booking details temporarily
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    
        // Redirect to ConfirmBooking
        window.location.href = '/confirm-booking';
      };
    

    useEffect(() => {
        fetch(`http://localhost:3001/api/bookables/${id}`)
            .then(response => response.json())
            .then(data => {
                setBookable(data.data.bookable); 
                setPricePerHour(data.data.bookable.price);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    const handleImageClick = (index) => {
        setSelectedImage(index);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!bookable) {
        return <div>No bookable found</div>;
    }

    console.log(bookable);

    return (
        <>
<div className="bookable-details-wrapper" >
    <h2 className="heading2">{bookable.name}</h2>
    <div className="big-image">
        {bookable.images && bookable.images.length > 0 && (
          <img src={bookable.images[selectedImage]} alt={`Image ${selectedImage}`} />
          )}
          <img className='GMaps-placeholder' src={GMapsPlaceholder} alt="Google Maps Placeholder" />
    </div>
    <div className="small-images">
        {bookable.images && bookable.images.length > 0 && (
            bookable.images.map((image, index) => (
                <div key={index} onClick={() => handleImageClick(index)}>
                    <img src={image} alt={`Image ${index}`} />
                </div>
            ))
        )}
    </div>
</div>
<div className='bookable-details-grid'>
<div className="bookable-details-left">
        <div className="description">
        <h1 className='heading2 section-headline'>Information</h1>
          <p>{bookable.description}</p>

          <h1 className='heading2 section-headline'>Amenities</h1>
          <div className='amenities-icons-wrapper'>
          <div className='amenities-icon'>
          <FontAwesomeIcon icon={faMaximize} />
          <p>{bookable.size}m^2</p>
          </div>
          <div className='amenities-icon'>
          <FontAwesomeIcon icon={faWifi} />
          <p>Wi-Fi</p>
          </div>
          <div className='amenities-icon'>
          <FontAwesomeIcon icon={faWheelchair} />
          <p>Accessible</p>
          </div>
          <div className='amenities-icon'>
          <FontAwesomeIcon icon={faUtensils} />
          <p>Catering</p>
          </div>
          </div>
          <p>Our venue is located so that it is accessible to all. We offer catering and many different type of aid so that your tech event will run smoothly. There is always coffee, tea and water available.</p>
          <h1 className='heading2 section-headline'>Arrangements</h1>
          <div className='arrangements'>

              <img src={boardroom} alt="boardroom" />
              <img src={standing} alt="standing" />
              <img src={classroom} alt="classroom" />
              <img src={theatre} alt="classroom" />
          </div>
          <h1 className='heading2 section-headline'>Venue contact</h1>
          <p>Do you have questions about this locale or its equipment? Please contact the venue directly.</p>
        </div>
      </div>

  <div className="bookable-details-right">
    <div className='bookable-details-container'>
    <div className="booking-details">
      <div className="dropdowns-bookable-details">
        <h2>Book this venue</h2>
        <h3>From SEK {bookable.price}/hour</h3>
      <div className="dropdown-group">
          <label htmlFor="attendees" className="dropdown-label heading2">
            Attendees:
          </label>
          <select className="dropdown confirm-booking-dropdown" id="attendees" name="attendees" value={attendees} onChange={(e) => setAttendees(e.target.value)}>
            <option value="">Select quantity</option>
            <option value="5-10">5-10</option>
            <option value="10-30">10-30</option>
            <option value="30-60">30-60</option>
            <option value="60-100">60-100 +</option>
          </select>
        </div>
        
        <div className="dropdown-group">
          <label htmlFor="date" className="dropdown-label heading2">
            Date:
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="date-picker confirm-booking-dropdown"
          />
        </div>
        <div className="dropdown-group">
          <label htmlFor="time" className="dropdown-label heading2">
            Time:
          </label>
          <select className="dropdown confirm-booking-dropdown" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Select time</option>
            <option value="option1">Morning 08 - 12 AM</option>
            <option value="option2">Afternoon 12 - 04 PM</option>
            <option value="option3">Evening 04 - 08 PM</option>
            <option value="option4">Whole Day 08 AM - 08 PM</option>
          </select>

        </div>

      </div>
      <div className="checkbox-group">
        <input 
          type="checkbox" 
          id="confirmation" 
          name="confirmation" 
          
        />
        <label htmlFor="confirmation" className="checkbox-label">
          Add catering to your booking
        </label>
        <span 
          className="info-icon" 
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ?
        </span>
        {showTooltip && (
          <div className="tooltip">
            If you want to add catering to your booking, you will be contacted by the catering company to discuss your requirements via your email.
          </div>
        )}
      </div>
      <div className="price-details">
          <p>{`SEK ${pricePerHour} x ${calculateHours()} hours`}</p>
          <p>{`Cleaning Fee: SEK ${cleaningFee}`}</p>
          <p>{`Total Price: SEK ${calculateTotalPrice()}`}</p>
        </div>
      <div className="button-container">
        <button className="confirm-booking-button" onClick={handleSubmit}>Submit</button>
      </div>
      <div className='terms-p'>
        <p>Confirmation and Payment Options to follow.</p>
        <p><span>Terms & Conditions</span> apply.</p>
      </div>
    </div>
    </div>
    <div className="bookable-contact">
      <div className="bookable-contact-left">
        <h3>{bookable.name}</h3>
        <p>{bookable.address}</p>
      </div>
      <div className="bookable-contact-right">
        <h3>Contact Person</h3>
        </div>
    </div>
</div>
</div>
<h2 className='heading2 section-headline'>Other venues you might like</h2>
<BookableList />
    </>

    );
};


export default BookableDetails;
