import React from "react";
import logo from "../static/logo-bg.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import "../style/footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="newsletter">
          <h3>Newsletter</h3>
          <input placeholder="Enter your email here" type="text" />
          <button>Subscribe</button>
        </div>
        <div className="footer-links">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>
    </>
  );
};
export default Footer;
