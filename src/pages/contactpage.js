import React from 'react';
import SemiNav from '../components/seminav';
import '../style/contactPage.css';

const ContactPage = () => {
  return (
    <>
      <SemiNav />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-card">
          <h3 className="card-heading">Registered Office</h3>
          <p className="card-address">
            EZE Home Products Pvt. Ltd. <br />
            103, 1st Floor, Rajendra bhawan-1 <br />
            Rajendra Bhawan, Surunga-3
          </p>
          <p className="card-contact">
            <span className="contact-label">Phone:</span> +977-9847041506 / 9847041507
          </p>
          <p className="card-contact">
            <span className="contact-label">Email:</span> info@ezeNepal.np
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
