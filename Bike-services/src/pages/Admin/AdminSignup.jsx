import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSignup.css';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          adminCode: formData.adminCode
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Signup successful!');
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      setMessage('Error during signup');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="adminLogin">
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Back
      </button>
      <div className="loginContainer">
        <div className="loginLeft">
          <div className="imageSection">
            <h1>Admin Registration</h1>
            <p>Create your admin account to manage bike service bookings and user requests.</p>
          </div>
        </div>

        <div className="loginRight">
          <form className="adminLoginForm" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            
            {message && (
              <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="inputGroup">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="inputField"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="inputGroup">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="inputField"
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="inputGroup">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="inputField"
                required
                placeholder="Create a password"
              />
            </div>

            <div className="inputGroup">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="inputField"
                required
                placeholder="Confirm your password"
              />
            </div>

            <div className="inputGroup">
              <label>Admin Code</label>
              <input
                type="password"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleChange}
                className="inputField"
                required
                placeholder="Enter admin access code"
              />
            </div>

            <button type="submit" className="submitButton">
              Create Account
            </button>

            <div className="formFooter">
              <p>Already have an account?</p>
              <button
                type="button"
                className="redirectButton"
                onClick={() => navigate('/admin/login')}
              >
                Login Instead
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
