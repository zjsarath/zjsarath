import React, { useEffect, useState } from "react";
import "./Basket.css";

function Basket() {
    const [basketItems, setBasketItems] = useState([]);

    useEffect(() => {
        const basket = JSON.parse(localStorage.getItem("basket")) || [];
        setBasketItems(basket);
    }, []);

    const updateQuantity = (productId, delta) => {
        const updated = basketItems.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: Math.max(item.quantity + delta, 0) };
            }
            return item;
        }).filter(item => item.quantity > 0);

        setBasketItems(updated);
        localStorage.setItem("basket", JSON.stringify(updated));
    };

    const getTotal = () => {
        return basketItems.reduce((total, item) => total + item.UnitPrice * item.quantity, 0);
    };

    return (
        <div className="basket-container">
            <h2>Your Basket</h2>
            {basketItems.length === 0 ? (
                <p>Your basket is empty.</p>
            ) : (
                <>
                    {basketItems.map(item => (
                        <div key={item.id} className="basket-item">
                            <h4>{item.ProductName}</h4>
                            <p>£{item.UnitPrice} × {item.quantity}</p>
                            <div className="basket-controls">
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>
                        </div>
                    ))}
                    <div className="basket-total">Total: £{getTotal()}</div>
                </>
            )}
        </div>
    );
}

export default Basket;