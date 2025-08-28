# SEO Guide for Shootic Photography

This guide provides comprehensive SEO optimization strategies for the Shootic Photography website.

## Table of Contents

- [Technical SEO](#technical-seo)
- [On-Page SEO](#on-page-seo)
- [Content Strategy](#content-strategy)
- [Local SEO](#local-seo)
- [Performance Optimization](#performance-optimization)
- [Monitoring & Analytics](#monitoring--analytics)

---

## Technical SEO

### 1. Meta Tags Implementation

#### Homepage (`/`)
```html
<title>Shootic - Professional Photography Services | Wedding, Portrait & Event Photography</title>
<meta name="description" content="Professional photography services for weddings, portraits, events, and commercial photography. Book your session with Shootic's expert photographers. High-quality, affordable photography solutions." />
<meta name="keywords" content="photography, wedding photography, portrait photography, event photography, professional photographer, photo studio, photography services, wedding photographer, family portraits, commercial photography" />
```

#### Services Page (`/services`)
```html
<title>Photography Services | Shootic - Family, Wedding & Portrait Photography</title>
<meta name="description" content="Professional photography services including family portraits, couples & engagement, kids & newborns, solo portraits, and commercial photography. Book your session with Shootic." />
```

#### Contact Page (`/contact`)
```html
<title>Contact Us | Shootic Photography - Get in Touch</title>
<meta name="description" content="Contact Shootic Photography for professional photography services. Get quotes, book sessions, or ask questions about our photography packages." />
```

### 2. Open Graph Tags

All pages include Open Graph tags for social media sharing:

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://shootic.com/" />
<meta property="og:title" content="Shootic - Professional Photography Services" />
<meta property="og:description" content="Professional photography services for weddings, portraits, events, and commercial photography." />
<meta property="og:image" content="https://shootic.com/images/shootic-og-image.jpg" />
```

### 3. Structured Data

#### Business Schema
```json
{
  "@context": "https://schema.org",
  "@type": "PhotographyBusiness",
  "name": "Shootic Photography",
  "url": "https://shootic.com",
  "logo": "https://shootic.com/images/shootic-logo.png",
  "description": "Professional photography services for weddings, portraits, events, and commercial photography",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@shootic.com"
  },
  "serviceType": [
    "Wedding Photography",
    "Portrait Photography", 
    "Event Photography",
    "Commercial Photography",
    "Family Photography"
  ]
}
```

#### Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Photography Services",
  "description": "Professional photography services for families, couples, newborns, and commercial needs",
  "provider": {
    "@type": "PhotographyBusiness",
    "name": "Shootic Photography"
  },
  "serviceType": [
    "Family Portraits",
    "Couples & Engagement",
    "Kids & Newborns", 
    "Solo Portraits",
    "Commercial Photography"
  ]
}
```

### 4. XML Sitemap

Located at `/sitemap.xml` with all important pages:

- Homepage (priority: 1.0)
- Services (priority: 0.9)
- Booking (priority: 0.9)
- About (priority: 0.8)
- Contact (priority: 0.8)
- Portfolio (priority: 0.7)
- Pricing (priority: 0.8)

### 5. Robots.txt

```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://shootic.com/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /services/
Allow: /about/
Allow: /contact/
Allow: /booking/
Allow: /portfolio/
Allow: /pricing/

# Crawl delay
Crawl-delay: 1
```

---

## On-Page SEO

### 1. Page Titles

- **Homepage**: "Shootic - Professional Photography Services | Wedding, Portrait & Event Photography"
- **Services**: "Photography Services | Shootic - Family, Wedding & Portrait Photography"
- **About**: "About Us | Shootic Photography - Professional Photographers"
- **Contact**: "Contact Us | Shootic Photography - Get in Touch"
- **Booking**: "Book Photography Session | Shootic - Easy Online Booking"

### 2. Meta Descriptions

Keep descriptions between 150-160 characters and include:
- Primary keyword
- Call-to-action
- Unique value proposition

### 3. Header Tags (H1, H2, H3)

#### Homepage
- H1: "Professional Photography Services"
- H2: "Our Services", "Why Choose Shootic", "What Our Clients Say"

#### Services Page
- H1: "Professional Photography Services"
- H2: "Family Portraits", "Couples & Engagement", "Kids & Newborns"

### 4. Image Optimization

- Use descriptive alt text
- Compress images for web
- Use WebP format when possible
- Implement lazy loading

### 5. Internal Linking

- Link from homepage to service pages
- Link from service pages to booking page
- Link from testimonials to relevant services
- Use descriptive anchor text

---

## Content Strategy

### 1. Target Keywords

#### Primary Keywords
- "photography services"
- "professional photographer"
- "wedding photography"
- "family portraits"
- "portrait photography"

#### Long-tail Keywords
- "professional photography services near me"
- "family portrait photographer"
- "wedding photographer booking"
- "newborn photography session"
- "commercial photography services"

### 2. Content Types

#### Service Pages
- Detailed service descriptions
- Pricing information
- What's included
- Sample galleries
- Booking process

#### Blog Content Ideas
- "10 Tips for Perfect Family Photos"
- "How to Prepare for Your Wedding Photography Session"
- "Newborn Photography Safety Guidelines"
- "Choosing the Right Photography Package"
- "Seasonal Photography Ideas"

### 3. Local Content

- Location-specific service pages
- Local event photography
- Community involvement
- Local testimonials

---

## Local SEO

### 1. Google My Business

- Complete business profile
- Add high-quality photos
- Encourage customer reviews
- Regular posts and updates
- Respond to reviews

### 2. Local Citations

- Consistent NAP (Name, Address, Phone)
- Local business directories
- Photography-specific directories
- Wedding vendor directories

### 3. Local Keywords

- "photography services [city]"
- "wedding photographer [city]"
- "family photographer [city]"
- "portrait studio [city]"

---

## Performance Optimization

### 1. Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 2. Image Optimization

```javascript
// Lazy loading implementation
<img 
  src="image.jpg" 
  alt="Professional family photography" 
  loading="lazy"
  width="400" 
  height="300" 
/>
```

### 3. Code Splitting

```javascript
// Lazy load components
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
```

### 4. Caching Strategy

- Browser caching for static assets
- CDN for global performance
- Service worker for offline functionality

---

## Monitoring & Analytics

### 1. Google Analytics 4

Track key metrics:
- Page views
- User engagement
- Conversion rates
- Traffic sources
- User behavior

### 2. Google Search Console

Monitor:
- Search performance
- Indexing status
- Mobile usability
- Core Web Vitals
- Search queries

### 3. SEO Tools

- **Ahrefs**: Keyword research and backlink analysis
- **SEMrush**: Competitor analysis
- **Moz**: Domain authority and ranking factors
- **Screaming Frog**: Technical SEO audit

### 4. Key Performance Indicators

- Organic traffic growth
- Keyword rankings
- Click-through rates
- Bounce rate
- Conversion rate
- Page load speed

---

## Technical Implementation

### 1. React SEO Component

```javascript
import SEO from '../components/SEO';

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Professional Photography Services"
        description="Professional photography services for weddings, portraits, events, and commercial photography."
        keywords="photography, wedding photography, portrait photography"
        url="/"
        structuredData={structuredData}
      />
      {/* Page content */}
    </>
  );
};
```

### 2. Dynamic Meta Tags

```javascript
// Update meta tags based on route
useEffect(() => {
  document.title = fullTitle;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
}, [fullTitle, description]);
```

### 3. Canonical URLs

```html
<link rel="canonical" href="https://shootic.com/" />
```

---

## Best Practices

### 1. Content Quality
- Write unique, valuable content
- Use natural language
- Include relevant keywords naturally
- Regular content updates

### 2. User Experience
- Fast loading times
- Mobile-friendly design
- Easy navigation
- Clear call-to-actions

### 3. Technical SEO
- Clean URL structure
- Proper heading hierarchy
- Optimized images
- Schema markup

### 4. Link Building
- Quality backlinks from relevant sites
- Internal linking strategy
- Social media presence
- Guest posting opportunities

---

## Regular Maintenance

### Monthly Tasks
- Review Google Analytics data
- Check Search Console for issues
- Update content and images
- Monitor competitor activity

### Quarterly Tasks
- Full SEO audit
- Update keyword strategy
- Review and update meta descriptions
- Analyze user behavior

### Annual Tasks
- Complete website redesign if needed
- Update business information
- Review and update content strategy
- Analyze long-term performance trends

---

## Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Schema.org](https://schema.org/)

---

This SEO guide should be regularly updated based on algorithm changes and performance data.
