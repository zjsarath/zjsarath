import React, { useEffect, useState } from "react";
import "./ProductList.css";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/products")
            .then(res => res.json())
            .then(data => setProducts(data));

        const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
        setBasket(storedBasket);
    }, []);

    const handleAddToBasket = (product) => {
        let newBasket = [...basket];
        const existing = newBasket.find(item => item.id === product.id);

        const quantityInBasket = existing ? existing.quantity : 0;

        if (quantityInBasket >= product.UnitsInStock) {
            alert(`Sorry, no more stock for ${product.ProductName}.`);
            return;
        }

        if (existing) {
            existing.quantity += 1;
        } else {
            newBasket.push({ ...product, quantity: 1 });
        }

        setBasket(newBasket);
        localStorage.setItem("basket", JSON.stringify(newBasket));
        alert(`${product.ProductName} added to basket!`);
    };

    return (
        <div className="product-container">
            <h2>Available Products</h2>
            <ul className="product-grid">
                {products.map(prod => {
                    const itemInBasket = basket.find(item => item.id === prod.id);
                    const quantityInBasket = itemInBasket ? itemInBasket.quantity : 0;
                    const remainingStock = prod.UnitsInStock - quantityInBasket;

                    return (
                        <li key={prod.id} className="product-card">
                            <img
                                src={prod.ImageUrl}
                                alt={prod.ProductName}
                                className="product-image"
                            />
                            <h4>{prod.ProductName}</h4>
                            <p><strong>£{prod.UnitPrice}</strong></p>
                            <p className="product-stock">Stock: {prod.UnitsInStock}</p>
                            {remainingStock === 0 ? (
                                <button disabled>Out of Stock</button>
                            ) : (
                                <button onClick={() => handleAddToBasket(prod)}>Add to Basket</button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ProductList;