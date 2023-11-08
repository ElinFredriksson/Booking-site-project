import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GMapsPlaceholder from '../assets/GMapsPlaceholder.png'

const BookableDetails = () => {
    const { id } = useParams();
    const [bookable, setBookable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0); // Default to the first image

    useEffect(() => {
        fetch(`http://localhost:3001/api/bookables/${id}`)
            .then(response => response.json())
            .then(data => {
                setBookable(data.data.bookable); // Update to data.data.bookable
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
<div className="bookable-details-wrapper" >
    <div className="big-image">
        {bookable.images && bookable.images.length > 0 && (
            <img src={bookable.images[selectedImage]} alt={`Image ${selectedImage}`} />
        )}
        <image className='GMaps-placeholder' src={GMapsPlaceholder} alt="Google Maps Placeholder" />
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

    );
};

export default BookableDetails;
