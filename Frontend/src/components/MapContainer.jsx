
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import * as dotenv from 'dotenv';
// dotenv.config();

// const apiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapContainer = ({ latitude, longitude }) => {
   const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };

   // Customize the marker icon
   const redMarkerIcon = {
    path: 'M10 0C4.48 0 0 4.48 0 10s10 22 10 22 10-17.52 10-22S15.52 0 10 0z',
    fillColor: 'red',
    fillOpacity: 0.8,
    scale: 1.5,
    strokeColor: 'white',
    strokeWeight: 0.5,
  };

  console.log(defaultCenter);
  return (
    <LoadScript googleMapsApiKey="AIzaSyC1oxMBkPngMV6k_TMzAW-jM_YXJ6WZmT0">
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        zoom={14}
        center={defaultCenter}
      >
        <Marker position={defaultCenter}
        icon={redMarkerIcon} 
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
