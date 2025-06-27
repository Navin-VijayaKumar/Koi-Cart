import React, { useState, useEffect, useContext, useRef } from 'react';
import './InnerDisplay.css';
import { Shopcontext } from '../../Context/ShopContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MdLocalOffer } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { Ri24HoursFill, RiSecurePaymentLine } from "react-icons/ri";
import { IoIosTrophy } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import RelatedProduct from '../RelatedProduct/RelatedProduct';
const InnerDisplay = () => {
  const { all_product } = useContext(Shopcontext);
  const { productID } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const koi = all_product.find((e) => e.id === Number(productID));

  const media = koi
    ? [
      { type: "image", src: koi.image_url1 },
      { type: "image", src: koi.image_url2 },
      { type: "image", src: koi.image_url3 },
    ]
    : [];

  useEffect(() => {
    if (media.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
      }, 4400);
      return () => clearInterval(interval);
    }
  }, [currentIndex, media.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  if (!koi) {
    return <div>Loading koi details...</div>;
  }

  const discountedPrice = (koi.price - (koi.price * koi.offer_percentage) / 100).toFixed(2);

  return (
    <div className="inner-con-all-re">
      <div className="inner-con">
        <div className="inner-con-left">
          <div className="left-sample-image">
            <img src={koi.image_url1} alt="sample1" />
            <img src={koi.image_url2} alt="sample2" />
            <img src={koi.image_url3} alt="sample3" />
          </div>
          <div className="left-main-image">
            <div className="imageslider">
              <div className="carousel">
                <div className="carousel-container">

                  <img
                    src={media[currentIndex].src}
                    alt={`Slide ${currentIndex + 1}`}
                    className="carousel-image"
                  />


                </div>
                <button className="prev" onClick={prevSlide}>
                  &#10094;
                </button>
                <button className="next" onClick={nextSlide}>
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="inner-con-right">
          <div className="inner-con-details">
            <p className='inner-con-p'>{koi.name}</p>
            <hr />
            <div className="inner-price">
              <p className="price-name">Special Price:</p>
              <div className="new_p">
                <p>₹{discountedPrice}</p>
              </div>
              <div className="inner-old-p">
                <p>₹{koi.price}</p>
              </div>
            </div>
            <p>Inclusive of all taxes</p>
            <hr />
            <div className="inner-offer">
              <p>
                <MdLocalOffer className="inner-offer-icon" />
                {koi.offer_percentage}% OFF!
              </p>
            </div>

            <div className="inner-colors">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <p><strong>Farm Name:</strong> {koi.Farm_name}</p>
                <p><strong>Age:</strong> {koi.age} years</p>
                <p><strong>Size:</strong> {koi.size_cm} cm</p>
                <p><strong>Location:</strong> {koi.location}</p>
              </div>
            </div>
            <hr />
            <div className="inner-con-right-icons">
              <CiDeliveryTruck className="inner-icon-right" />
              <FaShoppingCart className="inner-icon-right2" />
              <Ri24HoursFill className="inner-icon-right" />
              <IoIosTrophy className="inner-icon-right" />
              <RiSecurePaymentLine className="inner-icon-right" />
            </div>
            <hr />
          </div>
        </div>

        <div className="inner-con-last">
          <div className="inner-con-last-all-items">
            <div className="descrip">
              <p><span>Description:</span> {koi.description}</p>
            </div>
            <p className="last-con-price">{koi.offer_percentage}% Offer</p>
            <div className="stock-left-last">
              <p className="stock-left-last-p"><span>Availability:</span> {koi.stock ? "In Stock" : "Sold Out"}</p>
            </div>
            <div className="">
              <p>Address:<span>{koi.address}</span></p>

            </div>
            <Link to="/delivery_address" className="add-location-link">
              <div className="add-location">
                <FaMapLocationDot className="add-location-icon" />
                <h4>Add Location</h4>
              </div>
            </Link>



            {showAlert && (
              <div className="alert-overlay">
                <div className="alert-box">
                  <p>Koi successfully added</p>
                  <button className="close-btn" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="button-buy-cart">
              {koi.stock <= 0 ? (
                <>
                  <div className="buy-btn btn-disabled"><p>BUY</p></div>
                  <div className="buy-btn btn-disabled"><p>ADD TO CART</p></div>
                </>
              ) : (
                <>
                  <div className="buy-btn" onClick={() => { /* Add buy functionality */ }}>
                    <p>{isLoading ? "Processing..." : "Buy"}</p>
                  </div>
                  <div
                    className="add-cart"
                    onClick={() => {
                      addToCart(koi.id, selectCount);
                      setShowAlert(true);
                    }}
                  >
                    <p>ADD TO CART</p>
                  </div>
                </>
              )}
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {isLoading && <p>Processing your order...</p>}
          </div>
        </div>
      </div>
      <div className="inner-display-video">
        <div className="video-play">

          <video
            src={koi.video_url}
            className="carousel-image"
            autoPlay
            muted
            loop
            share
            controls
          />
        </div>
      </div>
      <div className="related-products">
        <h2>Related Fish</h2>
        <RelatedProduct Farm_name={koi.Farm_name}></RelatedProduct>
      </div>
    </div>
  );
};

export default InnerDisplay;
