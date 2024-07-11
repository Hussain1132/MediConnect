import React, { useContext, useEffect, useState } from 'react'
import {Context} from "../main";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const Messages = () => {
  const [messages,setMessages]=useState([]);
  const {isAuthenticated}=useContext(Context)

  useEffect(()=>{
    const fetchMessages=async()=>{
      try {
        const {data}=await axios.get("/api/v1/message/getall",{withCredentials:true})
        setMessages(data.messages);
      } catch (error) {
        console.log("Error Occured While Fetching Messages:",error);
      }
    }
    fetchMessages();
  },[])

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }
  return (
    <section className='page messages'>
      <h1>MESSAGES</h1>
      <div className='banner'>
        {
          messages&&messages.length>0?(messages.map(element=>{
            return (
              <div className='card'>
                <div className='details'>
                  <p1>First Name: <span>{element.firstName}</span></p1>
                  <p1>Last Name: <span>{element.lastName}</span></p1>
                  <p1>Email: <span>{element.email}</span></p1>
                  <p1>Phone: <span>{element.firstName}</span></p1>
                  <p1>Phone No: <span>{element.phone}</span></p1>
                  <p1>Message: <span>{element.message}</span></p1>
                </div>
              </div>
            )
          })):(<h1>No Messages</h1>)
        }
      </div>
    </section>
  )
};

export default Messages;