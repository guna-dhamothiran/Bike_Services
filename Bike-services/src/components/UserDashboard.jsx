import React, { useState, useEffect } from 'react';
import { 
  FaMotorcycle, FaTools, FaClock, FaUser, 
  FaMapMarkerAlt, FaSignOutAlt, FaHome,
  FaCalendarAlt, FaClipboardList
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserDashboard.css';

const dummyUserBookings = [
  {
    id: 1,
    vehicleNo: 'TN 09 AB 1234',
    services: ['General Check-up', 'Oil Change'],
    pickup: true,
    pickupAddress: '123 Main Street, Chennai',
    notes: 'Please check the brake system',
    expectedDelivery: '2025-07-30',
    status: 'Pending',
    bookingDate: '2025-07-25',
    totalAmount: 2500
  },
  {
    id: 2,
    vehicleNo: 'TN 09 CD 5678',
    services: ['Water Wash', 'Chain Lubrication'],
    pickup: false,
    pickupAddress: '',
    notes: '',
    expectedDelivery: '2025-07-29',
    status: 'Ready for Delivery',
    bookingDate: '2025-07-26',
    totalAmount: 1500
  }
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || auth.role !== 'user') {
      navigate('/login');
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (auth?.role === 'user') {
      setLoading(true);
      setTimeout(() => {
        setBookings(dummyUserBookings);
        setLoading(false);
      }, 1000);
    }
  }, [auth]);

  const goToHome = () => navigate('/');
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'active') {
      return booking.status !== 'Completed';
    }
    return booking.status === 'Completed';
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'ready for delivery':
        return 'status-ready';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className="user-dashboard">
      <aside className="user-sidebar">
        <div className="sidebar-header">
          <div className="logo-section">
            <FaMotorcycle className="logo-icon" />
            <h1>BikeService</h1>
          </div>
          <div className="user-profile">
            <div className="avatar">
              <FaUser />
            </div>
            <div className="user-info">
              <h3>{auth?.email}</h3>
              <span className="role-badge">User</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h4 className="nav-title">MENU</h4>
            <button className="nav-item active">
              <FaClipboardList /> <span>My Bookings</span>
            </button>
            <button className="nav-item" onClick={goToHome}>
              <FaHome /> <span>Home</span>
            </button>
          </div>

          <div className="nav-section">
            <h4 className="nav-title">ACCOUNT</h4>
            <button className="nav-item" onClick={handleLogout}>
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </div>
        </nav>

        <div className="sidebar-footer">
          <p>BikeService Portal</p>
          <span className="version">v1.0.0</span>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="main-header">
          <h1>My Bookings</h1>
          <p className="header-subtitle">Track all your bike service bookings</p>
        </header>

        <div className="booking-tabs">
          <button 
            className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Bookings
          </button>
          <button 
            className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>

        <div className="bookings-container">
          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading your bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="empty-state">
              <FaClipboardList className="empty-icon" />
              <h3>No {activeTab} bookings found</h3>
              <p>Book a service to get started</p>
              <button className="book-now-btn" onClick={() => navigate('/booking')}>
                Book Now
              </button>
            </div>
          ) : (
            <div className="bookings-grid">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="vehicle-info">
                      <FaMotorcycle className="vehicle-icon" />
                      <h3>{booking.vehicleNo}</h3>
                    </div>
                    <span className={`status-badge ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="booking-details">
                    <div className="detail-row">
                      <FaCalendarAlt className="detail-icon" />
                      <div className="detail-content">
                        <label>Booking Date</label>
                        <span>{booking.bookingDate}</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <FaTools className="detail-icon" />
                      <div className="detail-content">
                        <label>Services</label>
                        <span>{booking.services.join(', ')}</span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <FaClock className="detail-icon" />
                      <div className="detail-content">
                        <label>Expected Delivery</label>
                        <span>{booking.expectedDelivery}</span>
                      </div>
                    </div>

                    {booking.pickup && (
                      <div className="detail-row">
                        <FaMapMarkerAlt className="detail-icon" />
                        <div className="detail-content">
                          <label>Pickup Address</label>
                          <span>{booking.pickupAddress}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {booking.notes && (
                    <div className="booking-notes">
                      <strong>Notes:</strong>
                      <p>{booking.notes}</p>
                    </div>
                  )}

                  <div className="booking-footer">
                    <div className="amount">
                      <label>Total Amount</label>
                      <span className="price">₹{booking.totalAmount}</span>
                    </div>
                    {booking.status === 'Ready for Delivery' && (
                      <button className="action-button">
                        Confirm Pickup
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
