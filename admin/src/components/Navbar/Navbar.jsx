import React from 'react'
import './Navbar.css'
import {assets} from "../../assets/assets.js"
const Navbar = () => {
  return (
    <div className='navbar'>
      <img className="logo" src={assets.logo} alt="" />
      <img src={assets.profile_icon} alt="" className="profile" />
    </div>
  )
}

export default Navbar
