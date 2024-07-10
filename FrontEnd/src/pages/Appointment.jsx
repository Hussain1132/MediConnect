import React from 'react'
import AppointmentForm from "../components/AppointmentForm"
import Hero from "../components/Hero"
const Appointment = () => {
  return (
    <>
    <Hero title={"Schedule Your Appointment | ZeeCare Medical Institue"} imagUrl={"/signin.png"}/>
    <AppointmentForm/>
    </>
  )
}

export default Appointment