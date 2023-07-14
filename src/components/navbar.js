import React from "react";
import "../style/navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../static/logo.jpg";
import { FaUser } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo_container">
          <Link to="/">
            <img src={logo} alt="My Logo" className="navbar_logo" />
          </Link>
        </div>
        <div className="navbar_icons">
          {!isSearchOpen ? (
            <div>
              <button onClick={toggleSearch}>
                <GoSearch className="navbar_search" />
              </button>
            </div>
          ) : (
            <div className="navbar_search relative">
              <input
                type="text"
                className={`border rounded-full border-gray-300 px-4 py-1 transition-transform duration-400 ${
                  isSearchOpen ? "w-40 sm:w-60" : "w-0"
                }`}
                placeholder="Search"
              />
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={toggleSearch}
              >
                <GoSearch />
              </button>
            </div>
          )}
          <div >
            <Link to="/profile">
              <FaUser className="navbar_profile" />
            </Link>
          </div>
        </div>
      </nav>
      <hr className="navbar_hr" />
    </>
  );
};

export default Navbar;
