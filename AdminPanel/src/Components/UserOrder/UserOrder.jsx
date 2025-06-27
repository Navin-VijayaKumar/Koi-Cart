import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserOrder.css";

const UserOrder = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [cartRes, deliveryRes, buyRes] = await Promise.all([
          axios.get("http://localhost:4000/carts"),
          axios.get("http://localhost:4000/delivery"),
          axios.get("http://localhost:4000/buydetails"),
        ]);

        const cartData = cartRes.data;
        const deliveryData = deliveryRes.data;
        const buyData = buyRes.data;

        // Normalize IDs to string (for matching)
        const cartsByUser = cartData.reduce((acc, cart) => {
          acc[cart.userId] = cart.cartItems;
          return acc;
        }, {});

        const deliveryByUser = deliveryData.reduce((acc, delivery) => {
          acc[delivery.user_id] = delivery;
          return acc;
        }, {});

        const buysByUser = buyData.reduce((acc, buy) => {
          const id = buy.userId;
          if (!acc[id]) acc[id] = [];
          acc[id].push(buy);
          return acc;
        }, {});

        // Find common users
        const userIds = Object.keys(cartsByUser).filter(
          (userId) => deliveryByUser[userId] && buysByUser[userId]
        );

        const combinedData = userIds.map((userId) => ({
          userId,
          cartItems: cartsByUser[userId],
          deliveryInfo: deliveryByUser[userId],
          buyDetails: buysByUser[userId],
        }));

        setUserOrders(combinedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <p>Loading user orders...</p>;
  if (userOrders.length === 0) return <p>No common user data found.</p>;

  return (
    <div className="user-orders-container">
  <h2>All User Orders</h2>
  {userOrders.map((user, index) => (
    <div key={index} className="user-order-card">
      <h3>User ID: {user.userId}</h3>

      <div className="delivery-info">
        <h4 className="section-title">Delivery Address</h4>
        <p>Name: {user.deliveryInfo.name}</p>
        <p>Phone: {user.deliveryInfo.phone}</p>
        <p>Email: {user.deliveryInfo.email}</p>
        <p>Address: {user.deliveryInfo.address}, {user.deliveryInfo.city}, {user.deliveryInfo.zipcode}</p>
      </div>

      <div className="mb-4">
        <h4 className="section-title">Cart Items</h4>
        {user.cartItems.map((item, idx) => (
          <div key={idx} className="detail-item">
            <p>Product ID: {item.productId}</p>
            <p>Size: {item.productSize}</p>
            <p>Quantity: {item.selectCount}</p>
          </div>
        ))}
      </div>

      <div>
        <h4 className="section-title">Buy Details</h4>
        {user.buyDetails.map((buy, idx) => (
          <div key={idx} className="detail-item">
            <p>Product ID: {buy.productId}</p>
            <p>Size: {buy.productSize}</p>
            <p>Quantity: {buy.selectCount}</p>
            <p>Ordered At: {new Date(buy.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

  );
};

export default UserOrder;
