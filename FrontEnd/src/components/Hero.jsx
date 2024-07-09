import React from 'react'

const Hero = ({title,imagUrl}) => {
  return (
    <div className='hero container'>
    <div className='banner'>
    <h1>{title}</h1>
    <p>
    
Zeecare Medical Institute offers exceptional healthcare with advanced medical technologies. Our skilled professionals provide diagnostics, treatment, and preventive care with compassion and precision. Prioritizing patient well-being, we strive for a comfortable and supportive environment. Committed to excellence and innovation, we aim to set new standards in medical care and enhance patients' quality of life.
         
    </p>
    </div>
    <div className='banner'>
        <img src={imagUrl} alt='hero' className='animated-image'/>
        <span>
            <img src='/Vector.png' alt='vector'/>
        </span>
    </div>
    </div>
  )
}

export default Hero