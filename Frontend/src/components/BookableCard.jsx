import React, { useState, useEffect } from 'react';
// import useBookableData from '../hooks/useBookableData';  
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faUserGroup, faHeart } from '@fortawesome/free-solid-svg-icons';





// const BookableCard = () => {
//     const { bookables, loading } = useBookableData();

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!bookables || bookables.length === 0) {
//         return <div>No bookable found</div>;
//     }

//     // Assuming you want to select a random bookable
//     const randomIndex = Math.floor(Math.random() * bookables.length);
//     const bookable = bookables[randomIndex];
//     console.log(bookable);
const BookableCard = () => {
    const [bookable, setBookable] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/bookables/all')
            .then(response => response.json())
            .then(data => {
                if (data && data.data.bookables.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.data.bookables.length);
                    setBookable(data.data.bookables[randomIndex]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!bookable) {
        return <div>No bookable found</div>;
    }

    console.log(bookable);

    return (
        <div className="bookable-card">
            <div className="bookable-heart"></div>
            <div className="bookable-image-container">
                <img className="bookable-image" src={bookable.images[0]} alt={bookable.name} />
            </div>
            <div className="bookable-details">
                <div className="bookable-info">
                    <div className="bookable-info-left">
                        <p className="bookable-address">{bookable.address}</p>
                        {/* <p className="bookable-capacity"> {bookable.capacity}</p> */}
                        {/* <p className="bookable-price">{bookable.price} SEK/h</p> */}
                    </div>
                    <div className="bookable-info-right">
                        {/* <p className="bookable-rating">{bookable.rating} </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default BookableCard;
