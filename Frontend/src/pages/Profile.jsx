import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  console.log(id);

  if (!id) {
    return <div>No user ID found</div>;
  }

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/profile/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        

        if (response.ok) {
          const data = await response.json();
          console.log(data); 
          setUserData(data.data.user);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  return (
    <div className="profile">
      {userData && (
        <div>
          <h1>Welcome, {userData.firstName} {userData.lastName}</h1>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
