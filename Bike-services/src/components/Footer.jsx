import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We provide professional bike service and maintenance solutions to keep your ride in perfect condition.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/book">Book Service</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@bikeservices.com</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Bike Street, Cycle City</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bike Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
