import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { contactAPI } from '../services/api'

const ContactPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: formRef, inView: formInView } = useInView({ threshold: 0.1 })

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await contactAPI.submit(data)
      
      if (response.data.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        reset()
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Failed to send message. Please try again.')
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+91 98765 43210",
      description: "Call us anytime"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info.shootic@gmail.com",
      description: "Send us an email"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Delhi NCR, India",
      description: "Serving the region"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "9:00 AM - 8:00 PM",
      description: "Monday to Sunday"
    }
  ]

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="bg-gradient-to-br from-purple-50 to-pink-50 py-12 sm:py-16 lg:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200 shadow-lg">
              📞 Get In Touch With Us
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 lg:mb-8">
              Let's <span className="text-purple-600">Connect</span>{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Today
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 leading-relaxed px-4">
              Have questions about our photography services? Want to discuss your upcoming session? 
              We'd love to hear from you! <span className="text-purple-600 font-semibold">Get in touch with us today and let's create something amazing together! ✨</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
              Contact <span className="text-purple-600">Information</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Multiple ways to reach us. We're here to help with all your photography needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                                 className="card p-4 sm:p-6 lg:p-8 text-center group"
              >
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-purple-600 font-semibold mb-1">{info.details}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

             {/* Contact Form */}
       <section 
         ref={formRef}
         className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-purple-50"
       >
         <div className="container mx-auto px-4 sm:px-6">
           <div className="max-w-4xl mx-auto">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={formInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8 }}
               className="text-center mb-8 sm:mb-12 lg:mb-16"
             >
               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
                 Send Us a <span className="text-purple-600">Message</span>
               </h2>
               <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                 Fill out the form below and we'll get back to you within 24 hours.
               </p>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={formInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
             >
              {/* Contact Form */}
              <div className="card p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        {...register('firstName', { required: 'First name is required' })}
                        className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        {...register('lastName', { required: 'Last name is required' })}
                        className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="input-field"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select
                      {...register('subject', { required: 'Subject is required' })}
                      className={`input-field ${errors.subject ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Question</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="service">Service Details</option>
                      <option value="support">Customer Support</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      className={`input-field ${errors.message ? 'border-red-500' : ''}`}
                      rows={4}
                      placeholder="Tell us about your photography needs..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full inline-flex items-center justify-center"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <div className="card p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Professional photographers with years of experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">State-of-the-art equipment brought to your home</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Flexible scheduling to suit your needs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Professional editing and high-quality delivery</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Competitive pricing with no hidden costs</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Quick Response</h3>
                  <p className="text-gray-600 mb-4">
                    We typically respond to all inquiries within 24 hours. For urgent matters, 
                    please call us directly at +91 98765 43210.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Emergency Booking:</strong> Need a last-minute session? 
                      Call us and we'll do our best to accommodate your request.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Service <span className="text-purple-600">Areas</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We provide professional photography services across Delhi NCR and surrounding areas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card p-6 sm:p-8"
          >
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive map showing our service areas</p>
                <p className="text-sm text-gray-500 mt-2">Delhi NCR, Gurgaon, Noida, Faridabad, Ghaziabad</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
