import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/productCard.css';
import { _BASE_URL, _PRODUCTS } from '../services/constants';

const Product = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${_PRODUCTS}${productId}/`);
      const productIMG = await axios.get(`${_BASE_URL}image/${productId}/`);
      setImage(productIMG.data);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  if (!product || !image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-card">
      <img src={image.image.full_size} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <div className="product-rating">{product.rating} stars</div>
    </div>
  );
};

export default Product;
