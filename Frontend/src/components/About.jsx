import React from 'react'

const About = () => {
  return (
    <section className="about-section">
          <h2 className='heading2 section-headline'> About TechSpace</h2>

      <div className="about-content">
        
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1603294278610-b5bd0506303e?q=80&w=3085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="About Image" />
        </div>
        <div className="about-text">
          <p>TechSpace is an innovative company based in Stockholm, offering a unique platform for tech companies and businesses in the digital sector to rent conference rooms and meeting spaces. Our company aims to revolutionize the way tech companies and their teams meet and collaborate. We strive to provide customized meeting environments that foster creativity, innovation, and business success.</p>
        </div>
      </div>
    </section>

  )
}

export default About