import React from 'react'
import './Buy.css'
import { IoMdSearch } from "react-icons/io";

const Buy = () => {
  return (
    <div className="buy-con">
      <div className="search-bar">
        <input type='text' placeholder='Search'></input>
        <IoMdSearch className='search-bar-icon' />
      </div>


      <div className="filter-search">
        <div className="filter-name select">
          <p>Name</p>
          <select
            name="state"
            className="selector"
            required
          >
            <option value="">All</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </div>
        <div className="filter-size select">
          <p>Size</p>
          <select
            name="state"
            className="selector"
            required
          >
            <option value="">All</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </div>
        <div className="filter-location select">
          <p>Location</p>
          <select
            name="state"
            className="selector"
            required
          >
            <option value="">All</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </div>
        <div className="filter-price select">
          <p>Price</p>
          <select
            name="state"
            className="selector"
            required
          >
            <option value="">All</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </div>
      </div>



    </div>
  )
}

export default Buy