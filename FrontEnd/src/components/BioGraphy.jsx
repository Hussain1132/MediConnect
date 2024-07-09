import React from 'react'

const BioGraphy = ({imageUrl}) => {
  return (
    <div className='container biography'>
        <div className='banner'>
              <img src={imageUrl} alt='about Image'/>
        </div>
        <div className='banner'>
              <p>Biography</p>
              <h3>Who We Are</h3>
              <p>
              Zeecare Medical Institute delivers top-notch healthcare using advanced technologies. Our skilled team provides comprehensive diagnostics, treatment, and preventive care with compassion. We prioritize patient comfort and well-being, aiming to set new standards in medical excellence and improve life quality for all.
              </p>
              <p> Zeecare Medical Institute offers exceptional healthcare services.</p>
              <p>
              Zeecare Medical Institute excels in innovation.</p>
              <p>Zeecare Medical Institute excels in healthcare, using cutting-edge technologies for personalized treatment. Our commitment to innovation and patient-centric care ensures exceptional outcomes, setting new standards in medical excellence and quality of life improvement.</p>
              <p>Leading healthcare provider with cutting-edge technology and patient-focused care.</p>
              <p>Top-notch healthcare provider.</p>
        </div>
    </div>
  )
}

export default BioGraphy