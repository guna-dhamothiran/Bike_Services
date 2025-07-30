import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';
import './ServiceCard.css';

const ServiceCard = ({ 
  id, 
  title, 
  description, 
  image, 
  price, 
  duration, 
  features = [], 
  addOns = [] 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleBook = () => {
    if (!auth) {
      navigate('/login', { state: { from: '/services' } });
    } else {
      navigate('/book', { 
        state: { 
          serviceId: id,
          title,
          price,
          duration
        } 
      });
    }
  };

  return (
    <div 
      className={`service-card ${showDetails ? 'expanded' : ''}`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="service-card-image">
        <img src={image} alt={title} />
        {showDetails && (
          <div className="service-card-overlay">
            <ul className="feature-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="service-card-content">
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
        
        <div className="service-details">
          <div className="price-duration">
            <span className="service-price">₹{price}</span>
            {duration && <span className="service-duration">{duration}</span>}
          </div>

          {addOns.length > 0 && (
            <div className="service-addons">
              <h4>Available Add-ons:</h4>
              <ul>
                {addOns.map((addon, index) => (
                  <li key={index}>
                    {addon.name} - ₹{addon.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button 
          className="book-button"
          onClick={handleBook}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  duration: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  addOns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  )
};

export default ServiceCard;
