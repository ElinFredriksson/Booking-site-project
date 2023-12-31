import React from 'react'
import BookableList from '../components/BookableList'
import Slogan from '../components/Slogan'
import CTABox from '../components/CTABox'
import Testimonials from '../components/Testimonials'
import About from '../components/About'
import ContactUs from '../components/ContactUs'

import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <CTABox />
        <Slogan />
        <h1 className='heading2 section-headline'>Popular Venues</h1>
        <BookableList />
        <div className='section-btn-wrapper'>
        <button className='button section-btn'><Link to="/allvenues">View All Venues</Link></button>
        
        </div>
        <h1 className='heading2 section-headline m-t'>Testimonials</h1>
        <Testimonials />
        <About />
        <ContactUs />
    </div>
  )
}

export default Home