import React from 'react'
import './Buy.css'
import { IoMdSearch } from "react-icons/io";
import { useContext } from "react";
import { Shopcontext } from "./../../Context/ShopContext.jsx";
const Buy = () => {
  const { all_product } = useContext(Shopcontext);

  const getStatus = (count) => {
    if (count <= 0) return "Out of stock";
    if (count <= 10) return "Only few left";
    if (count <= 20) return "Hot Deal";
    return "In Stock";
  };

  const statusBgColor = {
    "Out of stock": "rgb(164, 168, 168)",
    "Only few left": "rgb(249, 154, 154)",
    "Hot Deal": "rgb(227, 227, 92)",
    "In Stock": "rgb(175, 246, 157)",
  };
  return (
    <div className="buy-con">
      <div className="search-bar">
        <input type='text' placeholder='Search'></input>
        <IoMdSearch className='search-bar-icon' />
      </div>

      <div className="filter-search">
        {/* Name Filter */}
        <div className="filter-name select">
          <p>Name</p>
          <select name="koiName" className="selector" required>
            <option value="">All</option>
            <option value="Kohaku">Kohaku</option>
            <option value="Sanke">Sanke</option>
            <option value="Showa">Showa</option>
            <option value="Asagi">Asagi</option>
            <option value="Shusui">Shusui</option>
            <option value="Bekko">Bekko</option>
            <option value="Utsurimono">Utsurimono</option>
            <option value="Goromo">Goromo</option>
            <option value="Goshiki">Goshiki</option>
            <option value="Ogon">Ogon</option>
            <option value="Kujaku">Kujaku</option>
            <option value="Hariwake">Hariwake</option>
            <option value="Doitsu">Doitsu</option>
            <option value="Tancho">Tancho</option>
            <option value="Chagoi">Chagoi</option>
            <option value="Soragoi">Soragoi</option>
            <option value="Benigoi">Benigoi</option>
            <option value="Yamabuki Ogon">Yamabuki Ogon</option>
            <option value="Platinum Ogon">Platinum Ogon</option>
            <option value="Gin Rin">Gin Rin</option>
          </select>
        </div>

        {/* Size Filter */}
        <div className="filter-size select">
          <p>Size</p>
          <select name="koiSize" className="selector" required>
            <option value="">All</option>
            <option value="20cm - 30cm">20cm - 30cm</option>
            <option value="31cm - 40cm">31cm - 40cm</option>
            <option value="41cm - 50cm">41cm - 50cm</option>
            <option value="51cm - 60cm">51cm - 60cm</option>
            <option value="61cm - 80cm">61cm - 80cm</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="filter-location select">
          <p>Location</p>
          <select name="location" className="selector" required>
            <option value="">All</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Delhi">Delhi</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Ladakh">Ladakh</option>
          </select>
        </div>

        {/* Price Filter */}
        <div className="filter-price select">
          <p>Price</p>
          <select name="price" className="selector" required>
            <option value="">All</option>
            <option value="0-5000">₹1,000 - ₹5,000</option>
            <option value="5001-15000">₹6,000 - ₹15,000</option>
            <option value="15001-50000">₹16,000 - ₹25,000</option>
            <option value="15001-50000">₹26,000 - ₹35,000</option>
            <option value="15001-50000">₹36,000 - ₹50,000</option>
            <option value="50001-100000">₹60,000 - ₹1,00,000</option>
            <option value="100001-300000">₹1,00,000 - ₹3,00,000</option>
          </select>
        </div>
      </div>



      <div className="product-grid">
        {all_product.length > 0 ? (
          all_product.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image_url1} alt={product.name} />
              </div>
              <div className="product-name">{product.name}</div>
              <div className="product-description">{product.description}</div>
              <div className="product-info">
                <p><strong>Breed:</strong> {product.breed}</p>
                <p><strong>Size:</strong> {product.size_cm} cm</p>
              </div>
              <div className="product-price">₹{product.price}</div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

    </div>
  )
}

export default Buy