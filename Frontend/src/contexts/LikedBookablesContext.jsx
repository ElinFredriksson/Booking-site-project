// LikedBookablesContext.jsx

import React, { createContext, useContext, useState } from 'react';

const LikedBookablesContext = createContext();

export const LikedBookablesProvider = ({ children }) => {
    const [likedBookables, setLikedBookables] = useState([]);
  
    const toggleLikedStatus = (bookableId) => {
      setLikedBookables((prevLikedBookables) => {
        if (prevLikedBookables.some((item) => item._id === bookableId)) {
          // Bookable is already liked, remove it
          return prevLikedBookables.filter((item) => item._id !== bookableId);
        } else {
          // Bookable is not liked, add it
          return [...prevLikedBookables, { _id: bookableId }];
        }
      });
    };
  
    const updateLikedBookables = (bookableId) => {
      toggleLikedStatus(bookableId);
      console.log(bookableId);
      
    };
  
    return (
      <LikedBookablesContext.Provider value={{ likedBookables, setLikedBookables, toggleLikedStatus, updateLikedBookables }}>
        {children}
      </LikedBookablesContext.Provider>
    );
  };
  
  export const useLikedBookables = () => {
    const context = useContext(LikedBookablesContext);
    if (!context) {
      throw new Error('useLikedBookables must be used within a LikedBookablesProvider');
    }
    return context;
  };
