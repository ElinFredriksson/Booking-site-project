import React from 'react';

const CTABox = () => {
  return (
    <div className="cta-box">
      <h2 className="cta-heading">Book Your Next Tech Event Here!</h2>
      <div className="dropdowns">
        <div className="dropdown-group">
          <label htmlFor="option1" className="dropdown-label heading2">
            Location:
          </label>
          <select className="dropdown" id="option1" name="option1">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="dropdown-group">
          <label htmlFor="option2" className="dropdown-label heading2">
            Attendees:
          </label>
          <select className="dropdown" id="option2" name="option2">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
      <div className="cta-button-container">
        <button className="cta-button button">Submit</button>
      </div>
    </div>
  );
};

export default CTABox;
