import React from 'react'
import './Buy.css'
import { useState, useEffect, useMemo } from 'react';
import { IoMdSearch } from "react-icons/io";
import { useContext } from "react";
import { Shopcontext } from "./../../Context/ShopContext.jsx";
import Discount from '../../Components/Discount/Discount.jsx';
import { Link } from 'react-router-dom';
const Buy = () => {
  const [status, setStatus] = useState("");

  const { all_product } = useContext(Shopcontext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  const statusBgColor = {
    "Sold Out": "rgb(254, 101, 103)",
    "In Stock": "rgb(161, 251, 138)",
  };

  const isPriceInRange = (price, range) => {
    if (!range) return true;

    const priceNum = parseInt(price);
    switch (range) {
      case "0-5000":
        return priceNum >= 1000 && priceNum <= 5000;
      case "5001-15000":
        return priceNum >= 6000 && priceNum <= 15000;
      case "15001-25000":
        return priceNum >= 16000 && priceNum <= 25000;
      case "25001-35000":
        return priceNum >= 26000 && priceNum <= 35000;
      case "35001-50000":
        return priceNum >= 36000 && priceNum <= 50000;
      case "50001-100000":
        return priceNum >= 60000 && priceNum <= 100000;
      case "100001-300000":
        return priceNum >= 100000 && priceNum <= 300000;
      default:
        return true;
    }
  };

  const isSizeInRange = (sizeStr, range) => {
    if (!range) return true;

    const size = parseInt(sizeStr);
    switch (range) {
      case "20cm - 30cm":
        return size >= 20 && size <= 30;
      case "31cm - 40cm":
        return size >= 31 && size <= 40;
      case "41cm - 50cm":
        return size >= 41 && size <= 50;
      case "51cm - 60cm":
        return size >= 51 && size <= 60;
      case "61cm - 80cm":
        return size >= 61 && size <= 80;
      default:
        return true;
    }
  };

  const filteredProducts = all_product
    .filter((product) =>
      !selectedCategory || product.name === selectedCategory
    )
    .filter((product) =>
      !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      !selectedSize || isSizeInRange(product.size_cm, selectedSize)
    )
    .filter((product) =>
      !selectedLocation || product.location === selectedLocation
    )
    .filter((product) =>
      !selectedPrice || isPriceInRange(product.price, selectedPrice)
    );

  // Handle image cycling for hovered products
  useEffect(() => {
    let interval;
    if (hoveredProductId) {
      interval = setInterval(() => {
        setCurrentImageIndexes(prev => ({
          ...prev,
          [hoveredProductId]: ((prev[hoveredProductId] || 0) + 1) % 3
        }));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [hoveredProductId]);

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
    if (!currentImageIndexes[productId]) {
      setCurrentImageIndexes(prev => ({ ...prev, [productId]: 0 }));
    }
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
    setCurrentImageIndexes({});
  };

  return (
    <div className="buy-con">
      <div className="search-bar">
        <input
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IoMdSearch className='search-bar-icon' />
      </div>

      <div className="filter-search">
        {/* Name Filter */}
        <div className="filter-name select">
          <p>Name</p>
          <select
            name="koiName"
            className="selector"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
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
          <select
            name="koiSize"
            className="selector"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            required
          >
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
          <select
            name="location"
            className="selector"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            required
          >
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
          <select
            name="price"
            className="selector"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            required
          >
            <option value="">All</option>
            <option value="0-5000">₹1,000 - ₹5,000</option>
            <option value="5001-15000">₹6,000 - ₹15,000</option>
            <option value="15001-25000">₹16,000 - ₹25,000</option>
            <option value="25001-35000">₹26,000 - ₹35,000</option>
            <option value="35001-50000">₹36,000 - ₹50,000</option>
            <option value="50001-100000">₹60,000 - ₹1,00,000</option>
            <option value="100001-300000">₹1,00,000 - ₹3,00,000</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const images = [product.image_url1, product.image_url2, product.image_url3].filter(Boolean);
            const currentIndex = currentImageIndexes[product.id] || 0;

            return (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`}>

                  <div
                    className="item-image"
                    onMouseEnter={() => handleMouseEnter(product.id)}
                    onMouseLeave={handleMouseLeave}
                    style={{ width: '300px', height: '300px', overflow: 'hidden' }}
                  >
                    <img
                      src={images[currentIndex] || images[0]}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        transition: '0.5s ease-in-out',
                      }}
                    />
                  </div>
                  <div className="product-name">{product.name}</div>
                  <div className="footer1">
                    <div className="offer">
                      <p>-{product.offer_percentage}%</p>
                    </div>
                    <div className="oldprice">
                      <p>₹{product.price}</p>
                    </div>
                    <Discount offer={product.offer_percentage} old_price={product.price} />
                  </div>
                  <div className="location-con">
                    <p className="location">{product.location}</p>
                  </div>
                  <div
                    className="item-status"
                    style={{
                      backgroundColor: product.stock <= 0 ? statusBgColor["Sold Out"] : statusBgColor["In Stock"],
                      color: "black",
                      padding: "5px 10px",
                      borderRadius: "2px",
                      alignItems: "center",
                    }}
                  >
                    <p>{product.stock <= 0 ? "Sold Out" : "In Stock"}</p>
                  </div>
                </Link>

              </div>
            )
          })
        ) : (
          <p> Sorry, Fish Not Found</p>
        )}
      </div>

    </div >
  )
}

export default Buy