import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🏍️</span>
          <span>BikeService</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
          <Link to="/admin/login" className={`nav-link ${location.pathname === '/admin/login' ? 'active' : ''}`}>Admin</Link>
          <Link to="/booking" className={`nav-link ${location.pathname === '/booking' ? 'active' : ''}`}>Booking</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
