# Shootic Photography - Frontend

A modern React application for the Shootic Photography booking system. Built with React, Tailwind CSS, and React Router, featuring a beautiful UI with animations and a comprehensive booking system.

## Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Multi-step Booking**: Intuitive booking form with service selection, scheduling, and payment
- **Admin Dashboard**: Complete admin interface for managing bookings and contacts
- **Contact Management**: Contact form with email integration
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Smooth page transitions and micro-interactions
- **Form Validation**: Client-side validation with react-hook-form
- **Toast Notifications**: User-friendly feedback with react-hot-toast

## Tech Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: React Hot Toast
- **Scroll Effects**: React Intersection Observer

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see shootic-backend)

## Installation

1. **Navigate to the frontend directory**
   ```bash
   cd shootic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create environment file
   cp .env.example .env
   
   # Edit .env with your backend API URL
   nano .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Optional: Google Analytics
VITE_GA_TRACKING_ID=your-ga-tracking-id
```

## Project Structure

```
shootic/
├── public/
│   ├── images/           # Static images
│   └── favicon.ico       # Favicon
├── src/
│   ├── components/       # Reusable components
│   │   ├── Cards/        # Card components
│   │   └── UI/           # UI components
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── BookingPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── Common/           # Common components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── Auth/             # Authentication components
│   │   └── Login.jsx
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Pages & Features

### Homepage (`/`)
- Hero section with call-to-action
- Services overview
- Statistics and achievements
- Customer testimonials
- Contact information

### Services (`/services`)
- Detailed service descriptions
- Package comparisons
- Pricing information
- Booking links

### Booking (`/booking`)
- Multi-step booking form:
  1. Service & Package Selection
  2. Date & Time Selection
  3. Add-ons & Extras
  4. Contact Information
  5. Review & Confirmation
- Real-time price calculation
- Form validation
- API integration

### About (`/about`)
- Company story and mission
- Team information
- Achievements and stats
- Values and philosophy

### Contact (`/contact`)
- Contact form with validation
- Contact information
- Service areas
- Map integration (placeholder)

### Admin Login (`/admin/login`)
- Secure admin authentication
- JWT token management
- Form validation
- Error handling

### Admin Dashboard (`/admin/dashboard`)
- Overview statistics
- Recent bookings
- Contact inquiries
- Quick actions
- Data visualization

## Components

### Header Component
- Responsive navigation
- Dynamic styling based on scroll
- Mobile menu
- CTA buttons

### Footer Component
- Company information
- Navigation links
- Newsletter subscription
- Social media links
- Floating CTA

### Booking Form
- Multi-step wizard
- Service selection cards
- Date/time picker
- Add-ons selection
- Contact form
- Review and confirmation

## Styling

### Tailwind CSS Configuration
- Custom color palette (primary, secondary)
- Custom fonts (Inter)
- Custom animations
- Responsive breakpoints
- Component classes

### Custom CSS Classes
- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.card` - Card component styling
- `.input-field` - Input field styling

## API Integration

The frontend communicates with the backend API using Axios:

### Base Configuration
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Authentication
- JWT token storage in localStorage
- Automatic token inclusion in requests
- Token refresh handling

### Error Handling
- Global error interceptor
- User-friendly error messages
- Toast notifications for feedback

## Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Animations

### Page Transitions
- Framer Motion for smooth page transitions
- Stagger animations for content loading
- Hover effects and micro-interactions

### Scroll Animations
- React Intersection Observer for scroll-triggered animations
- Fade-in effects
- Slide-up animations

## Form Handling

### React Hook Form
- Efficient form state management
- Built-in validation
- Error handling
- Performance optimization

### Validation Rules
- Required field validation
- Email format validation
- Phone number validation
- Custom validation rules

## State Management

- React hooks for local state
- Context API for global state (if needed)
- localStorage for persistent data
- URL state for booking flow

## Performance Optimization

- Code splitting with React Router
- Lazy loading of components
- Image optimization
- Bundle size optimization
- Caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Add comments for complex logic

### File Organization
- Group related components together
- Use consistent file naming
- Separate concerns (UI, logic, data)

### Performance
- Optimize re-renders
- Use React.memo when appropriate
- Implement proper loading states
- Optimize images and assets

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy

### Deploy to Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

## Environment Variables for Production

- `VITE_API_URL` - Production backend API URL
- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
#   s h o o t i c - c l i e n t  
 