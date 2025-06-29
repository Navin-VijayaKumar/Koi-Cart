import React, { useState, useEffect, useContext } from 'react';
import './Payment.css';
import { Shopcontext } from '../../Context/ShopContext';
import { FaLock } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const { all_product } = useContext(Shopcontext);
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState('');
  const [offerPrice, setOfferPrice] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get product details and payment info from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = urlParams.get('userId');
    const offerPriceFromUrl = urlParams.get('offerPrice');
    
    if (userIdFromUrl) setUserId(userIdFromUrl);
    if (offerPriceFromUrl) setOfferPrice(parseFloat(offerPriceFromUrl));
    
    // Find the product
    const foundProduct = all_product.find(p => p.id === parseInt(productId));
    if (foundProduct) {
      setProduct(foundProduct);
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [productId, all_product]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Process order after successful payment
  const processOrder = async (paymentId) => {
    try {
      if (!userId || !product) {
        throw new Error('Missing user or product information');
      }

      // Send order details to backend
      const orderData = {
        userId,
        paymentId,
        productId: product.id,
        productName: product.name,
        price: offerPrice,
        quantity: 1,
        shippingDetails: {
          fullName: formData.fullName,
          email: formData.email,
          contact: formData.contact,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        productDetails: {
          farmName: product.Farm_name,
          age: product.age,
          size: product.size_cm,
          location: product.location
        }
      };

      const response = await axios.post('https://southerntexport-e-commerce.onrender.com/api/create-order', orderData);

      if (response.data.success) {
        alert('Order placed successfully!');
        navigate('/order-confirmation');
      } else {
        alert('Failed to complete order: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error processing order:', error);
      alert('There was an issue processing your order. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!product || !offerPrice) {
      alert("Product information is missing");
      return;
    }

    if (!userId) {
      alert("User information is missing");
      return;
    }

    setIsProcessing(true);
    
    // Razorpay configuration
    const options = {
      key: "rzp_test_1Be4hjU2M9caQO", // Replace with your actual Razorpay key
      amount: offerPrice * 100, // Amount in paise
      currency: "INR",
      name: "Koi Cart",
      description: `Payment for ${product.name}`,
      image: product.image_url1, // Optional: Add product image
      handler: function (response) {
        console.log('Payment successful:', response);
        processOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.contact
      },
      notes: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        productId: product.id,
        productName: product.name,
        farmName: product.Farm_name,
        size: product.size_cm,
        age: product.age,
        userId: userId
      },
      theme: {
        color: "#ff5a5a"
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          console.log('Payment modal closed');
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!product) {
    return (
      <div className="payment-container">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h1>Checkout</h1>

      <div className="payment-layout">
        <div className="payment-form-section">
          <form onSubmit={handleSubmit}>
            <div className="payment-section">
              <h2><FaLock /> Billing Information</h2>

              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact Number *</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="9944229933"
                  pattern="[0-9]{10}"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address"
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="City"
                  />
                </div>

                <div className="form-group half">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Zip Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  placeholder="Zip Code"
                  pattern="[0-9]{6}"
                />
              </div>
            </div>

            <button
              type="submit"
              className="pay-button"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay ₹${offerPrice}`}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="order-items">
              <div className="order-item">
                <div className="item-info">
                  <div className="item-image">
                    <img 
                      src={product.image_url1} 
                      alt={product.name}
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'cover', 
                        borderRadius: '8px' 
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h4>{product.name}</h4>
                    <p><strong>Size:</strong> {product.size_cm}cm</p>
                    <p><strong>Age:</strong> {product.age} years</p>
                    <p><strong>Farm:</strong> {product.Farm_name}</p>
                    <p><strong>Location:</strong> {product.location}</p>
                    <p><strong>Qty:</strong> 1</p>
                  </div>
                </div>
                <div className="item-price">
                  ₹{offerPrice}
                </div>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{offerPrice}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="price-row">
                <span>Tax</span>
                <span>Included</span>
              </div>
              <div className="price-row total">
                <span><strong>Total</strong></span>
                <span><strong>₹{offerPrice}</strong></span>
              </div>
            </div>

            <div className="payment-security">
              <p><FaLock /> Secure Payment with Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;