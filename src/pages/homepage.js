import React from "react";
import SemiNav from "../components/seminav";
import hero from "../static/hero.png";
import kitchen from "../static/kitchen.png";
import general from "../static/general.png";
import appliance from "../static/appliance.png";
import More from "../components/more";
import heor2 from "../static/hero2.png";
import Card from "../components/card";
import "../style/homepage.css";


const homepage = () => {
  return (
    <>
      <SemiNav />
      <div className="hero">
        <div className="hero_img">
          <img src={hero} alt="" className="image_fit" />
        </div>
        <div className="hero_button">
          <button className="hero_button1">Explore</button>
          <button className="hero_button2">Enquire</button>
        </div>
      </div>

      <div className="card_container">
        <Card img={kitchen}
          title='Kitchen'
          desc = 'Browse our kitchen appliances form mixer grinders to stoves' />
        <Card img={appliance}
          title='Aplliances'
          desc = 'Rediscover our home appliances with innovative products ' />
        <Card img={general}
          title='General'
          desc = 'make your day to day activities easier' />
      </div> 

      <div className="hero2">
        <div className="hero_img">
          <img src={heor2} alt="" className="image_fit" />
        </div>
        <div className="hero_button_f">
          <button className="hero_button3">Find out more</button>
        </div>
      </div>
      
      <More/>
      
    </>
  );
};

export default homepage;
