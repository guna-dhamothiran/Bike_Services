import React, { useEffect, useState, useCallback } from 'react';
import './AdminDashboard.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [search, setSearch] = useState('');
  const [modalBooking, setModalBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    status: '',
    serviceType: '',
    startDate: '',
    endDate: ''
  });

  const fetchBookings = useCallback(async () => {
    const query = new URLSearchParams(filter).toString();
    try {
      const res = await fetch(`http://localhost:8080/api/booking?${query}`);
      const data = await res.json();
      setBookings(Array.isArray(data.bookings) ? data.bookings : data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    }
  }, [filter]);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8080/api/booking/analytics');
      
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
    fetchAnalytics();
  }, [fetchBookings, fetchAnalytics]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAction = async (bookingId, action) => {
    try {
      const res = await fetch(`http://localhost:8080/api/booking/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId }),
      });
      const result = await res.json();
      alert(result.message || 'Status updated');
      fetchBookings();
    } catch (err) {
      alert('Error processing the action');
      console.error(err);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/booking/${bookingId}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      alert(result.message);
      fetchBookings();
    } catch (err) {
      alert('Error deleting the booking');
      console.error(err);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/booking/export');
      const csv = await res.text();
      const blob = new Blob([csv], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'bookings.csv';
      link.click();
    } catch (err) {
      console.error('Error exporting CSV:', err);
    }
  };

  const filteredBookings = Array.isArray(bookings)
    ? bookings.filter((b) =>
        b.vehicleNumber?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBookings.length / bookingsPerPage); i++) {
    pageNumbers.push(i);
  }

  const COLORS = ['#38A169', '#ED8936', '#E53E3E'];

  return (
    <div className="adminDashboard">
      <div className="dashboard-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2>Admin Dashboard</h2>
        <button 
          className="logout-btn" 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            window.location.href = '/admin/login';
          }}
        >
          Logout
        </button>
      </div>

      <div className="dashboardOverview">
        <div className="dashboardCard">
          <h3>Filter Bookings</h3>
          <div className="filterForm">
            <select name="status" value={filter.status} onChange={handleFilterChange}>
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
            </select>
            <select name="serviceType" value={filter.serviceType} onChange={handleFilterChange}>
              <option value="">Select a service</option>
              <option value="General Service">General Service</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Water Wash">Water Wash</option>
              <option value="Brake Inspection">Brake Inspection</option>
            </select>
            <input type="date" name="startDate" value={filter.startDate} onChange={handleFilterChange} />
            <input type="date" name="endDate" value={filter.endDate} onChange={handleFilterChange} />
            <button onClick={fetchBookings}>Apply Filters</button>
          </div>
        </div>

        <div className="dashboardCard analytics">
          <h3>Analytics Overview</h3>
          <p>
            <span>
              <span className="stat-icon">📊</span>
              Total Bookings
            </span>
            <span className="stat-value">{analytics.total || 0}</span>
          </p>
          <p>
            <span>
              <span className="stat-icon">⏳</span>
              Pending
            </span>
            <span className="stat-value pending">{analytics.pending || 0}</span>
          </p>
          <p>
            <span>
              <span className="stat-icon">✅</span>
              Confirmed
            </span>
            <span className="stat-value confirmed">{analytics.confirmed || 0}</span>
          </p>
          <p>
            <span>
              <span className="stat-icon">❌</span>
              Rejected
            </span>
            <span className="stat-value rejected">{analytics.rejected || 0}</span>
          </p>
        </div>

        <div className="dashboardCard">
          <h3>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={[
                  { name: 'Confirmed', value: analytics.confirmed || 0 },
                  { name: 'Pending', value: analytics.pending || 0 },
                  { name: 'Rejected', value: analytics.rejected || 0 },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} Bookings`, name]} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="chart-legend">
            {['Confirmed', 'Pending', 'Rejected'].map((status, index) => (
              <div key={status} className="legend-item">
                <span style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '3px', 
                  background: COLORS[index],
                  display: 'inline-block' 
                }}></span>
                {status}
              </div>
            ))}
          </div>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by vehicle number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />

      <table className="dashboardTable">
        <thead>
          <tr>
            <th>Vehicle No</th>
            <th>E-Mail</th>
            <th>Service(s)</th>
            <th>Delivery Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((b) => (
            <tr key={b._id} onClick={() => setModalBooking(b)}>
              <td>{b.vehicleNumber}</td>
              <td>{b.email}</td>
              <td>{(b.selectedServices || []).join(', ')}</td>
              <td>{new Date(b.expectedDeliveryTime).toLocaleDateString()}</td>
              <td>
                <span className={`statusTag ${b.status}`}>{b.status}</span>
              </td>
              <td>
                {b.status === 'pending' && (
                  <>
                    <button className="confirmBtn" onClick={(e) => { e.stopPropagation(); handleAction(b._id, 'confirmed'); }}>
                      Confirm
                    </button>
                    <button className="rejectBtn" onClick={(e) => { e.stopPropagation(); handleAction(b._id, 'rejected'); }}>
                      Reject
                    </button>
                  </>
                )}
                <button className="deleteBtn" onClick={(e) => { e.stopPropagation(); handleDelete(b._id); }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pageBtn ${currentPage === number ? 'active' : ''}`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <button className="confirmBtn" onClick={handleExportCSV}>Export CSV</button>

      {modalBooking && (
        <div className="modalOverlay" onClick={() => setModalBooking(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h3>Booking Details</h3>
            <p><strong>Vehicle No:</strong> {modalBooking.vehicleNumber}</p>
            <p><strong>Services:</strong> {(modalBooking.selectedServices || []).join(', ')}</p>
            <p><strong>Delivery Time:</strong> {new Date(modalBooking.expectedDeliveryTime).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {modalBooking.status}</p>
            <p><strong>Total:</strong> ₹{modalBooking.totalAmount}</p>
            {modalBooking.customerNote && <p><strong>Note:</strong> {modalBooking.customerNote}</p>}
            {modalBooking.pickupDropRequested && <p><strong>Pickup Address:</strong> {modalBooking.pickupAddress || 'N/A'}</p>}
            <button onClick={() => setModalBooking(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
