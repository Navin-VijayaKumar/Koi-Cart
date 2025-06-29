import React from 'react'

import { useState, useEffect, useMemo } from 'react';
import { IoMdSearch } from "react-icons/io";
import { useContext } from "react";
import { Shopcontext } from '../../Context/ShopContext';
import Discount from '../Discount/Discount.jsx';
import { Link } from 'react-router-dom';
const RelatedProduct = ({ Farm_name }) => {
    const statusBgColor = {
        "Sold Out": "rgb(254, 101, 103)",
        "In Stock": "rgb(161, 251, 138)",
    };

    const { all_product } = useContext(Shopcontext);

    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [currentImageIndexes, setCurrentImageIndexes] = useState({});


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

    const handelup = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="buy-con">


            <div className="product-grid">
                {all_product.length > 0 ? (
                    (Farm_name
                        ? all_product.filter(product => product.Farm_name === Farm_name)
                        : all_product
                    )
                        .slice(0, 10)
                        .map((product) => {
                            const images = [product.image_url1, product.image_url2, product.image_url3].filter(Boolean);
                            const currentIndex = currentImageIndexes[product.id] || 0;

                            return (
                                <div key={product.id} className="product-card" onClick={() => handelup()}>
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
                            );
                        })
                ) : (
                    <p>Sorry, Fish Not Found</p>
                )}
            </div>
        </div >
    )
}
export default RelatedProduct