# Frontend Deployment Guide

This guide covers deploying the Shootic Frontend to various platforms and environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Process](#build-process)
- [Deployment Platforms](#deployment-platforms)
- [Environment Configuration](#environment-configuration)
- [Performance Optimization](#performance-optimization)
- [Monitoring & Analytics](#monitoring--analytics)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git** repository access
- **Backend API** deployed and accessible
- **Domain name** (optional but recommended)

## Build Process

### 1. Local Build Testing

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your production API URL

# Build for production
npm run build

# Preview the build locally
npm run preview
```

### 2. Build Configuration

The build process creates optimized static files in the `dist/` directory:

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── css/            # Optimized CSS files
│   ├── js/             # Optimized JavaScript files
│   └── images/         # Optimized images
└── favicon.ico         # Favicon
```

### 3. Build Optimization

Vite automatically optimizes:
- **Code splitting**: Automatic chunk splitting
- **Tree shaking**: Remove unused code
- **Minification**: Compress CSS and JavaScript
- **Image optimization**: Compress and optimize images
- **CSS purging**: Remove unused Tailwind classes

---

## Deployment Platforms

### 1. Vercel (Recommended)

Vercel provides zero-config deployment for React applications.

#### Setup
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   # Login to Vercel
   vercel login

   # Deploy
   vercel

   # For production
   vercel --prod
   ```

#### Configuration
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "env": {
    "VITE_API_BASE_URL": "https://your-backend-api.com/api"
  }
}
```

#### Environment Variables
Set in Vercel dashboard:
- `VITE_API_BASE_URL`: Your production backend API URL
- `VITE_APP_NAME`: Application name
- `VITE_APP_DESCRIPTION`: Application description

### 2. Netlify

Netlify provides easy deployment with drag-and-drop or Git integration.

#### Setup
1. **Connect Repository**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [build.environment]
     VITE_API_BASE_URL = "https://your-backend-api.com/api"
   ```

#### Environment Variables
Set in Netlify dashboard:
- `VITE_API_BASE_URL`
- `VITE_APP_NAME`
- `VITE_APP_DESCRIPTION`

### 3. GitHub Pages

Deploy directly from your GitHub repository.

#### Setup
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Select `gh-pages` branch as source

### 4. AWS S3 + CloudFront

For enterprise-level deployment with CDN.

#### S3 Setup
1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-app-bucket
   ```

2. **Configure for Static Website**
   ```bash
   aws s3 website s3://your-app-bucket --index-document index.html --error-document index.html
   ```

3. **Upload Files**
   ```bash
   aws s3 sync dist/ s3://your-app-bucket --delete
   ```

#### CloudFront Setup
1. **Create Distribution**
   - Origin: S3 bucket
   - Default root object: `index.html`
   - Error pages: Redirect to `index.html` for 404

2. **Configure Cache**
   - Cache static assets (CSS, JS, images)
   - Don't cache HTML files

### 5. DigitalOcean App Platform

Managed platform for easy deployment.

#### Setup
1. **Connect Repository**
   - Connect your GitHub repository
   - Select Node.js environment
   - Set build command: `npm run build`
   - Set run command: `npm run preview`

2. **Environment Variables**
   Set in DigitalOcean dashboard:
   - `VITE_API_BASE_URL`
   - `VITE_APP_NAME`
   - `VITE_APP_DESCRIPTION`

---

## Environment Configuration

### Production Environment Variables

Create `.env.production`:
```env
# API Configuration
VITE_API_BASE_URL=https://your-backend-api.com/api

# App Configuration
VITE_APP_NAME=Shootic Photography
VITE_APP_DESCRIPTION=Professional Photography Services

# Analytics (Optional)
VITE_GA_TRACKING_ID=your-ga-tracking-id
VITE_GTM_ID=your-gtm-id

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

### Environment-Specific Builds

```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Build with specific environment
npm run build -- --mode production
```

### Build Optimization

#### Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

---

## Performance Optimization

### 1. Bundle Analysis

Install bundle analyzer:
```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ]
})
```

### 2. Image Optimization

#### Manual Optimization
```bash
# Install image optimization tools
npm install --save-dev imagemin imagemin-mozjpeg imagemin-pngquant

# Optimize images
npx imagemin public/images/* --out-dir=dist/assets/images
```

#### Automatic Optimization
Use Vite's built-in image optimization:
```javascript
// vite.config.js
export default defineConfig({
  build: {
    assetsInlineLimit: 4096, // 4kb
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  }
})
```

### 3. Caching Strategy

#### Service Worker (PWA)
Create `public/sw.js`:
```javascript
const CACHE_NAME = 'shootic-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  )
})
```

#### Cache Headers
For S3/CloudFront:
```json
{
  "CacheControl": "public, max-age=31536000, immutable"
}
```

### 4. Code Splitting

#### Route-based Splitting
```javascript
// Lazy load components
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const BookingPage = lazy(() => import('./pages/BookingPage'))

// Use Suspense
<Suspense fallback={<LoadingSpinner />}>
  <AdminDashboard />
</Suspense>
```

#### Component Splitting
```javascript
// Split large components
const HeavyComponent = lazy(() => import('./components/HeavyComponent'))
```

---

## Monitoring & Analytics

### 1. Google Analytics

Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Error Monitoring

#### Sentry Integration
```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// main.jsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})
```

### 3. Performance Monitoring

#### Web Vitals
```bash
npm install web-vitals
```

```javascript
// reportWebVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

---

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint

# Build with verbose output
npm run build -- --debug
```

#### 2. API Connection Issues
- Verify `VITE_API_BASE_URL` is correct
- Check CORS configuration on backend
- Test API endpoints directly
- Check network connectivity

#### 3. Routing Issues
- Ensure SPA routing is configured
- Check for 404 redirects to `index.html`
- Verify React Router configuration

#### 4. Performance Issues
- Analyze bundle size
- Check for large dependencies
- Optimize images
- Enable compression

### Debug Commands

```bash
# Analyze bundle
npm run build -- --analyze

# Check dependencies
npm ls

# Run security audit
npm audit

# Check for outdated packages
npm outdated
```

### Performance Testing

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run performance audit
lighthouse https://your-app.com --output html --output-path ./lighthouse-report.html
```

---

## Security Considerations

### 1. Environment Variables
- Never commit sensitive data
- Use build-time environment variables
- Validate environment variables

### 2. Content Security Policy
Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline';">
```

### 3. HTTPS
- Always use HTTPS in production
- Redirect HTTP to HTTPS
- Use secure cookies

### 4. Dependencies
- Regular security audits
- Keep dependencies updated
- Use `npm audit` regularly

---

## Post-Deployment Checklist

- [ ] **Build Success**: Verify build completes without errors
- [ ] **Environment Variables**: Confirm all variables are set correctly
- [ ] **API Connection**: Test API endpoints from production
- [ ] **Routing**: Verify all routes work correctly
- [ ] **Performance**: Run Lighthouse audit
- [ ] **Mobile Testing**: Test on various devices
- [ ] **Analytics**: Confirm tracking is working
- [ ] **Error Monitoring**: Set up error tracking
- [ ] **Backup**: Ensure deployment is backed up
- [ ] **Documentation**: Update deployment documentation

---

## Support

For deployment issues:
1. Check the troubleshooting section
2. Review platform-specific documentation
3. Check build logs and error messages
4. Verify environment configuration
5. Test locally before deploying

For additional help:
- Create an issue in the repository
- Contact the development team
- Check platform support forums
