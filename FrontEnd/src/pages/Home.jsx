import React from 'react'
import Hero  from "../components/Hero"
import BioGraphy from "../components/BioGraphy"
import Departments from "../components/Departments"
import MessageForm from "../components/MessageForm"

const Home = () => {
  return (<>
      <Hero title={"Welcome to MediConnect Institute | Your Trusted health care Provider"} imagUrl={"/hero.png"}/>
    <BioGraphy imageUrl={"/about.png"}/>
    <Departments/>
    <MessageForm/>
  </>
    
  )
}

export default Home