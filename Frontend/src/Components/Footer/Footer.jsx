import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { Link } from 'react-router-dom';

import './Footer.css'
const Footer = () => {
    return (
        <div className="footer-con">
            <div className="footer-title">
                    <p><span className='footertitle'>Questions or concerns?</span> <Link to="/contact"><span className='footertitle1'>Leave feedback</span></Link></p>
            </div>
            <div className="footer-top">



                <div className="footer-about footer-inside">
                    <h3>About</h3>
                    <Link to='/contact'> <p>Contact Us</p></Link>
                    <p>Careers</p>
                    <p>Corporate Information</p>


                </div>


                {/* ///////// */}
                <div className="footer-contact footer-inside">
                    <h3>Contact</h3>
                    <p>Email:abc@sample.com</p>



                </div>
                {/* ///////// */}
                <div className="footer-help footer-inside">
                    <h3>Help</h3>
                    <p>Payments</p>
                    <p>Shiping</p>
                    <p>Cancellation & Return</p>
                    <p>FAQ</p>


                </div>
                <div className="footer-address footer-inside">
                    <h3>Register Office Address</h3>
                    <p>Koi Cart,</p>
                    <p>6-b,A.V Complex,Workshop Street,</p>
                    <p>Erode-638402</p>
                    <p>Tamil Nadu,India</p>

                    {/* // */}
                </div>
            </div>
            <div className="footer-bottom">
                <h3>Social Media</h3>
                <div className="footer-icons">
                    <FaFacebook className="footer-icon" />
                    <FaInstagram className="footer-icon" />
                    <FaLinkedin className="footer-icon" />
                    <FiYoutube className="footer-icon" />


                </div>
            </div>



        </div>
    )
}

export default Footer