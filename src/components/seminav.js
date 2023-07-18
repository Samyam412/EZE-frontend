import React from "react";
import "../style/seminav.css";
import { Link, useLocation } from "react-router-dom";

// Change the name of the function to start with an uppercase letter
const SemiNav = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };
  return (
    <>
      <nav className="nav">
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
          Home
        </Link>
        <Link to="/product" className={`nav-link ${isActive("/product") ? "active" : ""}`}>
          Products
        </Link>
        <Link to="/support" className={`nav-link ${isActive("/support") ? "active" : ""}`}>
          Support
        </Link>
        <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>
          Contact
        </Link>
      </nav>

      <hr className="seminav_hr"/>
    </>
  );
};

// Update the name of the default export to match the new name of the component
export default SemiNav;
