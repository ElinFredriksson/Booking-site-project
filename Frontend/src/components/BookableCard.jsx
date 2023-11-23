import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserGroup, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useLikedBookables } from '../contexts/LikedBookablesContext';

const getUserFromStorage = () => {

    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };


  const BookableCard = ({ bookable }) => {
    const { likedBookables, toggleLikedStatus } = useLikedBookables();
    const { userId } = useParams();
    const buttonRef = React.createRef();
  
    if (!bookable) {
      // Handle the case when bookable is undefined
      return null;
    }
  
    // Check if the current bookable is liked
    const isLiked = likedBookables.some((likedBookable) => likedBookable._id === bookable._id);
  
    const handleLikeToggle = async () => {
      const user = getUserFromStorage();
  
      if (!user || !user._id) {
        console.error('User not logged in.');
        return;
      }
  
      try {
        // Check if the current bookable is liked
        const isLiked = likedBookables.some((likedBookable) => likedBookable._id === bookable._id);
  
        if (isLiked) {
          // If liked, perform the delete operation
          await fetch(`http://localhost:3001/api/likedBookables/${user._id}/${bookable._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          // Update the likedBookables state to remove the unliked bookable
          toggleLikedStatus(bookable._id);
        } else {
          // If not liked, perform the add operation
          await fetch(`http://localhost:3001/api/likedBookables`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user._id, bookable: bookable._id }),
          });
  
          // Update the likedBookables state to add the liked bookable
          toggleLikedStatus(bookable._id);
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error as needed
      }
    };
      
    const truncateAddress = (address, maxLength) => {
      if (address.length > maxLength) {
        return address.substring(0, maxLength) + '...';
      }
      return address;
    };
    
    // Usage:
    const truncatedAddress = truncateAddress(bookable.address, 25);


    return (
        <div className="bookable-card">
        <button ref={buttonRef} className={`bookable-heart ${isLiked ? 'liked' : ''}`} onClick={handleLikeToggle}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            <Link to={`/bookable/${bookable._id}`} className="bookable-card">
            <div className="bookable-image-container">
                <div className="image-wrapper">
                    <div className="bookable-image-container">
                        <img
                            className="bookable-image"
                            src={bookable.images[0]}
                            alt={bookable.name}
                            width="289"
                            height="190" // Adjust this value as needed
                        />
                    </div>
                </div>
            </div>
            <div className="bookable-details">
                <div className="bookable-info">
                    <div className="bookable-info-left">
                        <p className="bookable-address">{truncatedAddress}</p>
                        <p className="bookable-capacity"><FontAwesomeIcon icon={faUserGroup} /> {bookable.attendees}</p>
                        <p className="bookable-price">{bookable.price} SEK/h</p>
                    </div>
                    <div className="bookable-info-right">
                        <p className="bookable-rating">{bookable.rating} <FontAwesomeIcon icon={faStar} /></p>
                    </div>
                </div>
            </div>
        </Link>
        </div>
    );
};

export default BookableCard;
