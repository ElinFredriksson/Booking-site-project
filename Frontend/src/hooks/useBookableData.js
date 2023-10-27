import { useState, useEffect } from 'react';
import axios from 'axios';

const useBookables = () => {
  const [bookables, setBookables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/bookables/') 
      .then(response => {
        setBookables(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return { bookables, loading };
};

export default useBookables;
