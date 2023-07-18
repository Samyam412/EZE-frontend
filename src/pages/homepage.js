import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import SemiNav from "../components/seminav";
import hero from "../static/hero.png";
import kitchen from "../static/kitchen.png";
import general from "../static/general.png";
import appliance from "../static/appliance.png";
import More from "../components/more";
import heor2 from "../static/hero2.png";
import Card from "../components/card";
import "../style/homepage.css";

const Homepage = () => {
  const exploreSectionRef = useRef(null);

  const heroNavigation = () => {
    exploreSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToEnquiry = () => {
    return <Navigate to="/contact" />;
  };

  const navigateToProduct = () => {
    return <Navigate to={`/product`} />;
  };

  return (
    <>
      <SemiNav />
      <div className="hero">
        <div className="hero_img">
          <img src={hero} alt="" className="image_fit" />
        </div>
        <div className="hero_button">
          <button className="hero_button1" onClick={heroNavigation}>
            Explore
          </button>
          <button className="hero_button2" onClick={navigateToEnquiry}>
            Enquire
          </button>
        </div>
      </div>

      <div ref={exploreSectionRef} className="card_container">
        <Card
          img={kitchen}
          title="Kitchen"
          desc="Browse our kitchen appliances from mixer grinders to stoves"
          onClick={() => navigateToProduct()}
        />
        <Card
          img={appliance}
          title="Appliances"
          desc="Rediscover our home appliances with innovative products"
          onClick={() => navigateToProduct()}
        />
        <Card
          img={general}
          title="General"
          desc="Make your day-to-day activities easier"
          onClick={() => navigateToProduct()}
        />
      </div>

      <div className="hero2">
        <div className="hero_img">
          <img src={heor2} alt="" className="image_fit" />
        </div>
        <div className="hero_button_f">
          <button onClick={heroNavigation} className="hero_button3">
            Find out more
          </button>
        </div>
      </div>

      <More />
    </>
  );
};

export default Homepage;
