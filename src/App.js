import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/homepage.js";
import Product from "./pages/productpage.js";
import Support from "./pages/supportpage.js";
import Contact from "./pages/contactpage.js";
import LoginPage from "./pages/loginpage";
import ProfilePage from "./pages/profilepage";
import Footer from "./components/footer";
import ProductDisplayPage from "./pages/productdisplaypage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDisplayPage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
