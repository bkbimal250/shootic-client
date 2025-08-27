import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  ArrowRight, 
  Camera, 
  Star, 
  CheckCircle, 
  Users, 
  Award, 
  Zap, 
  Shield, 
  Heart,
  Calendar,
  Home,
  Download
} from 'lucide-react'

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentFeature, setCurrentFeature] = useState(0)

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.1 })
  const { ref: servicesRef, inView: servicesInView } = useInView({ threshold: 0.1 })

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of 3",
      content: "Absolutely amazing experience with Shootic! The photographer made our family feel so comfortable, and the photos turned out stunning.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "New Dad",
      content: "Perfect newborn session with Shootic. So professional and gentle with our baby. We'll treasure these photos forever!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Emma Rodriguez",
      role: "Bride-to-be",
      content: "Our engagement photos with Shootic came out better than we dreamed! The convenience of having professional photography done at home was incredible.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ]

  const stats = [
    { number: "2,500+", label: "Happy Families", icon: Users },
    { number: "15,000+", label: "Photos Delivered", icon: Camera },
    { number: "4.9/5", label: "Average Rating", icon: Star },
    { number: "98%", label: "Satisfaction Rate", icon: Award }
  ]

  const features = [
    {
      icon: Zap,
      title: "Quick Setup",
      description: "15-minute professional setup in your home",
      color: "yellow"
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Complete protection and peace of mind",
      color: "green"
    },
    {
      icon: Heart,
      title: "Family Friendly",
      description: "Gentle approach with kids and pets",
      color: "pink"
    }
  ]

  const services = [
    {
      title: "Family Portraits",
      description: "Capture precious family moments in the comfort of your own home with our expert family photographers.",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
      badge: "Most Popular",
      href: "/services#family",
      price: "₹999"
    },
    {
      title: "Couples & Engagement",
      description: "Romantic and intimate photography sessions for couples by our professional photographers.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      badge: "Romantic",
      href: "/services#couples",
      price: "₹1,299"
    },
    {
      title: "Kids & Newborns",
      description: "Gentle and safe photography for your little ones with our specialized newborn photographers.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
      badge: "Gentle Care",
      href: "/services#kids",
      price: "₹999"
    }
  ]

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => {
      clearInterval(testimonialInterval)
      clearInterval(featureInterval)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden pt-16 sm:pt-20"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 sm:w-72 sm:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20 xl:py-32">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="space-y-4 sm:space-y-6">
                                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={heroInView ? { opacity: 1, y: 0 } : {}}
                   transition={{ duration: 0.8, delay: 0.2 }}
                   className="inline-block bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm rounded-full animate-bounce shadow-lg backdrop-blur-sm"
                 >
                   🏆 India's #1 Professional Photography at Home | 5000+ Happy Families
                 </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Shootic
                  </span>{" "}
                  - Experience professional-quality{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    home photo shoots!
                  </span>
                </motion.h1>
                
                                 <motion.p
                   initial={{ opacity: 0, y: 20 }}
                   animate={heroInView ? { opacity: 1, y: 0 } : {}}
                   transition={{ duration: 0.8, delay: 0.6 }}
                   className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
                 >
                   <strong className="text-purple-400">Shootic</strong> transforms a part of your home into a professional mini studio with one
                   simple online booking. Our expert team arrives fully equipped for families,
                   couples, kids & newborns, solo portraits, and product photography. 
                   <span className="text-pink-400">✨ No studio visits needed!</span>
                 </motion.p>
              </div>

                             <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={heroInView ? { opacity: 1, y: 0 } : {}}
                 transition={{ duration: 0.8, delay: 0.8 }}
                 className="flex flex-col sm:flex-row gap-4 sm:gap-6"
               >
                 <Link
                   to="/booking"
                   className="relative group"
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-75 group-hover:opacity-100"></div>
                   <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105 inline-flex items-center justify-center">
                     🎯 Book Your Session Now
                     <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
                   </div>
                 </Link>
                 <Link
                   to="/services"
                   className="relative group"
                 >
                   <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-75 group-hover:opacity-100"></div>
                   <div className="relative bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-bold text-base sm:text-lg shadow-2xl group-hover:shadow-white/25 transition-all duration-300 group-hover:scale-105 inline-flex items-center justify-center">
                     📸 View All Services
                     <Camera className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                   </div>
                 </Link>
               </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 pt-6 sm:pt-8"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-300">2,500+ Happy Families</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                  <span className="text-xs sm:text-sm text-gray-300 ml-2">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                  <span className="text-xs sm:text-sm text-gray-300">Trusted Brand</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=700&fit=crop"
                  alt="Professional in-home family photoshoot"
                  className="rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 w-full h-auto"
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white text-gray-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl animate-bounce">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm sm:text-base">4.9/5 Rating</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">2,500+ Happy Families</p>
                </div>

                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl animate-pulse">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="font-semibold text-sm sm:text-base">100% Satisfaction</span>
                  </div>
                  <p className="text-xs sm:text-sm opacity-90">Guaranteed Quality</p>
                </div>

                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold animate-pulse text-sm sm:text-base">
                  Starting ₹999
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-12 sm:py-20 bg-gradient-to-r from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose <span className="text-purple-600">Shootic</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              <strong>Shootic</strong> has been trusted by thousands of families across India.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card text-center p-4 sm:p-8 group"
              >
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-purple-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section 
        ref={servicesRef}
        className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block bg-purple-100 text-purple-600 px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4 text-sm rounded-full">
              Our Services
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              <span className="text-purple-600">Photography</span> for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Every Occasion
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Professional photography services tailored to your needs, right in your home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card overflow-hidden group"
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-purple-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm animate-pulse">
                    {service.badge}
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full font-bold text-xs sm:text-sm">
                    {service.price}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex gap-2">
                    <Link
                      to={service.href}
                      className="flex-1 bg-white text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg text-center text-xs sm:text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      to="/booking"
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-center text-xs sm:text-sm font-medium transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      <span>Professional editing included</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      <span>Online gallery access</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      <span>High-resolution downloads</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-8 sm:mt-12"
          >
            <Link
              to="/services"
              className="btn-secondary inline-flex items-center"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 sm:w-72 sm:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 sm:w-96 sm:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-white/20 text-white px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-sm rounded-full">
              Ready to Start?
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 sm:mb-8">
              Ready to Create{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Beautiful Memories?
              </span>
            </h2>
            <p className="text-lg sm:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed">
              Book your professional in-home photoshoot today and experience the convenience of
              studio-quality photography at home. Join thousands of satisfied families who trust us for their precious memories.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-6 sm:mb-8 border border-white/20">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-4xl font-bold text-green-400 mb-2">Starting at ₹999</div>
                <p className="text-sm sm:text-base text-gray-300">Professional photography packages - Best prices in India!</p>
              </div>
              <Link
                to="/booking"
                className="btn-primary w-full inline-flex items-center justify-center"
              >
                <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Book Your Session Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                <span>100% Satisfaction Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                <span>Fully Insured & Licensed</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                <span>Same Day Booking Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
