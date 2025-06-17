import React from 'react'
import './Navbar.css'
import { TiHomeOutline } from "react-icons/ti";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { RiLandscapeAiLine } from "react-icons/ri";

import h1 from '../ComponentAsseets/k1.png'
const Navbar = () => {
    return (
        <div className='nav-con'>
            <div className="left-con">
                <div className="logo">
                    <img src={h1}></img>
                    <p>KoiCart</p>
                </div>
                <div className="online">
                    <p>ONLINE SHOPPING</p>

                </div>

            </div>
            {/* -------------------------------------------- */}

            <div className="center-con">
                <div className="cen-logo">
                    <div className="icon-lable">

                        < TiHomeOutline className='logo-cen-1' />
                        <p>Home</p>
                    </div>
                    <div className="icon-lable">

                        <IoMdSearch className='logo-cen-1' />
                        <p>Search</p>

                    </div>
                    <div className="icon-lable">

                        <IoCartOutline className='logo-cen-1' />
                        <p>Cart</p>

                    </div>
                    <div className="icon-lable">

                        <MdOutlineAccountCircle className='logo-cen-1' />
                        <p>Account</p>

                    </div>
                    <div className="icon-lable">
<RiLandscapeAiLine className='logo-cen-1'  />

                        <p>Scape</p>

                    </div>
                </div>
            </div>
            {/* ------------------------------------------------ */}

            <div className="right-con">

                <CiSettings className='logo-cen-1' />

            </div>
        </div>
    )
}

export default Navbar