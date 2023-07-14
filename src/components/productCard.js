import React from 'react';
import axios from 'axios';
import '../style/productCard.css';
import { useEffect, useState } from 'react';
import { _PRODUCTS } from '../services/constants';

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(_PRODUCTS);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product-card-container">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
          <div className="product-rating">{product.rating} stars</div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
