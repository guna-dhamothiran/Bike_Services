import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CitiesModal from './CitiesModal';
import Header from '../components/Header';
import './HomeNew.css';

const featuredServices = [
  {
    id: 1,
    title: 'General Service Check-up',
    desc: 'Comprehensive inspection and maintenance to keep your bike in top condition.',
    price: 300,
    time: '1 hour',
    features: ['Multi-point inspection', 'Fluid check', 'Brake inspection'],
    img: 'https://img.freepik.com/free-vector/flat-repair-motorcycle-composition-with-father-biker-his-son-garage_1284-19396.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: 2,
    title: 'Premium Oil Change',
    desc: 'High-quality oil change service using manufacturer-recommended lubricants.',
    price: 150,
    time: '30 mins',
    features: ['Synthetic oil', 'Oil filter change', 'Performance check'],
    img: 'https://img.freepik.com/free-vector/oil-change-service-design_1300-131.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: 3,
    title: 'Professional Wash',
    desc: 'Thorough cleaning and detailing to make your bike shine like new.',
    price: 100,
    time: '45 mins',
    features: ['High-pressure wash', 'Detailing', 'Wax coating'],
    img: 'https://png.pngtree.com/png-clipart/20241020/original/pngtree-motor-cycle-wash-yellow-sport-bike-cartoon-blue-png-image_16419111.png',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'GUNA D',
    comment: 'Excellent service! My bike runs like new after the general service.',
    rating: 5,
    
  },
  {
    id: 2,
    name: 'Sathiya',
    comment: 'Very professional team and quick service. Highly recommended!',
    rating: 5,
  
  },
  {
    id: 3,
    name: 'Suresh',
    comment: 'Great experience with their premium wash service. Will come back!',
    rating: 4,
  
  },
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home-page">
      <Header />
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight">Expert</span> Bike Care
            <br />at Your Service
          </h1>
          <p className="hero-description">
            Professional maintenance and repair services to keep your ride in perfect condition.
            Experience the best bike care with our certified mechanics.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Expert Mechanics</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Service Centers</span>
            </div>
          </div>
          <div className="hero-buttons">
            <Link to="/services" className="primary-button">
              <span>Explore Services</span>
              <span className="button-icon">→</span>
            </Link>
            <button 
              className="secondary-button"
              onClick={() => setShowModal(true)}
            >
              <span className="button-icon">📍</span>
              <span>Find Nearby Location</span>
            </button>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <div className="hero-image-container">
            <img
              src="https://media.istockphoto.com/id/1216086843/vector/vector-character-mechanic-repairs-motorcycle.jpg?s=612x612&w=0&k=20&c=xNFFXUT5pmfYJ21_j13VmQQSpca-8RTBsAUfPk6QTq4="
              alt="Professional bike service"
              className="hero-image"
            />
            <div className="hero-badges">
              <div className="badge">
                <span className="badge-icon">⭐</span>
                <span className="badge-text">4.9/5 Rating</span>
              </div>
              <div className="badge">
                <span className="badge-icon">🏆</span>
                <span className="badge-text">Top Rated Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-services">
        <div className="section-header">
          <span className="section-badge">Popular Services</span>
          <h2>Our Premium Services</h2>
          <p>Choose from our range of professional bike care services tailored to your needs</p>
        </div>

        <div className="services-grid">
          {featuredServices.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-image">
                <img src={service.img} alt={service.title} />
                <span className="service-time-badge">
                  <span className="icon">⏱️</span>
                  {service.time}
                </span>
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p className="service-description">{service.desc}</p>
                <div className="service-details">
                  <div className="price-tag">
                    <span className="currency">₹</span>
                    <span className="amount">{service.price}</span>
                    <span className="period">/service</span>
                  </div>
                </div>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/services" 
                  className="service-button"
                >
                  <span>Book Now</span>
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <Link to="/services" className="service-button">
            <span>View All Services</span>
            <span className="button-icon">→</span>
          </Link>
        </div>
      </section>

      <section className="why-choose-us">
        <div className="section-header">
          <span className="section-badge">Our Strengths</span>
          <h2>Why Choose Us?</h2>
          <p>Experience the difference with our premium bike care services</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🛠️</span>
            </div>
            <h3>Expert Mechanics</h3>
            <p>Certified professionals with 10+ years of experience in handling all bike brands</p>
            <ul className="feature-list">
              <li>Certified technicians</li>
              <li>Continuous training</li>
              <li>Brand specialists</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⚡</span>
            </div>
            <h3>Quick Service</h3>
            <p>Fast and efficient service with guaranteed completion times</p>
            <ul className="feature-list">
              <li>Express service</li>
              <li>Real-time updates</li>
              <li>On-time delivery</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">💰</span>
            </div>
            <h3>Best Prices</h3>
            <p>Transparent pricing with no hidden charges and best value for money</p>
            <ul className="feature-list">
              <li>Competitive rates</li>
              <li>No hidden fees</li>
              <li>Package deals</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🔧</span>
            </div>
            <h3>Quality Parts</h3>
            <p>Only genuine spare parts and premium quality accessories</p>
            <ul className="feature-list">
              <li>OEM parts</li>
              <li>Warranty covered</li>
              <li>Quality assured</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied customers who trust us with their bikes</p>
        </div>

        <div className="testimonials-carousel">
          <button className="carousel-btn prev" onClick={handlePrevTestimonial}>
            <span className="arrow">←</span>
          </button>
          
          <div className="testimonials-wrapper">
            <div className="testimonials-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div className="testimonial-card" key={testimonial.id}>
                  <div className="testimonial-content">
                    <div className="quote-icon">❝</div>
                    <p className="testimonial-text">{testimonial.comment}</p>
                    <div className="rating">
                      {'★'.repeat(testimonial.rating)}
                      {'☆'.repeat(5 - testimonial.rating)}
                    </div>
                  </div>
                  <div className="testimonial-footer">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="testimonial-image"
                    />
                    <div className="testimonial-info">
                      <h4>{testimonial.name}</h4>
                      <span className="testimonial-subtitle">Verified Customer</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next" onClick={handleNextTestimonial}>
            <span className="arrow">→</span>
          </button>

          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="section-header">
          <span className="section-badge">Our Impact</span>
          <h2>Growing Stronger Every Day</h2>
          <p>Numbers that speak for our commitment to excellence</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-number" data-target="98">98%</div>
            <div className="stat-label">Customer Satisfaction</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔧</div>
            <div className="stat-number" data-target="15000">15,000+</div>
            <div className="stat-label">Services Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📍</div>
            <div className="stat-number" data-target="25">25+</div>
            <div className="stat-label">Service Centers</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number" data-target="4.9">4.9/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <div className="cta-content">
            <span className="section-badge">Get Started</span>
            <h2>Ready to Experience Premium Bike Care?</h2>
            <p>Book your service now and join thousands of satisfied customers</p>
            
            <div className="cta-features">
              <div className="cta-feature">
                <span className="feature-icon">✓</span>
                <span>Same Day Service</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">✓</span>
                <span>Free Pickup & Drop</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">✓</span>
                <span>Expert Mechanics</span>
              </div>
            </div>

            <div className="cta-buttons">
              <Link to="/booking" className="cta-button primary">
                <span>Book Now</span>
                <span className="button-icon">→</span>
              </Link>
              <Link to="/services" className="cta-button secondary">
                <span>View Services</span>
              </Link>
            </div>
          </div>
          
          <div className="cta-image">
            <img src="https://media.istockphoto.com/id/1455865019/vector/skull-biker-riding-the-vintage-motorcycle.jpg?s=612x612&w=0&k=20&c=2s1_hElohgN9W9mHy3Y3MdQe7MC3r3tPfpq7UIeCEdo=" alt="Professional bike mechanic" />
            <div className="trust-badge">
              <span className="badge-icon">🛡️</span>
              <div className="badge-content">
                <strong>100% Satisfaction</strong>
                <span>Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && <CitiesModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;
