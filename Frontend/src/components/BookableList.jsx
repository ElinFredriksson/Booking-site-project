import React, { useState, useEffect } from 'react';
import BookableCard from './BookableCard';

const BookableList = () => {
    const [bookables, setBookables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/bookables/all')
            .then(response => response.json())
            .then(data => {
                if (data && data.data.bookables.length > 0) {
                    setBookables(data.data.bookables.slice(0, 4)); // Take the first 4 bookables
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

    return (
        <div className="bookable-list">
            {bookables.map(bookable => (
                <BookableCard key={bookable._id} bookable={bookable} />
            ))}
        </div>
    );
};

export default BookableList;
