import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../style/productDisplayPage.css";
import Product from "../components/product";
import { _BASE_URL } from "../services/constants";

const ProductDisplayPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/auth/user/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetchProduct();
    generateRandomNumbers();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/product/${productId}/`
      );
      const { image, extraImage } = response.data;
      const productImages = await Promise.all([
        getImage(image),
        ...extraImage.map((id) => getImage(id)),
      ]);
      setImages(productImages);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getImage = async (imageId) => {
    try {
      const response = await axios.get(`${_BASE_URL}image/${imageId}/`);
      return response.data.image.full_size;
    } catch (error) {
      console.error(error);
      return ""; // Return an empty string if image is not found
    }
  };

  const generateRandomNumbers = () => {
    const numbers = [];
    while (numbers.length < 3) {
      const number = Math.floor(Math.random() * 9) + 1;
      if (number !== parseInt(productId) && !numbers.includes(number)) {
        numbers.push(number);
      }
    }
    setRandomNumbers(numbers);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const toggleDescriptionVisibility = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleMoreButtonClick = () => {
    navigate("/product");
  };

  const handleAddToCart = () => {
    if (user) {
      // User is logged in, add item to cart
      axios
        .patch(`http://127.0.0.1:8000/cart/${productId}/`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const cartItem = response.data.data;
          console.log("Item added to cart:", cartItem);
          setShowPopup(true); // Show the popup
          setTimeout(() => {
            setShowPopup(false); // Hide the popup after 2 seconds
          }, 2000);
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
          // Handle error or show an error message
        });
    } else {
      // User is not logged in, redirect to the login page
      navigate("/login");
    }
  };

  if (!product || images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="product-disp-container">
        <div className="main-product">
          <div className="product-images">
            <div className="main-image">
              <img
                src={images[0]}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="sub-images">
              {images.slice(1).map((image, index) => (
                <div key={index} className="sub-image">
                  <img src={image} alt={product.name} className="product-image" />
                </div>
              ))}
            </div>
          </div>

          <div className="product-details">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-price">Rs {product.price}</p>
            <hr className="main-prod-hr" />
            <p
              className={`product-description ${
                showFullDescription ? "show" : ""
              }`}
            >
              {product.content}
            </p>
            <button
              className="more-button"
              onClick={toggleDescriptionVisibility}
            >
              {showFullDescription ? "Less" : "More"}
            </button>

            <div className="add-cart">
              <button className="add-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="secondary-prod">
          <h1>You may also like</h1>
          <div className="secondary-prod-container">
            {randomNumbers.map((number) => (
              <Product
                key={number}
                productId={number.toString()}
                onClick={handleProductClick}
              />
            ))}
            <div className="more-prod">
              <button onClick={handleMoreButtonClick}>More</button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">Item Added to cart sucessfuly</div>
        </div>
      )}
    </>
  );
};

export default ProductDisplayPage;
