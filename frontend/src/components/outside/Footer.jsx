import React from 'react'
import logo from "../../assets/logo.png"
import "../../styles/components/outside/Footer.css";
import { Link } from "react-router-dom";
import phone from "../../assets/phone_PNG48919 1.png"
import mail from "../../assets/email-and-mail-icon-black-free-png 1.png"
import facebook from "../../assets/icon_Facebook 1.png"
import instagram from "../../assets/1161953_instagram_icon 1.png"
import linkedin from "../../assets/104493_linkedin_icon 1.png"
import X from "../../assets/11244080_x_twitter_elon musk_twitter new logo_icon 1.png"
import tiktok from "../../assets/8547041_tiktok_icon 1.png"

function Footer() {
  return (
    <footer className='footer'>
        <Link to='/home_page'>
            <div className='footer-logo'>
                <img src={logo} alt="logo" className="logo" />
                <Link to="/home_page">Academy</Link>
            </div>
        </Link>

        {/* Brief self Intro */}
        <div className='footer-content'>
            <div className='footer-description'>
                <p>V-academy is a non-profit organization.</p>
                <p>Our mission is to provide a world-class education, completely free, to anyone, anywhere.</p>
                
            </div> 

            {/* Contact Info */}
            <div className='footer-contactInfo'>
                <p><img src={phone} alt='phone icon'/><b>0901234567</b></p>
            </div>
            <div className='footer-contactInfo'>
                <p><img src={mail} alt='mail icon'/><b>Vacademy@gmail.com</b></p>
            </div>
        </div>
        <div className="footer-social">
            <span className="social-icon">
                <img src={facebook} alt='facebook icon'/>
            </span>
            <span className="social-icon">
                <img src={instagram} alt='insta icon'/>
            </span>
            <span className="social-icon">
                <img src={linkedin} alt='linkedin icon'/>
            </span>
            <span className="social-icon">
                <img src={X} alt='x icon'/>
            </span>
            <span className="social-icon">
                <img src={tiktok} alt='tiktok icon'/>
            </span>
        </div>
        <div className="footer-copyright">
            &copy; 2024 V-academy copyright
        </div>
    </footer>
  )
}

export default Footer