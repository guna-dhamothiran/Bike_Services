import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ServicesNew.css';

const services = [
  {
    id: 1,
    title: 'General Check-up',
    desc: 'Comprehensive inspection of your bike including fluids, brakes, battery, and all vital components.',
    price: 300,
    duration: '1 hour',
    features: [
      'Multi-point inspection',
      'Brake system check',
      'Battery health test',
      'Fluid levels inspection',
      'Tire pressure check'
    ],
    img: 'https://img.freepik.com/free-vector/flat-repair-motorcycle-composition-with-father-biker-his-son-garage_1284-19396.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: 2,
    title: 'Oil Change',
    desc: 'Premium quality engine oil change service with top-grade lubricants for optimal performance.',
    price: 150,
    duration: '30 mins',
    features: [
      'Premium synthetic oil',
      'Oil filter replacement',
      'Drain plug inspection',
      'Lubrication check',
      'Disposal of old oil'
    ],
    img: 'https://img.freepik.com/free-vector/oil-change-service-design_1300-131.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: 3,
    title: 'Water Wash',
    desc: 'Professional bike washing service using high-pressure equipment and premium cleaning products.',
    price: 100,
    duration: '45 mins',
    features: [
      'High-pressure washing',
      'Chain cleaning',
      'Polish application',
      'Detailed cleaning',
      'Paint protection'
    ],
    img: 'https://png.pngtree.com/png-clipart/20241020/original/pngtree-motor-cycle-wash-yellow-sport-bike-cartoon-blue-png-image_16419111.png',
  },
  {
    id: 4,
    title: 'Full Service',
    desc: 'Complete bike maintenance package including all essential services for peak performance.',
    price: 800,
    duration: '3 hours',
    features: [
      'Complete inspection',
      'Oil change',
      'Filter replacement',
      'Chain servicing',
      'Brake adjustment'
    ],
    img: 'https://static.vecteezy.com/system/resources/previews/049/489/355/non_2x/a-man-is-working-on-a-motorcycle-vector.jpg',
  },
    {
    id: 4,
    title: 'Brack Ins',
    desc: 'Ensure peak bike performance with a full, detailed brake inspection and essential periodic maintenance.',
    price: 120,
    duration: '30 mins',
    features: [
      'Complete inspection',
      'Oil change',
      'Filter replacement',
      'Chain servicing',
      'Brake adjustment'
    ],
    img: 'https://cdni.iconscout.com/illustration/premium/thumb/indian-mechanic-repairing-motorcycle-2660501-2227264.png?f=webp',
  }
];

const Services = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleBookClick = (service) => {
  navigate('/booking', { 
    state: { 
      service: service.title,
      price: service.price,
      duration: service.duration
    } 
  });
};


  const filteredServices = filter === 'all' 
    ? services
    : services.filter(service => {
        if (filter === 'quick') return service.duration.includes('30') || service.duration.includes('45');
        if (filter === 'full') return service.duration.includes('hour');
        return true;
      });

  return (
    <div className="services-page">
      <div className="services-hero">
        <button 
          className="home-button"
          onClick={() => navigate('/')}
        >
          <span className="button-icon">←</span>
          <span>Back to Home</span>
        </button>
        <h1>Expert Bike Services</h1>
        <p>Professional bike care services delivered by certified mechanics</p>
      </div>

      <div className="services-container">
        <div className="services-header">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Services
            </button>
            <button 
              className={`filter-btn ${filter === 'quick' ? 'active' : ''}`}
              onClick={() => setFilter('quick')}
            >
              Quick Services
            </button>
            <button 
              className={`filter-btn ${filter === 'full' ? 'active' : ''}`}
              onClick={() => setFilter('full')}
            >
              Full Services
            </button>
          </div>
        </div>

        <div className="services-grid">
          {filteredServices.map((service) => (
            <div 
              className="service-card" 
              key={service.id}
              onMouseEnter={() => setSelectedService(service.id)}
              onMouseLeave={() => setSelectedService(null)}
            >
              <div className="service-card-image">
                <img src={service.img} alt={service.title} />
                {selectedService === service.id && (
                  <div className="service-card-overlay">
                    <ul className="feature-list">
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="service-card-content">
                <h3>{service.title}</h3>
                <p className="service-description">{service.desc}</p>
                
                <div className="service-details">
                  <div className="price-tag">
                    <span className="service-price">{service.price}</span>
                  </div>
                  <span className="service-duration">{service.duration}</span>
                </div>

                <div className="service-benefits">
                  <div className="benefit">
                    <span className="benefit-icon">🛡️</span>
                    <span>Expert Service</span>
                  </div>
                  <div className="benefit">
                    <span className="benefit-icon">⚡</span>
                    <span>Quick Turnaround</span>
                  </div>
                </div>

                <button 
                  className="book-service-btn"
                  onClick={() => handleBookClick(service)}
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="services-cta">
        <h2>Need a Custom Service Package?</h2>
        <p>Our expert team can create a maintenance package tailored to your bike's specific needs</p>
        <div className="cta-benefits">
          <div className="cta-benefit">
            <span className="benefit-icon">✓</span>
            <span>Personalized Care</span>
          </div>
          <div className="cta-benefit">
            <span className="benefit-icon">✓</span>
            <span>Flexible Scheduling</span>
          </div>
          <div className="cta-benefit">
            <span className="benefit-icon">✓</span>
            <span>Custom Pricing</span>
          </div>
        </div>
        {/* <button 
          className="contact-btn"
          onClick={() => navigate('/contact')}
        >
          Contact Us
        </button> */}
      </div>
    </div>
  );
};

export default Services;
