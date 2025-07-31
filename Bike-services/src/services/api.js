import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8080"; 

const checkServerAvailability = async () => {
  try {
    // Try to hit the root endpoint of your API
    await axios.get(`${API_BASE_URL}/api/user/health`);
    console.log("Server is available");
    return true;
  } catch (error) {
    console.error("Server health check failed:", {
      message: error.message,
      code: error.code,
      url: `${API_BASE_URL}/api/user/health`
    });
    
    // If health endpoint fails, try root endpoint as fallback
    try {
      await axios.get(API_BASE_URL);
      console.log("Server is available (root endpoint)");
      return true;
    } catch (rootError) {
      console.error("Server completely unavailable");
      return false;
    }
  }
};
// Auth state management with cookies
// const getStoredUser = () => {
//   const userStr = document.cookie.split('; ').find(row => row.startsWith('user='));
//   return userStr ? JSON.parse(decodeURIComponent(userStr.split('=')[1])) : null;
// };
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const setStoredUser = (user) => {
  const secure = window.location.protocol === 'https:';
  document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; ${secure ? 'secure;' : ''} samesite=strict; max-age=86400`; // 24 hours
};

const removeStoredUser = () => {
  document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Credentials": "true"
  },
});

// Add auth token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    // Ensure CORS headers are present
    config.headers["Access-Control-Allow-Credentials"] = "true";
  }
  return config;
});

// CSRF token handling for non-GET requests
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = document.cookie.split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  if (csrfToken && config.method !== 'get') {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  }
  return config;
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request being sent:", {
      url: config.url,
      method: config.method,
      data: config.data,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.data);
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Log the full error response for debugging
      console.error("Server Error Response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      // Preserve the original error response data and status
      const enhancedError = new Error(
        error.response.data?.message ||
        error.response.data?.error ||
        "Server error occurred"
      );
      enhancedError.response = error.response;
      throw enhancedError;
    } else if (error.request) {
      console.error("Network Error:", error.request);
      throw new Error(
        "Unable to reach the server. Please check your connection."
      );
    } else {
      console.error("Request Setup Error:", error.message);
      throw new Error("Error setting up the request. Please try again.");
    }
  }
);

// Helper function to check server availability
// (Removed duplicate declaration of checkServerAvailability)

export const authApi = {
  login: async (credentials) => {
    try {
      // Prepare login data
      const loginData = {
        email: credentials.email,
        password: credentials.password,
      };

      console.log('Attempting login with:', { ...loginData, password: '[HIDDEN]' });
      
      const response = await axiosInstance.post('/api/user/signin', loginData);
      
      // Extract user data from the response
      const userData = {
        email: response.user.email,
        role: response.user.role || 'user',
        token: response.token
      };
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      if (error.response?.status === 404) {
        throw new Error('Server error: Login endpoint not found. Please check if the backend server is running.');
      }
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  },

  logout: async () => {
    try {
      // Call backend to invalidate session
      await axiosInstance.post('/api/user/signout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeStoredUser();
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/api/user/current');
      return {
        email: response.email,
        role: response.role || 'user'
      };
    } catch (error) {
      console.error('Get current user error:', error);
      throw new Error('Session expired. Please login again.');
    }
  },
};

export const getStoredUser = () => {
  const cookies = document.cookie.split('; ');
  const userCookie = cookies.find(cookie => cookie.startsWith('user='));

  if (userCookie) {
    const rawValue = decodeURIComponent(userCookie.split('=')[1]);

    // ✅ Prevent parsing invalid string like "undefined"
    if (rawValue === 'undefined' || !rawValue) return null;

    try {
      return JSON.parse(rawValue);
    } catch (err) {
      console.error('Error parsing user from cookie:', err);
      return null;
    }
  }

  return null; // No cookie found
};




export const userApi = {
  signup: async (userData) => {
    try {
      console.log('Starting signup process with data:', userData);
      
      // Check server availability first
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        console.error('Server availability check failed');
        throw new Error(
          "Server is currently unavailable. Please check if the backend server is running on http://localhost:8080"
        );
      }

      // Validate all required fields
      const requiredFields = ['name', 'email', 'phone', 'password'];
      const missingFields = requiredFields.filter(field => !userData[field]);
      
      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        throw new Error(`All fields are required. Missing: ${missingFields.join(', ')}`);
      }

      // Using the data directly as it's already in the correct format
      const signupData = {
        name: userData.name,
        email: userData.email,
        phoneNo: userData.phone,
        password: userData.password,
      };

      console.log("Attempting signup with data:", {
        ...signupData,
        password: "[HIDDEN]",
      });

      const response = await axiosInstance.post("/api/user/signup", signupData);

      if (response?.token) {
        // If server returns a token, you might want to store it
        localStorage.setItem("authToken", response.token);
      }

      return response;
    } catch (error) {
      console.error("Signup error details:", error);
      
      // If it's a response from our server
      if (error.response) {
        if (error.response.status === 409) {
          throw new Error("Email already registered. Please use a different email.");
        } else if (error.response.status === 400) {
          const message = error.response.data?.message || "Please check your information and try again.";
          throw new Error(message);
        }
      }
      
      // For network or other errors
      throw new Error(error.message || "Unable to create account. Please try again later.");
    }
  },
};
