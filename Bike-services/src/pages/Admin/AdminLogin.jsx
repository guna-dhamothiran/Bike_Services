// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/admin/login', {
//         email,
//         password
//       });
//       if (res.data.success) {
//         alert('Login successful');
//         window.location.href = '/admin/dashboard'; // or use: navigate('/admin/dashboard');
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError('Invalid credentials or server error.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
//         {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}
        
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2"
//         >
//           Login
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate('/admin/signup')}
//           className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
//         >
//           Go to Signup
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/admin/login', {
        email,
        password
      });
      if (res.data.success) {
        alert('Login successful');
        window.location.href = '/admin/dashboard'; // or use: navigate('/admin/dashboard');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Invalid credentials or server error.');
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
            <h1>Welcome to<br />Bike Service Admin</h1>
            <p>Manage your bike service operations efficiently</p>
          </div>
        </div>
        
        <div className="loginRight">
          <form onSubmit={handleLogin} className="adminLoginForm">
            <h2>Admin Login</h2>
            {error && <div className="message error">{error}</div>}
            
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="inputField"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="inputField"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submitButton"
            >
              Login
            </button>

            {/* <div className="formFooter">
              <p>Don't have an account?</p>
              <button
                type="button"
                onClick={() => navigate('/admin/signup')}
                className="redirectButton"
              >
                Sign Up
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
