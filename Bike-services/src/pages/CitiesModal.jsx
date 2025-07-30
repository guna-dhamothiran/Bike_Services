import React from 'react';
import './CitiesModal.css';

const cities = [
  "Ahmedabad", "Bengaluru", "Bhopal", "Bhubaneswar", "Chandigarh", "Chennai", "Dehradun", "Delhi",
  "Faridabad", "Ghaziabad", "Greater Noida", "Gurugram", "Guwahati", "Hyderabad", "Indore", "Jaipur",
  "Kalyan", "Kolkata", "Lucknow", "Mumbai", "Mysore", "Nagpur", "Nashik", "Navi Mumbai", "Noida", "Pune",
  "Surat", "Thane", "Visakhapatnam"
];

const CitiesModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>🇮🇳 INDIA</h2>
        <div className="cities-grid">
          {cities.map((city, index) => (
            <span key={index} className="city-name">{city}</span>
          ))}
        </div>
        <button className="close-footer" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CitiesModal;
