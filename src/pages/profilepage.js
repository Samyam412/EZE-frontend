import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../style/profilepage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [logout, setLogout] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/auth/user/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLogout(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/cart/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartItems(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.get("http://127.0.0.1:8000/auth/logout_all/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      sessionStorage.clear();
      document.cookie =
        "_xsrf=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "username-localhost-8888=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.clear();
      setLogout(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/product/${productId}/`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getProductImage = async (productId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/image/${productId}/`
      );
      return response.data.image.full_size;
    } catch (error) {
      console.error(error);
    }
  };

  const renderCartItems = async () => {
    const items = await Promise.all(
      cartItems.map(async (item) => {
        if (item.product && item.product.pk) {
          const product = await fetchProduct(item.product.pk);
          const image = await getProductImage(item.product.pk);
          return {
            id: item.id,
            product,
            image,
            quantity: item.quantity,
            created: item.created,
          };
        }
      })
    );
    setCartItems(items.filter((item) => item !== undefined));
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      renderCartItems();
    }
  }, [cartItems]);

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (logout) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgressbar value={66} />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Page</h1>
      <div className="profile-details">
        <p>
          <span className="profile-label">Username:</span> {user.username}
        </p>
        <p>
          <span className="profile-label">Email:</span> {user.email}
        </p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2 className="cart-title">Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            {item.image && (
              <img
                src={item.image}
                alt={item.product ? item.product.name : ""}
                className="product-image"
              />
            )}
            <div className="product-details">
              {item.product && (
                <p className="product-name">{item.product.name}</p>
              )}
              <p className="product-quantity">
                <span className="quantity-label">Quantity:</span>{" "}
                {item.quantity}
              </p>
              <p className="product-created">
                <span className="created-label">Added on:</span>{" "}
                {new Date(item.created).toLocaleDateString()}
              </p>
              <button
                className="delete-item-btn"
                onClick={() => handleDeleteItem(item.id)}
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;