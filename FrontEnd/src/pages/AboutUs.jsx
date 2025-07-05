import React from 'react'
import Hero from "../components/Hero"
import BioGraphy from "../components/BioGraphy"
const AboutUs = () => {
  return (
    <>
      <Hero title={"Learn More About Us | MediConnect Institue"} imagUrl={"/about.png"}/>
      <BioGraphy imageUrl={"/whoweare.png"}/>
    </>
  )
}

export default AboutUs