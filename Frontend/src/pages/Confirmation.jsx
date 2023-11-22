import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Confirmation = () => {
  return (
    <div className="confirmation">
      <FontAwesomeIcon icon={faCheckCircle} />
      <h1>Thank you for your booking!</h1>
      <p>You will receive a confirmation email to your account email, you can also find your booking in your profile.</p>
      <button><Link to="/profile">VIEW PROFILE</Link></button>
    </div>
  )
}

export default Confirmation