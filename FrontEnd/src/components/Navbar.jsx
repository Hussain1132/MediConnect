import React, { useContext, useState } from 'react'
import {Context} from '../main'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = () => {
    const [show,setShow]= useState(false);
    const {isAuthenticated,setIsAuthenticated}=useContext(Context);
    const navigateTo = useNavigate();
    const LogoutHandler=async()=>{
            await axios.get("/api/v1/user/patient/logout",{
                withCredentials:true,
            }).then(res=>{
                toast.success(res.data.message);
                setIsAuthenticated(false);
            }).catch(err=>{
                toast.error(err.response.data.message);
            })    
    }
    const LoginHandler=async()=>{
        navigateTo("/login");
    }
  return (
    <nav className='container'>
        <div className='logo'>ZeeCare</div>
        <div className={show?"navLinks showmenu":"navLinks"}>
           <div className='links'>
            <Link to={"/"}>Home</Link>
            <Link to={"/appointment"}>Appointment</Link>
            <Link to={'/about'}>About US</Link>
           </div>
           {
                isAuthenticated?(<button className='logoutBtn btn' onClick={LogoutHandler}>LogOut</button>):(<button className='logoutBtn btn' onClick={LoginHandler}>Login</button>)
           }
        </div>
    </nav>
  )
}

export default Navbar