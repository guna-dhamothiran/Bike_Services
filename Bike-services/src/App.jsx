import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';

import OwnerDashboard from './pages/OwnerDashboard';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';
import InteriorDesignBooking from './pages/Booking/Booking.jsx';
import AdminLogin from './pages/Admin/AdminLogin.jsx';
import AdminSignup from './pages/Admin/AdminSignup.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<InteriorDesignBooking />} />
        <Route path="/owner-dashboard" element={<ProtectedRoute role="owner"><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
