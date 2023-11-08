import React, { useState, useEffect } from 'react';
import BookableCard from '../components/BookableCard';

const AllVenues = () => {
    const [bookables, setBookables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoadMore, setShowLoadMore] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/api/bookables/all')
            .then(response => response.json())
            .then(data => {
                if (data && data.data.bookables.length > 0) {
                    const fetchedBookables = data.data.bookables.slice(0, 16); // Take the first 16 bookables
                    setBookables(fetchedBookables);
                    setShowLoadMore(data.data.bookables.length > 16); // Show "Load More" if there are more than 16 bookables
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleLoadMore = () => {
        // load the next 16 bookables when the "Load More" button is clicked
        const nextBookables = bookables.length + 16;
        setBookables(bookables.concat(data.data.bookables.slice(nextBookables, nextBookables + 16)));
        setShowLoadMore(nextBookables + 16 < data.data.bookables.length);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <div className='all-venues-wrapper'>
        <div className="all-venues">
            <div className="all-bookable-list">
                {bookables.map(bookable => (
                    <BookableCard key={bookable._id} bookable={bookable} />
                ))}
            </div>
            {showLoadMore && <button onClick={handleLoadMore}>Load More</button>}
        </div>
      </div>
    );
};

export default AllVenues;
