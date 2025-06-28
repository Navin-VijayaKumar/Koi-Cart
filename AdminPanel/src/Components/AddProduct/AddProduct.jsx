import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState({
    image1: false,
    image2: false,
    image3: false,
    video: false
  });
  
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

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file, fileType) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('http://localhost:3000/upload-media', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
      return null;
    }
  };

  // Handle file uploads
  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (fieldName.includes('image') && !isImage) {
      alert('Please select an image file');
      return;
    }
    
    if (fieldName === 'video' && !isVideo) {
      alert('Please select a video file');
      return;
    }

    // Validate file size (10MB for images, 50MB for videos)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size too large. Maximum size: ${isVideo ? '50MB' : '10MB'}`);
      return;
    }

    // Set uploading state
    setUploadingFiles(prev => ({
      ...prev,
      [fieldName]: true
    }));

    try {
      const uploadedUrl = await uploadToCloudinary(file);
      if (uploadedUrl) {
        const urlField = fieldName === 'image1' ? 'image_url1' : 
                        fieldName === 'image2' ? 'image_url2' : 
                        fieldName === 'image3' ? 'image_url3' : 'video_url';
        
        setProductDetails(prev => ({
          ...prev,
          [urlField]: uploadedUrl
        }));
      }
    } finally {
      setUploadingFiles(prev => ({
        ...prev,
        [fieldName]: false
      }));
    }
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
          <p>Image 1</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'image1')}
            disabled={uploadingFiles.image1}
          />
          {uploadingFiles.image1 && <p>Uploading image...</p>}
          {productDetails.image_url1 && (
            <div className="uploaded-preview">
              <img src={productDetails.image_url1} alt="Preview" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
              <p>✓ Uploaded</p>
            </div>
          )}
        </div>

        <div className="addproduct-field">
          <p>Image 2</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'image2')}
            disabled={uploadingFiles.image2}
          />
          {uploadingFiles.image2 && <p>Uploading image...</p>}
          {productDetails.image_url2 && (
            <div className="uploaded-preview">
              <img src={productDetails.image_url2} alt="Preview" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
              <p>✓ Uploaded</p>
            </div>
          )}
        </div>

        <div className="addproduct-field">
          <p>Image 3</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'image3')}
            disabled={uploadingFiles.image3}
          />
          {uploadingFiles.image3 && <p>Uploading image...</p>}
          {productDetails.image_url3 && (
            <div className="uploaded-preview">
              <img src={productDetails.image_url3} alt="Preview" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
              <p>✓ Uploaded</p>
            </div>
          )}
        </div>

        <div className="addproduct-field">
          <p>Video</p>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileUpload(e, 'video')}
            disabled={uploadingFiles.video}
          />
          {uploadingFiles.video && <p>Uploading video...</p>}
          {productDetails.video_url && (
            <div className="uploaded-preview">
              <video src={productDetails.video_url} style={{width: '100px', height: '100px'}} controls />
              <p>✓ Uploaded</p>
            </div>
          )}
        </div>

        <div className="down">
          <button
            onClick={addKoiProduct}
            disabled={loading || Object.values(uploadingFiles).some(Boolean)}
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