import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaMotorcycle, FaTools, FaCheckCircle, FaClock, 
  FaHome, FaSignOutAlt, FaCalendarAlt, FaUser, FaMapMarkerAlt, 
  FaPhoneAlt, FaBell, FaChartLine, FaFilter, FaDownload
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './OwnerDashboard.css';

const dummyBookings = [
  {
    id: 1,
    customer: 'Arun Sharma',
    email: 'arun@example.com',
    vehicleNo: 'TN 09 AB 1234',
    services: ['General Check-up', 'Oil Change'],
    pickup: true,
    pickupAddress: '123 Main Street, Chennai',
    notes: 'Please focus on brake issue',
    expectedDelivery: '2025-07-30',
    status: 'Pending',
    bookingDate: '2025-07-25',
  },
  {
    id: 2,
    customer: 'Divya Menon',
    email: 'divya@example.com',
    vehicleNo: 'KA 05 ZZ 9087',
    services: ['Water Wash'],
    pickup: false,
    pickupAddress: '',
    notes: '',
    expectedDelivery: '2025-07-28',
    status: 'Ready for Delivery',
    bookingDate: '2025-07-26',
  },
];

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || auth.role !== 'owner') {
      navigate('/login');
    }
  }, [auth, navigate]);

  const goToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (auth?.role === 'owner') {
      setLoading(true);
      setTimeout(() => {
        setBookings(dummyBookings);
        setLoading(false);
      }, 1000);
    }
  }, [auth]);

  const handleStatusChange = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status:
                b.status === 'Pending'
                  ? 'Ready for Delivery'
                  : b.status === 'Ready for Delivery'
                  ? 'Completed'
                  : b.status,
            }
          : b
      )
    );
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = 
      filter === 'all' ||
      booking.status.toLowerCase() === filter;

    const matchesSearch = 
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = 
      !dateFilter || 
      booking.bookingDate === dateFilter;

    return matchesFilter && matchesSearch && matchesDate;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    ready: bookings.filter(b => b.status === 'Ready for Delivery').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    revenue: bookings.reduce((sum, booking) => sum + (booking.status === 'Completed' ? 1000 : 0), 0)
  };

  const handleExportData = () => {
    console.log('Exporting booking data...');
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="logo-section">
            <FaMotorcycle className="logo-icon" />
            <h1>BikeService</h1>
          </div>
          <div className="user-section">
            <div className="user-avatar">
              <FaUser className="avatar-icon" />
            </div>
            <div className="user-info">
              <h3>{auth?.email}</h3>
              <span className="role-badge">Owner</span>
            </div>
          </div>
        </div>
          
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h4 className="nav-title">MAIN MENU</h4>
            <button className="nav-item active">
              <FaChartLine /> <span>Dashboard</span>
            </button>
            <button className="nav-item" onClick={goToHome}>
              <FaHome /> <span>Home Page</span>
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
          <p>BikeService Dashboard</p>
          <span className="version">v1.0.0</span>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="main-header">
          <div className="header-content">
            <div className="header-left">
              <h1>Service Management</h1>
              <p className="header-subtitle">Welcome back! Here's what's happening with your service center</p>
            </div>
            <div className="header-actions">
              <button className="notification-button">
                <FaBell />
                <span className="notification-badge">3</span>
              </button>
              <button className="theme-toggle">
                <FaUser />
              </button>
            </div>
          </div>
        </header>
      
      <div className="main-content">
        <div className="top-cards">
          <div className="stat-card total">
            <div className="stat-icon">
              <FaMotorcycle />
            </div>
            <div className="stat-info">
              <h3>Total Bookings</h3>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-desc">All time bookings</div>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>Pending</h3>
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-desc">Awaiting service</div>
            </div>
          </div>
          <div className="stat-card ready">
            <div className="stat-icon">
              <FaTools />
            </div>
            <div className="stat-info">
              <h3>Ready for Delivery</h3>
              <div className="stat-value">{stats.ready}</div>
              <div className="stat-desc">Completed services</div>
            </div>
          </div>
          <div className="stat-card revenue">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <h3>Revenue</h3>
              <div className="stat-value">₹{stats.revenue.toLocaleString()}</div>
              <div className="stat-desc">Total earnings</div>
            </div>
          </div>
        </div>

        <div className="bookings-section">
          <div className="section-header">
            <div className="header-filters">
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="date-filter">
                <FaCalendarAlt className="calendar-icon" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="header-actions">
              <div className="status-filters">
                <button
                  className={`status-pill ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  className={`status-pill ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
                <button
                  className={`status-pill ${filter === 'ready for delivery' ? 'active' : ''}`}
                  onClick={() => setFilter('ready for delivery')}
                >
                  Ready
                </button>
                <button
                  className={`status-pill ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>
              <button className="export-button" onClick={handleExportData}>
                <FaDownload /> Export
              </button>
            </div>
          </div>

          <div className="bookings-content">
            {loading ? (
              <div className="loading-state">
                <div className="loader"></div>
                <p>Loading bookings...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaMotorcycle />
                </div>
                <p>No bookings found matching your criteria.</p>
              </div>
            ) : (
              <div className="bookings-grid">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <h3>{booking.customer}</h3>
                      <span className={`status-badge ${booking.status.toLowerCase().replace(' ', '-')}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="booking-details">
                      <div className="detail-row">
                        <FaCalendarAlt />
                        <span><strong>Booking Date:</strong> {booking.bookingDate}</span>
                      </div>
                      <div className="detail-row">
                        <FaUser />
                        <span><strong>Email:</strong> {booking.email}</span>
                      </div>
                      <div className="detail-row">
                        <FaMotorcycle />
                        <span><strong>Vehicle No:</strong> {booking.vehicleNo}</span>
                      </div>
                      <div className="detail-row">
                        <FaTools />
                        <span><strong>Services:</strong> {booking.services.join(', ')}</span>
                      </div>
                      {booking.pickup && (
                        <div className="detail-row">
                          <FaMapMarkerAlt />
                          <span><strong>Pickup Address:</strong> {booking.pickupAddress}</span>
                        </div>
                      )}
                      <div className="detail-row">
                        <FaClock />
                        <span><strong>Expected Delivery:</strong> {booking.expectedDelivery}</span>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="booking-notes">
                        <p><strong>Notes:</strong> {booking.notes}</p>
                      </div>
                    )}

                    {booking.status !== 'Completed' && (
                      <button 
                        className="action-button"
                        onClick={() => handleStatusChange(booking.id)}
                      >
                        Mark as {booking.status === 'Pending' ? 'Ready for Delivery' : 'Completed'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  </div>
  );
};

export default OwnerDashboard;
