# Shootic Frontend

A modern React-based frontend for the Shootic Photography booking system. Built with Vite, Tailwind CSS, and React Router for a seamless user experience.

## Features

- **Responsive Design**: Fully mobile-responsive with Tailwind CSS
- **Modern UI/UX**: Beautiful, intuitive interface with animations
- **Booking System**: Multi-step booking form with validation
- **Contact Form**: Easy-to-use contact form with validation
- **Admin Dashboard**: Secure admin panel for managing bookings and contacts
- **Real-time Updates**: Live data updates and notifications
- **Performance Optimized**: Fast loading with Vite and optimized assets

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **Routing**: React Router DOM
- **HTTP Client**: Axios with interceptors
- **Forms**: React Hook Form with validation
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Scroll Effects**: React Intersection Observer

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (shootic-backend)

## Installation

1. **Clone the repository**
   ```bash
   cd shootic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your backend API URL
   nano .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Shootic Photography
VITE_APP_DESCRIPTION=Professional Photography Services
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

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

## Key Components

### Pages
- **HomePage**: Landing page with hero section and services overview
- **ServicesPage**: Detailed services with pricing and packages
- **AboutPage**: Company information and team details
- **ContactPage**: Contact form with validation
- **BookingPage**: Multi-step booking form
- **AdminLogin**: Secure admin authentication
- **AdminDashboard**: Admin panel for managing data

### Components
- **Header**: Responsive navigation with mobile menu
- **Footer**: Site footer with links and information
- **FloatingButton**: Dynamic floating action button
- **Cards**: Reusable card components for services and testimonials

### Services
- **API Service**: Centralized API client with Axios
- **Authentication**: JWT token management
- **Form Validation**: React Hook Form integration

## Features in Detail

### 1. Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoint-specific layouts (sm, md, lg, xl)
- Touch-friendly interface elements
- Optimized images for different screen sizes

### 2. Booking System
- Multi-step form with progress indicator
- Real-time validation using React Hook Form
- Service and package selection
- Date and time picker
- Add-ons selection
- Total amount calculation
- Form submission with loading states

### 3. Contact Form
- Comprehensive contact form
- Subject selection (booking, pricing, service, support, general)
- Message validation
- Success/error notifications
- Loading states

### 4. Admin Dashboard
- Secure login with JWT authentication
- Dashboard statistics and analytics
- Booking management with pagination
- Contact form submissions
- Status updates and filtering
- Real-time data refresh

### 5. Visual Enhancements
- Smooth animations with Framer Motion
- Scroll-triggered animations
- Loading states and transitions
- Toast notifications
- Gradient backgrounds and shadows
- Modern typography

## API Integration

The frontend communicates with the backend through a centralized API service:

```javascript
// Example API usage
import { bookingAPI, contactAPI, adminAPI } from '../services/api';

// Create booking
const response = await bookingAPI.create(bookingData);

// Submit contact form
const response = await contactAPI.submit(contactData);

// Admin login
const response = await adminAPI.login(credentials);
```

## Styling

### Tailwind CSS
- Custom color palette
- Responsive utility classes
- Component-based styling
- Dark mode support (future)

### Custom Components
- Reusable UI components
- Consistent design system
- Accessibility features
- Cross-browser compatibility

## Performance Optimization

### Build Optimization
- Vite for fast development and optimized builds
- Code splitting and lazy loading
- Image optimization
- CSS purging with Tailwind

### Runtime Optimization
- React.memo for component memoization
- useCallback and useMemo hooks
- Efficient re-renders
- Optimized bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### Code Style
- ESLint configuration
- Prettier formatting
- Consistent naming conventions
- Component organization

### Testing (Future)
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright
- Visual regression tests

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Static site hosting
- **AWS S3**: Cloud hosting
- **Custom Server**: Any static hosting service

### Environment Configuration
- Set `VITE_API_BASE_URL` to your production backend URL
- Configure CORS on the backend
- Set up proper SSL certificates
- Enable compression and caching

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check backend server is running
   - Verify API URL in environment variables
   - Check CORS configuration

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check for syntax errors
   - Verify all dependencies are installed

3. **Styling Issues**
   - Check Tailwind CSS configuration
   - Verify PostCSS setup
   - Clear browser cache

4. **Performance Issues**
   - Check bundle size
   - Optimize images
   - Enable code splitting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Maintain responsive design
- Write clean, readable code
- Add proper error handling

## Support

For issues and questions:
- Check the troubleshooting section
- Review the documentation
- Create an issue in the repository
- Contact the development team

## License

This project is licensed under the MIT License.

## Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS team for the utility-first CSS framework
- All contributors and supporters