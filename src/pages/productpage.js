import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SemiNav from '../components/seminav';
import Product from '../components/product';
import '../style/productpage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/product/');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SemiNav />
      <div className="product-grid">
        {products.map((product) => (
          <Product key={product.pk} productId={product.pk} />
        ))}
      </div>
      </>
    
  );
};

export default ProductPage;
