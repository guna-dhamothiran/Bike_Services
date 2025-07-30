import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { auth } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleNewBooking = () => {
    navigate('/book');
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome Back</h1>
            <p className="user-email">{auth?.email}</p>
          </div>
          <button className="new-booking-btn" onClick={handleNewBooking}>
            <span className="icon">📅</span>
            <span className="text">New Booking</span>
          </button>
        </header>

        <section className="bookings-section">
          <div className="section-header">
            <h2>Your Bookings</h2>
            <div className="booking-stats">
              <span className="stat-item">
                Total Bookings: <strong>{bookings.length}</strong>
              </span>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No Bookings Found</h3>
              <p>You haven't made any bookings yet. Start by booking a service now!</p>
              <button className="book-now-btn" onClick={handleNewBooking}>
                <span className="icon">🚲</span>
                <span className="text">Book a Service Now</span>
              </button>
            </div>
          ) : (
            <div className="bookings-grid">
              {bookings.map((booking) => (
                <article key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="vehicle-info">
                      <span className="vehicle-icon">🚲</span>
                      <h3>Booking #{booking.id}</h3>
                    </div>
                    <span className={`status-badge status-${booking.status?.toLowerCase() || 'pending'}`}>
                      {booking.status || 'Pending'}
                    </span>
                  </div>
                  
                  <div className="booking-details">
                    <div className="detail-row">
                      <span className="detail-icon">�</span>
                      <div className="detail-content">
                        <label>Vehicle Number</label>
                        <span>{booking.vehicleNumber}</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <span className="detail-icon">📅</span>
                      <div className="detail-content">
                        <label>Booking Date</label>
                        <span>{new Date(booking.bookingDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <span className="detail-icon">🔧</span>
                      <div className="detail-content">
                        <label>Services</label>
                        <span>{booking.services?.join(', ') || 'No services selected'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-footer">
                    <div className="amount">
                      <label>Total Amount</label>
                      <span className="price">₹{booking.amount || '0'}</span>
                    </div>
                    <button className="action-button">
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
