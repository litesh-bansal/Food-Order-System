import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='footer' id='footer'>  
      <div className="footer-content">
        <div className="footer-content-right">
            <Link to='/'><img src={assets.logo} alt="" /></Link>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum enim incidunt explicabo, ipsum sint, earum, rem et eveniet cum quibusdam error quae dolor? Pariatur saepe distinctio nihil quo amet.</p>
            <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-78732-46532</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2023 &copy; Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
