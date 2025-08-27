# API Integration Guide

This document provides detailed information about how the Shootic Frontend integrates with the backend API.

## Overview

The frontend uses a centralized API service layer built with Axios to communicate with the backend. This provides:
- Consistent error handling
- Automatic token management
- Request/response interceptors
- Type-safe API calls

## API Service Structure

### Base Configuration (`src/services/api.js`)

```javascript
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
```

## API Modules

### 1. Booking API

```javascript
export const bookingAPI = {
  // Create a new booking
  create: async (bookingData) => {
    return api.post('/bookings', bookingData);
  },

  // Get all bookings (admin only)
  getAll: async (params = {}) => {
    return api.get('/bookings', { params });
  },

  // Get booking by ID
  getById: async (id) => {
    return api.get(`/bookings/${id}`);
  },

  // Update booking status (admin only)
  updateStatus: async (id, status) => {
    return api.put(`/admin/bookings/${id}/status`, { status });
  }
};
```

### 2. Contact API

```javascript
export const contactAPI = {
  // Submit contact form
  submit: async (contactData) => {
    return api.post('/contact', contactData);
  },

  // Get all contacts (admin only)
  getAll: async (params = {}) => {
    return api.get('/contact', { params });
  },

  // Update contact status (admin only)
  updateStatus: async (id, status) => {
    return api.put(`/admin/contacts/${id}/status`, { status });
  }
};
```

### 3. Admin API

```javascript
export const adminAPI = {
  // Admin login
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  // Admin logout
  logout: async () => {
    return api.post('/auth/logout');
  },

  // Get admin profile
  getProfile: async () => {
    return api.get('/auth/me');
  },

  // Get dashboard data
  getDashboard: async () => {
    return api.get('/admin/dashboard');
  },

  // Get bookings with admin filters
  getBookings: async (params = {}) => {
    return api.get('/admin/bookings', { params });
  },

  // Get contacts with admin filters
  getContacts: async (params = {}) => {
    return api.get('/admin/contacts', { params });
  }
};
```

## Usage Examples

### 1. Booking Form Submission

```javascript
import { bookingAPI } from '../services/api';
import { toast } from 'react-hot-toast';

const handleBookingSubmit = async (bookingData) => {
  try {
    const response = await bookingAPI.create(bookingData);
    
    if (response.data.success) {
      toast.success('Booking submitted successfully!');
      // Navigate to success page or show confirmation
    }
  } catch (error) {
    console.error('Booking error:', error);
    toast.error(error.response?.data?.message || 'Failed to submit booking');
  }
};
```

### 2. Contact Form Submission

```javascript
import { contactAPI } from '../services/api';
import { toast } from 'react-hot-toast';

const handleContactSubmit = async (contactData) => {
  try {
    const response = await contactAPI.submit(contactData);
    
    if (response.data.success) {
      toast.success('Message sent successfully!');
      // Reset form or show confirmation
    }
  } catch (error) {
    console.error('Contact error:', error);
    toast.error(error.response?.data?.message || 'Failed to send message');
  }
};
```

### 3. Admin Login

```javascript
import { adminAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const handleAdminLogin = async (credentials) => {
  try {
    const response = await adminAPI.login(credentials);
    
    if (response.data.success) {
      const { token, admin } = response.data.data;
      localStorage.setItem('adminToken', token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    }
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error.response?.data?.message || 'Login failed');
  }
};
```

### 4. Dashboard Data Fetching

```javascript
import { adminAPI } from '../services/api';
import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await adminAPI.getDashboard();
        setDashboardData(response.data.data);
      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Render dashboard with data
};
```

## Error Handling

### Global Error Interceptor

```javascript
// Response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle different error types
    switch (response?.status) {
      case 400:
        // Bad request - validation errors
        toast.error(response.data.message || 'Invalid request');
        break;
      case 401:
        // Unauthorized - clear token and redirect
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
        break;
      case 403:
        // Forbidden
        toast.error('Access denied');
        break;
      case 404:
        // Not found
        toast.error('Resource not found');
        break;
      case 500:
        // Server error
        toast.error('Server error. Please try again later.');
        break;
      default:
        // Network error or other issues
        toast.error('Connection error. Please check your internet.');
    }
    
    return Promise.reject(error);
  }
);
```

### Component-Level Error Handling

```javascript
const useApiCall = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiFunction(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
};
```

## Authentication Flow

### 1. Login Process

```javascript
const loginFlow = async (credentials) => {
  try {
    // 1. Send login request
    const response = await adminAPI.login(credentials);
    
    // 2. Store token
    const { token } = response.data.data;
    localStorage.setItem('adminToken', token);
    
    // 3. Update axios headers
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // 4. Redirect to dashboard
    navigate('/admin/dashboard');
    
  } catch (error) {
    // Handle login errors
    throw error;
  }
};
```

### 2. Token Management

```javascript
// Check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

// Get current token
const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Clear authentication
const logout = () => {
  localStorage.removeItem('adminToken');
  delete api.defaults.headers.common['Authorization'];
  navigate('/admin/login');
};
```

### 3. Protected Routes

```javascript
const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated();
  
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};
```

## Data Validation

### Form Validation with React Hook Form

```javascript
import { useForm } from 'react-hook-form';

const BookingForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await bookingAPI.create(data);
      toast.success('Booking created successfully!');
    } catch (error) {
      toast.error('Failed to create booking');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('firstName', { 
          required: 'First name is required',
          minLength: { value: 2, message: 'Minimum 2 characters' }
        })}
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}
      
      <input
        {...register('email', { 
          required: 'Email is required',
          pattern: { 
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">Submit Booking</button>
    </form>
  );
};
```

## Loading States

### Loading Component

```javascript
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2">Loading...</span>
  </div>
);
```

### Loading States in Components

```javascript
const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingAPI.getAll();
        setBookings(response.data.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {bookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};
```

## Pagination

### Pagination Hook

```javascript
const usePagination = (apiFunction, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (page = 1, params = {}) => {
    setLoading(true);
    try {
      const response = await apiFunction({
        page,
        limit: pagination.itemsPerPage,
        ...params
      });
      
      const { data: responseData, pagination: paginationData } = response.data.data;
      setData(responseData);
      setPagination(paginationData);
    } catch (error) {
      console.error('Pagination error:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      fetchData(pagination.currentPage + 1);
    }
  };

  const prevPage = () => {
    if (pagination.currentPage > 1) {
      fetchData(pagination.currentPage - 1);
    }
  };

  const goToPage = (page) => {
    fetchData(page);
  };

  return {
    data,
    pagination,
    loading,
    fetchData,
    nextPage,
    prevPage,
    goToPage
  };
};
```

## Real-time Updates

### Polling for Updates

```javascript
const usePolling = (apiFunction, interval = 30000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFunction();
        setData(response.data.data);
      } catch (error) {
        console.error('Polling error:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [apiFunction, interval]);

  return { data, loading };
};
```

## Testing API Integration

### Mock API for Testing

```javascript
// Mock API responses for testing
export const mockAPI = {
  booking: {
    create: jest.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'Booking created successfully',
        data: { booking: { id: '1', status: 'pending' } }
      }
    }),
    getAll: jest.fn().mockResolvedValue({
      data: {
        success: true,
        data: {
          bookings: [],
          pagination: { currentPage: 1, totalPages: 1, totalItems: 0 }
        }
      }
    })
  },
  contact: {
    submit: jest.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'Contact form submitted successfully'
      }
    })
  }
};
```

### API Testing Utilities

```javascript
// Test utility for API calls
export const testApiCall = async (apiFunction, expectedData) => {
  const result = await apiFunction();
  expect(result.data.success).toBe(true);
  expect(result.data.data).toEqual(expectedData);
};
```

## Best Practices

### 1. Error Boundaries

```javascript
class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('API Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong with the API.</h1>;
    }

    return this.props.children;
  }
}
```

### 2. Retry Logic

```javascript
const retryApiCall = async (apiFunction, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiFunction();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

### 3. Request Cancellation

```javascript
const useCancellableRequest = () => {
  const abortControllerRef = useRef(null);

  const makeRequest = async (apiFunction, ...args) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      return await apiFunction(...args, {
        signal: abortControllerRef.current.signal
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request cancelled');
      }
      throw error;
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return makeRequest;
};
```

## Environment Configuration

### Development vs Production

```javascript
// Environment-specific configuration
const config = {
  development: {
    apiUrl: 'http://localhost:5000/api',
    timeout: 10000,
    retries: 3
  },
  production: {
    apiUrl: 'https://api.shootic.com/api',
    timeout: 15000,
    retries: 2
  }
};

const currentConfig = config[import.meta.env.MODE] || config.development;
```

This comprehensive API integration guide covers all aspects of frontend-backend communication in the Shootic application.
