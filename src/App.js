import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/homepage.js";
import Product from "./pages/productpage.js";
import Support from "./pages/supportpage.js";
import Contact from "./pages/contactpage.js";
import LoginPage from "./pages/loginpage";
import ProfilePage from "./pages/profilepage";

function App() {
  return (
    <Router>
    <Navbar />
    
    <Routes>
    <Route path="/login" element={<LoginPage />}>
        {" "}
      </Route>
    <Route path="/" element={<Home />}>
        {" "}
      </Route>
      
    <Route path="/product" element={<Product/>}>
        {" "}
      </Route>
    <Route path="/support" element={<Support/>}>
        {" "}
      </Route>
    <Route path="/contact" element={<Contact/>}>
        {" "}
      </Route>
    <Route path="/profile" element={<ProfilePage/>}>
        {" "}
      </Route>
    </Routes>

    
  </Router>
  );
}

export default App;
