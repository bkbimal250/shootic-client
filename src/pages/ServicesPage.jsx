import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { 
  Camera, 
  Heart, 
  Users, 
  Baby, 
  User, 
  Package, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Zap
} from 'lucide-react'

const ServicesPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: servicesRef, inView: servicesInView } = useInView({ threshold: 0.1 })

  const services = [
    {
      id: "family",
      title: "Family Portraits",
      subtitle: "Capture Precious Family Moments",
      description: "Professional family photography sessions in the comfort of your home. Perfect for capturing those precious family moments that you'll treasure forever.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
      price: "₹999",
      duration: "60-120 min",
      features: [
        "Professional photographer",
        "Studio lighting setup",
        "15+ edited images",
        "Online gallery access",
        "Family-friendly approach",
        "Multiple outfit changes"
      ],
      badge: "Most Popular",
      color: "purple"
    },
    {
      id: "couples",
      title: "Couples & Engagement",
      subtitle: "Romantic Photography Sessions",
      description: "Intimate and romantic photography sessions for couples. Perfect for engagement photos, anniversaries, or just celebrating your love.",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      price: "₹1,299",
      duration: "60-90 min",
      features: [
        "Senior photographer",
        "Romantic lighting setup",
        "25+ edited images",
        "Pre-shoot consultation",
        "Multiple locations",
        "Rush delivery option"
      ],
      badge: "Romantic",
      color: "pink"
    },
    {
      id: "kids",
      title: "Kids & Newborns",
      subtitle: "Gentle Photography for Little Ones",
      description: "Specialized photography for children and newborns. Our gentle approach ensures comfortable and beautiful photos of your little ones.",
      icon: Baby,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
      price: "₹999",
      duration: "45-90 min",
      features: [
        "Child specialist photographer",
        "Gentle approach",
        "20+ edited images",
        "Props and accessories",
        "Patience and care",
        "Parent guidance included"
      ],
      badge: "Gentle Care",
      color: "blue"
    },
    {
      id: "solo",
      title: "Solo Portraits",
      subtitle: "Professional Headshots & Personal Branding",
      description: "Professional headshots and personal branding photography. Perfect for LinkedIn, business profiles, or personal portfolios.",
      icon: User,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      price: "₹799",
      duration: "45-60 min",
      features: [
        "Professional headshots",
        "Business casual options",
        "10+ edited images",
        "Quick turnaround",
        "Professional editing",
        "Multiple poses"
      ],
      badge: "Professional",
      color: "green"
    },
    {
      id: "product",
      title: "Product Photography",
      subtitle: "Professional Product Shots",
      description: "High-quality product photography for businesses. Perfect for e-commerce, catalogs, and marketing materials.",
      icon: Package,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      price: "₹1,499",
      duration: "60-90 min",
      features: [
        "Product specialist",
        "Studio lighting setup",
        "30+ edited images",
        "Multiple angles",
        "Background options",
        "Commercial usage rights"
      ],
      badge: "Business",
      color: "orange"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: "Quick Setup",
      description: "15-minute professional setup in your home",
      color: "yellow"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in photography",
      color: "purple"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Available 7 days a week, flexible hours",
      color: "blue"
    },
    {
      icon: Star,
      title: "5-Star Service",
      description: "Consistently rated 5 stars by our clients",
      color: "orange"
    }
  ]

  return (
    <>
      <SEO 
        title="Photography Services"
        description="Professional photography services including family portraits, couples & engagement, kids & newborns, solo portraits, and commercial photography. Book your session with Shootic."
        keywords="family photography, wedding photography, portrait photography, newborn photography, commercial photography, professional photographer, photo studio"
        url="/services"
        structuredData={{
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
          ],
          "areaServed": "United States",
          "priceRange": "$$"
        }}
      />
      <div className="min-h-screen pt-16 sm:pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 sm:py-16 lg:py-24 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23purple' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200 shadow-lg">
              📸 Our Photography Services
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 lg:mb-8">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Professional Photography
              </span>{" "}
              <span className="text-gray-900">for Every Occasion</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 leading-relaxed px-4">
              From family portraits to professional headshots, we bring the studio to your home. 
              <span className="text-purple-600 font-semibold"> Every session is crafted with care, creativity, and professionalism! ✨</span>
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="card p-4 sm:p-6 text-center group"
                >
                  <div className={`bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 sm:h-8 sm:w-8 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-12 sm:py-16 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">
              Choose Your <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Perfect Service</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Each service is designed to capture your unique moments with professional quality and care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card overflow-hidden group hover:scale-105 transition-transform duration-500"
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold animate-pulse">
                    {service.badge}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
                    {service.price}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-1">{service.title}</h3>
                    <p className="text-sm sm:text-base text-white/90">{service.subtitle}</p>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{service.duration}</span>
                    </div>
                    <div className="text-2xl font-black text-purple-600">{service.price}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/booking?service=${service.id}`}
                    className="relative group w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-75 group-hover:opacity-100"></div>
                    <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                      Book This Service
                      <ArrowRight className="inline ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12 sm:mt-16"
          >
            <div className="card p-8 sm:p-12 max-w-4xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200">
                🎯 Ready to Get Started?
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6">
                Let's Create Something <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Amazing</span>
              </h3>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Book your photography session today and experience the convenience of professional photography at home!
              </p>
              <Link
                to="/booking"
                className="relative group inline-block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-75 group-hover:opacity-100"></div>
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg sm:text-xl shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105 inline-flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Book Your Session Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  )
}

export default ServicesPage
