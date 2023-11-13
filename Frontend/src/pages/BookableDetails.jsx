import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import GMapsPlaceholder from '../assets/GMapsPlaceholder.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




const BookableDetails = () => {
    const { id } = useParams();
    const [bookable, setBookable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0); // Default to the first image
    const [startDate, setStartDate] = useState(new Date());
    const [showTooltip, setShowTooltip] = useState(false);

    const [attendees, setAttendees] = useState(""); // Initialize with an appropriate default value
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("option1"); // Initialize with an appropriate default value
    const [addCatering, setAddCatering] = useState(false); // Initialize with an appropriate default value

    const [pricePerHour, setPricePerHour] = useState(0); // Set your default price per hour
    const [cleaningFee, setCleaningFee] = useState(399);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        const hours = calculateHours(); // Calculate the total hours
        return pricePerHour * hours + cleaningFee;
      };

    const calculateHours = () => {
        // Your logic to calculate hours based on the selected time
        switch (time) {
          case "option1":
            return 4; // Set your logic to calculate hours for option1
          case "option2":
            return 4; // Set your logic to calculate hours for option2
          case "option3":
            return 4; // Set your logic to calculate hours for option3
          case "option4":
            return 12; // Set your logic to calculate hours for option3
          default:
            return 0;
        }
      };

      useEffect(() => {
        const newTotalPrice = calculateTotalPrice();
        setTotalPrice(newTotalPrice);
      }, [time, pricePerHour, cleaningFee]); // Include relevant dependencies

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
                setBookable(data.data.bookable); // Update to data.data.bookable
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

    console.log(bookable); // Log the bookable object to the console

    return (
        <>
<div className="bookable-details-wrapper" >
    <div className="big-image">
        {bookable.images && bookable.images.length > 0 && (
            <img src={bookable.images[selectedImage]} alt={`Image ${selectedImage}`} />
        )}
        {/* <image className='GMaps-placeholder' src={GMapsPlaceholder} alt="Google Maps Placeholder" /> */}
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
<div className='bookable-details-container'>
<div className="booking-details">
      <div className="dropdowns">
      <div className="dropdown-group">
          <label htmlFor="attendees" className="dropdown-label heading2">
            Attendees:
          </label>
          <select className="dropdown confirm-booking-dropdown" id="attendees" name="attendees" value={attendees} onChange={(e) => setAttendees(e.target.value)}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
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
    </div>
</div>
    </>

    );
};


export default BookableDetails;