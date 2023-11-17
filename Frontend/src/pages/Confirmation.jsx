import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Confirmation = () => {
  return (
    <div className="confirmation">
      <FontAwesomeIcon icon={faCheckCircle} />
      <h1>Thank you for your booking!</h1>
      <p>You will receive a confirmation email to your account email, or you can view the details of your booking right here on your profile.</p>
      <button>VIEW BOOKING DETAILS</button>
    </div>
  )
}

export default Confirmation