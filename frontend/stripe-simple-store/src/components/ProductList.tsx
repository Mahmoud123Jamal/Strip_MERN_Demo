import React from "react";
import type { IProduct } from "../types/product";
import "../styles/product.css";

interface ProductListProps {
  products: IProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const handleCheckout = async (productId: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else alert("Checkout failed");
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("internal server error");
    }
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <div className="image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          </div>

          <h3 className="product-name">{product.name}</h3>

          <p className="product-price">${product.price}</p>

          <button
            onClick={() => handleCheckout(product._id)}
            className="buy-button"
          >
            Buy Now!
          </button>
        </div>
      ))}
    </div>
  );
};
