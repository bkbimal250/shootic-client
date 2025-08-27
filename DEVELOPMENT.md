# Frontend Development Guide

This guide is for developers who want to contribute to or work with the Shootic Frontend project.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Code Style](#code-style)
- [Component Development](#component-development)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling](#styling)
- [Testing](#testing)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- VS Code (recommended)
- Backend API running (shootic-backend)

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/bkbimal250/shootphoto.git
cd shootic

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your backend API URL

# Start development server
npm run dev
```

### Development Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

---

## Project Structure

```
shootic/
├── public/
│   ├── images/          # Static images
│   ├── favicon.ico      # Favicon
│   └── index.html       # HTML template
├── src/
│   ├── components/      # Reusable components
│   │   ├── Cards/       # Card components
│   │   ├── UI/          # UI components
│   │   └── FloatingButton.jsx
│   ├── Common/          # Common layout components
│   │   ├── Header.jsx   # Navigation header
│   │   └── Footer.jsx   # Footer component
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── BookingPage.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/        # API services
│   │   └── api.js       # Axios configuration
│   ├── Data/            # Static data
│   │   ├── contact.js   # Contact form data
│   │   └── service.js   # Service data
│   ├── Auth/            # Authentication components
│   │   └── Login.jsx    # Login component
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # App entry point
│   ├── index.css        # Global styles
│   └── App.css          # App-specific styles
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── eslint.config.js     # ESLint configuration
├── .env.example         # Environment variables example
└── README.md            # This file
```

### Key Files Explained

#### `src/App.jsx`
Main application component with routing setup.

#### `src/main.jsx`
Application entry point with React 18 features.

#### `src/services/api.js`
Centralized API service with Axios configuration.

#### `src/components/`
Reusable UI components organized by feature.

#### `src/pages/`
Page-level components for different routes.

---

## Code Style

### JavaScript/React
- Use functional components with hooks
- Prefer `const` and `let` over `var`
- Use arrow functions for components
- Use destructuring for props and state
- Use template literals for string interpolation

### Naming Conventions
- **Files**: PascalCase (`HomePage.jsx`)
- **Components**: PascalCase (`BookingForm`)
- **Variables**: camelCase (`userName`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Functions**: camelCase (`handleSubmit`)
- **CSS Classes**: kebab-case (`btn-primary`)

### Component Organization
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

// 2. Component definition
const BookingForm = ({ onSubmit, loading }) => {
  // 3. State and hooks
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 4. Event handlers
  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      toast.success('Booking submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit booking');
    }
  };

  // 5. Render
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Form content */}
    </form>
  );
};

// 6. PropTypes (if using)
BookingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

// 7. Export
export default BookingForm;
```

---

## Component Development

### Component Types

#### 1. Presentational Components
```javascript
const Button = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

#### 2. Container Components
```javascript
const BookingContainer = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};
```

#### 3. Custom Hooks
```javascript
const useBooking = (bookingId) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await bookingAPI.getById(bookingId);
        setBooking(response.data.data.booking);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  return { booking, loading, error };
};
```

### Component Best Practices

#### 1. Props Validation
```javascript
import PropTypes from 'prop-types';

const ServiceCard = ({ service, onSelect, selected }) => {
  return (
    <div className={`card ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <button onClick={() => onSelect(service)}>
        Select Service
      </button>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

ServiceCard.defaultProps = {
  selected: false
};
```

#### 2. Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8">
          <h2>Something went wrong.</h2>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="btn-primary mt-4"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## State Management

### Local State
```javascript
const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div>
      <StepIndicator currentStep={step} />
      {step === 1 && <ServiceSelection onNext={nextStep} onUpdate={updateFormData} />}
      {step === 2 && <DateTimeSelection onNext={nextStep} onBack={prevStep} onUpdate={updateFormData} />}
      {step === 3 && <ContactInfo onNext={nextStep} onBack={prevStep} onUpdate={updateFormData} />}
      {step === 4 && <ReviewBooking formData={formData} onSubmit={handleSubmit} loading={loading} />}
    </div>
  );
};
```

### Context API
```javascript
// AuthContext.jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const response = await adminAPI.login(credentials);
      const { token, admin } = response.data.data;
      localStorage.setItem('adminToken', token);
      setUser(admin);
      return admin;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Custom Hooks for State
```javascript
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

---

## Routing

### Route Configuration
```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
```

### Protected Routes
```javascript
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};
```

### Navigation Hooks
```javascript
const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => navigate(path);
  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');
  const isActive = (path) => location.pathname === path;

  return { goTo, goBack, goHome, isActive, location };
};
```

---

## Styling

### Tailwind CSS

#### Custom Classes
```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }

  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}
```

#### Responsive Design
```javascript
const ResponsiveComponent = () => {
  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4 
      gap-4 
      p-4 
      sm:p-6 
      lg:p-8
    ">
      <div className="card">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Service Title
        </h3>
        <p className="text-sm sm:text-base lg:text-lg">
          Service description
        </p>
      </div>
    </div>
  );
};
```

#### Dark Mode Support
```javascript
const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
```

### CSS Modules (Alternative)
```javascript
// Button.module.css
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
}

.primary {
  background-color: #2563eb;
  color: white;
}

.primary:hover {
  background-color: #1d4ed8;
}

// Button.jsx
import styles from './Button.module.css';

const Button = ({ variant = 'primary', children, ...props }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

---

## Testing

### Unit Testing with Jest and React Testing Library
```javascript
// BookingForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from './BookingForm';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('BookingForm', () => {
  test('renders booking form', () => {
    renderWithRouter(<BookingForm />);
    expect(screen.getByText('Book Your Session')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    renderWithRouter(<BookingForm />);
    
    const submitButton = screen.getByText('Submit Booking');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const mockOnSubmit = jest.fn();
    renderWithRouter(<BookingForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });

    fireEvent.click(screen.getByText('Submit Booking'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        email: 'john@example.com'
      });
    });
  });
});
```

### Integration Testing
```javascript
// API integration test
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingPage from './BookingPage';

const server = setupServer(
  rest.post('/api/bookings', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        message: 'Booking created successfully',
        data: { booking: { id: '1', status: 'pending' } }
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('creates booking successfully', async () => {
  render(<BookingPage />);

  // Fill form
  fireEvent.change(screen.getByLabelText('First Name'), {
    target: { value: 'John' }
  });

  // Submit form
  fireEvent.click(screen.getByText('Submit'));

  // Verify success message
  await waitFor(() => {
    expect(screen.getByText('Booking created successfully')).toBeInTheDocument();
  });
});
```

### E2E Testing with Playwright
```javascript
// booking.spec.js
import { test, expect } from '@playwright/test';

test('complete booking flow', async ({ page }) => {
  await page.goto('/booking');

  // Step 1: Select service
  await page.click('[data-testid="service-family-portraits"]');
  await page.click('[data-testid="next-step"]');

  // Step 2: Select date and time
  await page.fill('[data-testid="date-input"]', '2024-02-15');
  await page.selectOption('[data-testid="time-select"]', '14:00');
  await page.click('[data-testid="next-step"]');

  // Step 3: Fill contact information
  await page.fill('[data-testid="first-name"]', 'John');
  await page.fill('[data-testid="last-name"]', 'Doe');
  await page.fill('[data-testid="email"]', 'john@example.com');
  await page.fill('[data-testid="phone"]', '+1234567890');
  await page.click('[data-testid="next-step"]');

  // Step 4: Review and submit
  await expect(page.locator('[data-testid="review-name"]')).toContainText('John Doe');
  await page.click('[data-testid="submit-booking"]');

  // Verify success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

---

## Performance

### Code Splitting
```javascript
// Lazy load components
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const BookingPage = lazy(() => import('./pages/BookingPage'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Suspense>
  );
};
```

### Memoization
```javascript
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: item.value * 2
    }));
  }, [data]);

  const handleClick = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.processed}
        </div>
      ))}
    </div>
  );
});
```

### Virtual Scrolling
```javascript
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <BookingCard booking={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={150}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

---

## Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint

# Build with verbose output
npm run build -- --debug
```

#### 2. Runtime Errors
```javascript
// Add error boundary
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Add error logging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

#### 3. Performance Issues
```javascript
// Profile components
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log(`${id} took ${actualDuration}ms to ${phase}`);
};

<Profiler id="BookingForm" onRender={onRenderCallback}>
  <BookingForm />
</Profiler>
```

#### 4. API Issues
```javascript
// Add request/response logging
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

### Debug Tools

#### React Developer Tools
- Install React Developer Tools browser extension
- Use Profiler for performance analysis
- Check component tree and props

#### Redux DevTools (if using Redux)
```javascript
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
```

#### Network Tab
- Monitor API requests
- Check request/response headers
- Analyze performance

---

## Best Practices

### 1. Component Design
- Keep components small and focused
- Use composition over inheritance
- Follow single responsibility principle
- Make components reusable

### 2. State Management
- Use local state for component-specific data
- Use context for global state
- Avoid prop drilling
- Keep state as close to where it's used as possible

### 3. Performance
- Use React.memo for expensive components
- Implement proper key props for lists
- Avoid inline functions in render
- Use lazy loading for routes

### 4. Accessibility
```javascript
// Add proper ARIA labels
<button aria-label="Close modal" onClick={onClose}>
  ×
</button>

// Use semantic HTML
<main role="main">
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Our Services</h2>
  </section>
</main>

// Add keyboard navigation
const handleKeyDown = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onClick();
  }
};
```

### 5. Security
```javascript
// Sanitize user input
import DOMPurify from 'dompurify';

const sanitizedContent = DOMPurify.sanitize(userContent);

// Validate props
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
```

---

## Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)

### Tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [VS Code Extensions](https://marketplace.visualstudio.com/)
- [Storybook](https://storybook.js.org/) - Component development
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Community
- [React Community](https://reactjs.org/community/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react)
- [Reddit r/reactjs](https://www.reddit.com/r/reactjs/)

---

## Support

For development issues:
1. Check the troubleshooting section
2. Review the documentation
3. Search existing issues
4. Create a new issue with detailed information

For questions and discussions:
- Create an issue in the repository
- Contact the development team
- Join the community forums
