import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    size_cm: '',
    price: '',
    Farm_name: '',
    stock: '',
    age: '',
    address: '',
    location: '',
    offer_percentage: '',
    image_url1: '',
    image_url2: '',
    image_url3: '',
    video_url: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new koi product
  const addKoiProduct = async () => {
    // Validation
    const requiredFields = ['name', 'description', 'size_cm', 'price', 'Farm_name', 'stock', 'age', 'address', 'location'];
    for (const field of requiredFields) {
      if (!productDetails[field]) {
        alert(`Please fill in the ${field.replace('_', ' ')} field`);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/add-koi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productDetails,
          size_cm: parseFloat(productDetails.size_cm),
          price: parseFloat(productDetails.price),
          stock: parseInt(productDetails.stock),
          age: parseInt(productDetails.age),
          offer_percentage: productDetails.offer_percentage ? parseFloat(productDetails.offer_percentage) : 0
        }),
      });

      if (response.ok) {
        alert('Koi added successfully!');
        // Reset form
        setProductDetails({
          name: '',
          description: '',
          size_cm: '',
          price: '',
          Farm_name: '',
          stock: '',
          age: '',
          address: '',
          location: '',
          offer_percentage: '',
          image_url1: '',
          image_url2: '',
          image_url3: '',
          video_url: ''
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to add koi: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding koi:', error);
      alert('Error adding koi product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-items">
        <h1>Add New Koi Fish</h1>
        
        
        <div className="addproduct-field">
          <p>Name *</p>
          <input
            type="text"
            name="name"
            value={productDetails.name}
            onChange={handleInputChange}
            placeholder="e.g., Goshiki"
          />
        </div>

        <div className="addproduct-field">
          <p>Description *</p>
          <input
            type="text"
            name="description"
            value={productDetails.description}
            onChange={handleInputChange}
            placeholder="Describe the koi fish..."
          />
        </div>

        <div className="addproduct-field">
          <p>Size (cm) *</p>
          <input
            type="number"
            step="0.1"
            name="size_cm"
            value={productDetails.size_cm}
            onChange={handleInputChange}
            placeholder="25.5"
          />
        </div>

        <div className="addproduct-field">
          <p>Price *</p>
          <input
            type="number"
            step="0.01"
            name="price"
            value={productDetails.price}
            onChange={handleInputChange}
            placeholder="1000"
          />
        </div>

        <div className="addproduct-field">
          <p>Farm Name *</p>
          <input
            type="text"
            name="Farm_name"
            value={productDetails.Farm_name}
            onChange={handleInputChange}
            placeholder="san farm"
          />
        </div>

        <div className="addproduct-field">
          <p>Stock *</p>
          <input
            type="number"
            name="stock"
            value={productDetails.stock}
            onChange={handleInputChange}
            placeholder="1"
          />
        </div>

        <div className="addproduct-field">
          <p>Age (years) *</p>
          <input
            type="number"
            name="age"
            value={productDetails.age}
            onChange={handleInputChange}
            placeholder="2"
          />
        </div>

        <div className="addproduct-field">
          <p>Address *</p>
          <input
            type="text"
            name="address"
            value={productDetails.address}
            onChange={handleInputChange}
            placeholder="Farm address"
          />
        </div>

        <div className="addproduct-field">
          <p>Location *</p>
          <input
            type="text"
            name="location"
            value={productDetails.location}
            onChange={handleInputChange}
            placeholder="Tamil Nadu"
          />
        </div>

        <div className="addproduct-field">
          <p>Offer Percentage</p>
          <input
            type="number"
            step="0.1"
            name="offer_percentage"
            value={productDetails.offer_percentage}
            onChange={handleInputChange}
            placeholder="10"
          />
        </div>

        <div className="addproduct-field">
          <p>Image URL 1</p>
          <input
            type="url"
            name="image_url1"
            value={productDetails.image_url1}
            onChange={handleInputChange}
            placeholder="https://example.com/image1.jpg"
          />
        </div>

        <div className="addproduct-field">
          <p>Image URL 2</p>
          <input
            type="url"
            name="image_url2"
            value={productDetails.image_url2}
            onChange={handleInputChange}
            placeholder="https://example.com/image2.jpg"
          />
        </div>

        <div className="addproduct-field">
          <p>Image URL 3</p>
          <input
            type="url"
            name="image_url3"
            value={productDetails.image_url3}
            onChange={handleInputChange}
            placeholder="https://example.com/image3.jpg"
          />
        </div>

        <div className="addproduct-field">
          <p>Video URL</p>
          <input
            type="url"
            name="video_url"
            value={productDetails.video_url}
            onChange={handleInputChange}
            placeholder="https://example.com/video.mp4"
          />
        </div>

        <div className="down">
          <button
            onClick={addKoiProduct}
            disabled={loading}
            className={`addproduct-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Adding Koi...' : 'Add Koi Fish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;