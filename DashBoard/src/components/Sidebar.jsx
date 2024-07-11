import React, { useContext, useState } from 'react';
import { Context } from "../main";
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { AiFillMessage } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdAddModerator } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { TiHome } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const toggleSidebar = () => {
    setShow(!show);
  };

  const gotoHome = () => {
    navigateTo("/");
    toggleSidebar();
  };

  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    toggleSidebar();
  };

  const gotoMessagepage = () => {
    navigateTo("/messages");
    toggleSidebar();
  };

  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    toggleSidebar();
  };

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    toggleSidebar();
  };

  const LogoutHandler = async () => {
    try {
      const res = await axios.get("/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  

  return (
    <>
      <nav style={!isAuthenticated ? { display: "none" } : { display: "flex" }} className={show ? "show sidebar" : "sidebar"}>
        <div className='links'>
          <TiHome onClick={gotoHome} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessagepage} />
          <RiLogoutBoxRFill onClick={LogoutHandler} />
        </div>
      </nav>
      <div style={!isAuthenticated ? { display: 'none' } : { display: 'flex' }} className='wrapper'>
        <GiHamburgerMenu className='hamburger' onClick={toggleSidebar} />
      </div>
    </>
  );
};

export default Sidebar;
