import React from 'react'
import { useState, useEffect } from 'react';
const Discount = ({ offer, old_price }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    const discount = parseFloat(offer);
    useEffect(() => {
        if (old_price && discount !== undefined) {
            const discounted = old_price * (1 - discount / 100);
            setTotalPrice(discounted.toFixed(0));
        }
    }, [old_price, offer]);
    return (
        <div>
            <p>₹{totalPrice}</p>

        </div>
    )
}

export default Discount