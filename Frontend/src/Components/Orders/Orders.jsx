import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            // Get userId from localStorage
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setError('Please login to view your orders');
                setLoading(false);
                return;
            }

            // Update the API URL to match your backend
            const response = await axios.get(`http://localhost:3000/api/orders/${userId}`);

            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                setError('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return <FaCheckCircle className="status-icon confirmed" />;
            case 'shipped':
                return <FaTruck className="status-icon shipped" />;
            case 'delivered':
                return <FaBox className="status-icon delivered" />;
            case 'pending':
                return <FaClock className="status-icon pending" />;
            case 'cancelled':
                return <FaTimes className="status-icon cancelled" />;
            default:
                return <FaClock className="status-icon pending" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return '#28a745';
            case 'shipped':
                return '#007bff';
            case 'delivered':
                return '#20c997';
            case 'pending':
                return '#ffc107';
            case 'cancelled':
                return '#dc3545';
            default:
                return '#6c757d';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredOrders = filterStatus === 'all'
        ? orders
        : orders.filter(order => order.status === filterStatus);

    if (loading) {
        return (
            <div className="orders-container">
                <div className="loading">Loading your orders...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h1>My Orders</h1>
                <div className="orders-filter">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="no-orders">
                    <FaBox className="no-orders-icon" />
                    <h2>No Orders Found</h2>
                    <p>You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3>Order #{order.id}</h3>
                                    <p className="order-date">Placed on {formatDate(order.order_date)}</p>
                                </div>
                                <div className="order-status">
                                    {getStatusIcon(order.status)}
                                    <span
                                        className="status-text"
                                        style={{ color: getStatusColor(order.status) }}
                                    >
                                        {order.status.toUpperCase()}
                                    </span>
                                    
                                </div>
                            </div>

                            <div className="order-content">
                                <div className="product-info">
                                    <div className="product-image">
                                        <img
                                            src={order.image_url1}
                                            alt={order.productName || order.product_name}
                                            onError={(e) => {
                                                e.target.src = '/placeholder-koi.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className="product-details">
                                        <h4>{order.productName || order.product_name}</h4>

                                    </div>
                                </div>

                                <div className="order-details">
                                    <div className="price-info">
                                        <p className="price">₹{order.price}</p>
                                        <p className="quantity">Qty: {order.quantity}</p>
                                    </div>

                                    <div className="payment-info">
                                        <p><strong>Payment ID:</strong> {order.payment_id}</p>
                                    </div>
                                </div>
                                <div className="product-specs">
                                        <p><strong>Size:</strong> {order.size_cm}cm</p>
                                        <p><strong>Age:</strong> {order.age} years</p>
                                        <p><strong>Farm:</strong> {order.Farm_name}</p>
                                        <p><strong>Location:</strong> {order.location}</p>
                                    </div>
                            </div>

                            <div className="shipping-info">
                                <h5>Shipping Address:</h5>
                                <div className="address">
                                    {order.shippingDetails && typeof order.shippingDetails === 'object' ? (
                                        <>
                                            <p>{order.shippingDetails.fullName}</p>
                                            <p>{order.shippingDetails.address}</p>
                                            <p>{order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.zipCode}</p>
                                            <p>Phone: {order.shippingDetails.contact}</p>
                                            <p>Email: {order.shippingDetails.email}</p>
                                        </>
                                    ) : (
                                        <p>Shipping details not available</p>
                                    )}
                                </div>
                            </div>

                            <div className="order-actions">
                                {order.status === 'delivered' && (
                                    <button className="btn-secondary">Rate Product</button>
                                )}
                                {(order.status === 'confirmed' || order.status === 'pending') && (
                                    <button className="btn-danger">Cancel Order</button>
                                )}
                                <button className="btn-primary">Track Order</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;