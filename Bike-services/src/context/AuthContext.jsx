import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('userData');

      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setAuth({
            email: userData.email,
            role: userData.role,
            token
          });

          await axios.get('http://localhost:8080/api/auth/current-user', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
        } catch (err) {
          console.error('Session invalid or expired:', err);
          logout(); 
        }
      }

      setLoading(false);
    };

    validateAuth();
  }, []);

  const login = (data) => {
    const { token, user } = data;

    if (!token || !user) {
      console.error("Invalid login response", data);
      return;
    }

    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify({ email: user.email, role: user.role }));

    setAuth({ email: user.email, role: user.role, token });
    setLoading(false);
  };

  const logout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setAuth(null);
    setLoading(false);

    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        isAuthenticated: !!auth,
        isLoading: loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
