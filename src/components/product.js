import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/productCard.css';
import { _BASE_URL, _PRODUCTS } from '../services/constants';

const Product = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${_PRODUCTS}${productId}/`);
      const imageID = response.data.image[0];
      const productIMG = await axios.get(`${_BASE_URL}image/${imageID}/`);
      setImage(productIMG.data.image.full_size);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product || !image) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={`/product/${productId}`} className="product-link">
      <div className="product-card">
        <img src={image} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">Rs {product.price}</p>
      </div>
    </Link>
  );
};

export default Product;
