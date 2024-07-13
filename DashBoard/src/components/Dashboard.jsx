import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../main'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {GoCheckCircleFill} from 'react-icons/go'
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast } from 'react-toastify';



const Dashboard = () => {
  const {isAuthenticated,user}= useContext(Context);
  const [appointments,setAppointments]=useState([]);


  useEffect(()=>{
      const fetchAppointments=async()=>{
        try {
          const {data}=await axios.get("/api/v1/appointment/getall",{withCredentials:true})
          setAppointments(data.appointments);

        } catch (error) {
          setAppointments([]);
          console.log("Some err occured while fetching",error)

        }
      }
      fetchAppointments();
  },[])

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }

  const UpdateStatusHandler= async(appointmentId,status)=>{
          try {
            const {data}=await axios.get(`/api/v1/appointment/update/${appointmentId}`,{status},
              {withCredentials:true}
            )
            setAppointments(prevAppointments =>
              prevAppointments.map(appointment =>
                appointment._id === appointmentId ? { ...appointment, status } : appointment
              )
            );
            
            toast.success(data.message);
          } catch (error) {
            toast.error(error.response.data.message)
          }
          
  }
  return (
    <>
      <section className='dashboard page'>
          <div className='banner'>
            <div className='firstBox'>
              <img src='/doc.png' alt='docImg' />
              <div className='content'>
                <div><p>Hello, </p>
                <h5>
                    {
                      user&&`${user.firstName} ${user.lastName}`
                    }
                </h5>
                </div>
                <p>
                Zeecare Medical Institute offers exceptional healthcare with advanced medical technologies. 
                Our skilled professionals provide diagnostics, treatment, and preventive care with compassion and
                 precision. Prioritizing patient well-being, we strive for a comfortable and supportive environment.
                </p>
              </div>
            </div>
            <div className='secondBox'>
              <p>
                Total Appointments
              </p>
              <h3>1500</h3>
            </div>
            <div className='thirdBox'>
              <p>
                Registered Doctors
              </p>
              <h3>20</h3>
            </div>
          </div>
          <div className='banner'>
            <h5>Appointments</h5>
            <table>
              <thead>
                <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
                </tr>
                
              </thead>
              <tbody>
                {
                  appointments&&appointments.length>0?(
                    appointments.map(appointment=>{
                      return(
                        <tr key={appointment._id}>
                          <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                          <td>{appointment.appointment_date.substring(0,16)}</td>
                          <td>
                            {`${appointment.doctor.firstName} ${appointment.doctor.firstName}`}
                          </td>
                          <td>
                            {appointment.department}
                          </td>
                          <td>
                            <select className={appointment.status==="Pending"?"value-pending"
                            :appointment.status==="Rejected"?
                            "value-rejected":"value-accepted"} 
                            value={appointment.status} onChange={(e)=>UpdateStatusHandler(appointment._id,e.target.value)}>

                              <option className='value-pending' value="Pending">Pending</option>
                              <option className='value-rejected' value="Rejected">Rejected</option>
                              <option className='value-accepted' value="Accepted">Accepted</option>
                            </select>
                          </td>
                          <td>{appointment.hasVisisted===true?<GoCheckCircleFill className='green'/>:<AiFillCloseCircle className='red'/>}</td>
                        </tr>
                      )
                    })
                  ): (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>
                      <h1>NO APPOINTMENTS</h1>
                    </td>
                  </tr>
                )
                }
              </tbody>
            </table>
          </div>
      </section>
    </>
  )
}

export default Dashboard