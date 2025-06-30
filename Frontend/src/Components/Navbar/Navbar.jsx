import React, { useState } from 'react'
import './Navbar.css'
import { TiHomeOutline } from "react-icons/ti";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { RiLandscapeAiLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { TbShoppingCartCopy } from "react-icons/tb";

import { BsFillCartCheckFill } from "react-icons/bs";

import { Link } from 'react-router-dom';
import h1 from '../ComponentAsseets/k1.png'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (<div className="nav-all">

        <div className='nav-con'>
            <div className="left-con">
                <div className="logo">
                    <img src={h1} alt="logo" />
                    <p>KoiCart</p>
                </div>
                <div className="online">
                    <p>ONLINE SHOPPING</p>
                </div>
            </div>

            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars />
            </div>
            <div className={`center-con ${menuOpen ? 'mobile-show' : ''}`}>
                <div className="cen-logo">
                    <Link to="/"><div className="icon-lable">
                        < TiHomeOutline className='logo-cen-1' />
                        <p>Home</p>
                    </div>
                    </Link>
                    <Link to="/buy"> <div className="icon-lable">
                        <IoMdSearch className='logo-cen-1' />
                        <p>Search</p>
                    </div>
                    </Link>
                    <Link to="/cart"><div className="icon-lable">
                        <TbShoppingCartCopy className='logo-cen-1'  />
                        <p>Orders</p>
                    </div>
                    </Link>
                    <Link to="/account"> <div className="icon-lable">
                        <MdOutlineAccountCircle className='logo-cen-1' />
                        <p>Account</p>
                    </div>
                    </Link>
                    <Link to="/scape"><div className="icon-lable">
                        <RiLandscapeAiLine className='logo-cen-1' />
                        <p>Scape</p>
                    </div>
                    </Link>
                    <Link to="/setting">   <div className="icon-lable disSetting">
                        <CiSettings className='logo-cen-1' />
                        <p>Setting</p>
                    </div>
                    </Link>
                </div>
            </div>

            <Link to="/setting"> <div className="right-con">
                <CiSettings className='logo-cen-1' />

            </div></Link>
        </div>
    </div>

    )
}

export default Navbar
