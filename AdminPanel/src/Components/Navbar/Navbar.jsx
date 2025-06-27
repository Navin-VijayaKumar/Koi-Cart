import React from 'react'
import './Navbar.css'
import sg from '../AssertsAdmin/sg.gif'
const Navbar = () => {
  return (
   <div className='control-panel'>
    <div className="navAdmin">
    <div className='admintext'>
        <h1>Welcome to Admin Panel</h1>
    </div>
    <div>
 <img  className="adminimg" src={sg} alt="" />

    </div>
    

    </div>
    <hr className="custom-hr" />  
   </div>
    
  )
}

export default Navbar