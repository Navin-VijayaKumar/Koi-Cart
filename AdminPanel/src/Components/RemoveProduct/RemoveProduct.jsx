import "./RemoveProduct.css";
import React, { useEffect, useState } from "react";

const RemoveProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/get-koi");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllProducts(data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this koi?')) {
      return;
    }
    console.log(`Removing product with id: ${id}`);

    try {
      const response = await fetch("http://localhost:3000/delete-koi", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to remove product with id ${id}`);
      }

      alert('Koi deleted successfully!');
      await fetchInfo(); // Refresh the list
    } catch (err) {
      console.error(`Error removing product with id ${id}:`, err);
      setError(`Error removing product: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const getStockStatus = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <=1) return 'In Stock';
    return 'In Stock';
  };

  const getStatusClass = (stock) => {
    if (stock === 0) return 'status-out-of-stock';
    if (stock ===1) return 'status-In Stock';
    return 'status-in-stock';
  };

  return (
    <div className="listproduct">
      <h1>All Koi Fish List</h1>
      
      <div className="controls">
        <button
          onClick={fetchInfo}
          className="refresh-button"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh List'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading koi fish...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Size (cm)</th>
                <th>Age</th>
                <th>Farm</th>
                <th>Location</th>
                <th>Stock</th>
                <th>Offer %</th>
                <th>Status</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.length > 0 ? (
                allProducts.map((product, index) => (
                  <tr key={product.id || index}>
                    <td>
                      {product.image_url1 ? (
                        <img
                          src={product.image_url1}
                          alt={product.name}
                          className="product-image"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMS4zMzMzIDIxLjMzMzNIMTZWNDJIMjEuMzMzM1YyMS4zMzMzWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                          }}
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </td>
                    <td className="product-id">{product.id}</td>
                    <td className="product-name">{product.name}</td>
                    <td className="product-price">₹{product.price}</td>
                    <td>{product.size_cm} cm</td>
                    <td>{product.age} years</td>
                    <td>{product.Farm_name}</td>
                    <td>{product.location}</td>
                    <td>{product.stock}</td>
                    <td>{product.offer_percentage || 0}%</td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(product.stock)}`}
                      >
                        {getStockStatus(product.stock)}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="delete-button"
                        title="Delete Koi"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="no-products">
                    No koi fish available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RemoveProduct;