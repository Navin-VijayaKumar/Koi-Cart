import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaListUl, FaShoppingCart } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <div className="sidebar-row">
        <Link to="/addproduct" className="sidebar-card">
          <FaPlusCircle className="sidebar-icon" />
          <p>Add Product</p>
        </Link>

        <Link to="/allproducts" className="sidebar-card">
          <FaListUl className="sidebar-icon" />
          <p>List Products</p>
        </Link>

        <Link to="/order" className="sidebar-card">
          <FaShoppingCart className="sidebar-icon" />
          <p>Users Order</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
