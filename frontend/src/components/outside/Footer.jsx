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
        <div className='footer-logo'>
            <img src={logo} alt="logo" className="logo" />
            <Link to="/home_page">Academy</Link>
        </div>
        <div className='footer-intro-container'>
            <div className='footer-description'>
                <p>V-academy is a non-profit organization.</p>
                <p>Our mission is to provide a world-class education, completely free, to anyone, anywhere.</p>
            </div> 

            {/* Contact Info */}
            <div className='footer-contactInfo'>
                <div className='phone-contact-container'>
                    <div className='phone-icon'>
                        <img src={phone} alt='phone icon'/>
                    </div>
                    <div className='phone-number'>
                        <p><b>0901234567</b></p>
                    </div>

                </div>

                <div className='mail-contact-container'>
                    <div className='mail-icon'>
                        <img src={mail} alt='mail icon'/>
                    </div>
                    <div className='mail-info'>
                        <p><b>Vacademy@gmail.com</b></p>
                    </div>
                </div>
            </div>
        </div>
        <div className='footer-social-media-copyright'>
            <div className="footer-social">
                <span >
                    <img src={facebook} alt='facebook icon'/>
                </span>
                <span >
                    <img src={instagram} alt='insta icon'/>
                </span>
                <span >
                    <img src={linkedin} alt='linkedin icon'/>
                </span>
                <span >
                    <img src={X} alt='x icon'/>
                </span>
                <span >
                    <img src={tiktok} alt='tiktok icon'/>
                </span>
            </div>
            <div className="footer-copyright">
                &copy; 2024 V-academy copyright
            </div>
        </div>
    </footer>
  )
}

export default Footer