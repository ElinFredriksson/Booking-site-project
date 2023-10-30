import React from 'react'
import BookableList from '../components/BookableList'
import Slogan from '../components/Slogan'
import CTABox from '../components/CTABox'

const Home = () => {
  return (
    <div>
        <CTABox />
        <Slogan />
        <h1 className='heading2 section-headline'>Popular Venues</h1>
        <BookableList />
    </div>
  )
}

export default Home