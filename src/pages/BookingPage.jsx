import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Users,
  Heart,
  Baby,
  User,
  Package,
  Star,
  CheckCircle
} from 'lucide-react'
import { bookingAPI } from '../services/api'

const BookingPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedAddOns, setSelectedAddOns] = useState([])

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm()

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const services = [
    {
      id: "family",
      name: "Family Portraits",
      icon: Users,
      description: "Perfect for capturing family memories",
      duration: "60-120 min",
      price: 999
    },
    {
      id: "couples",
      name: "Couples & Engagement",
      icon: Heart,
      description: "Romantic sessions for couples",
      duration: "60-90 min",
      price: 1299
    },
    {
      id: "kids",
      name: "Kids & Newborns",
      icon: Baby,
      description: "Gentle photography for little ones",
      duration: "45-90 min",
      price: 999
    },
    {
      id: "solo",
      name: "Solo Portraits",
      icon: User,
      description: "Professional headshots and personal branding",
      duration: "45-60 min",
      price: 799
    },
    {
      id: "product",
      name: "Product Photography",
      icon: Package,
      description: "Professional product shots for business",
      duration: "60-90 min",
      price: 1499
    }
  ]

  const packages = [
    {
      id: "essential",
      name: "Essential Package",
      price: 999,
      duration: "60 min",
      images: 15,
      features: ["Professional photographer", "Basic lighting", "15 edited images", "Online gallery"],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium Package",
      price: 1299,
      duration: "90 min",
      images: 30,
      features: ["Senior photographer", "Enhanced lighting", "30 edited images", "Pre-shoot consultation", "Rush delivery"],
      popular: true,
    },
    {
      id: "deluxe",
      name: "Deluxe Package",
      price: 1499,
      duration: "120 min",
      images: "50+",
      features: ["Master photographer", "Premium setup", "50+ edited images", "Custom backdrops", "Same-day preview", "Styling consultation"],
      popular: false,
    }
  ]

  const timeSlots = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "12:00 PM", available: true },
    { time: "1:00 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: false },
    { time: "4:00 PM", available: true },
    { time: "5:00 PM", available: true }
  ]

  const addOns = [
    {
      id: "prints",
      name: "Professional Prints Package",
      price: 499,
      description: "High-quality prints of your favorite photos",
      icon: "🖼️"
    },
    {
      id: "album",
      name: "Custom Photo Album",
      price: 799,
      description: "Beautiful hardcover album with your photos",
      icon: "📚"
    },
    {
      id: "rush",
      name: "Rush Delivery (24 hours)",
      price: 299,
      description: "Get your photos delivered within 24 hours",
      icon: "⚡"
    },
    {
      id: "extra-time",
      name: "Extra 30 Minutes",
      price: 499,
      description: "Extend your session by 30 minutes",
      icon: "⏰"
    }
  ]

  useEffect(() => {
    const serviceFromUrl = searchParams.get('service')
    if (serviceFromUrl) {
      setSelectedService(serviceFromUrl)
    }
  }, [searchParams])

  const getPackagePrice = () => {
    const pkg = packages.find((p) => p.id === selectedPackage)
    return pkg ? pkg.price : 0
  }

  const getAddOnsTotal = () => {
    return selectedAddOns.reduce((total, addonId) => {
      const addon = addOns.find((a) => a.id === addonId)
      return total + (addon ? addon.price : 0)
    }, 0)
  }

  const getTotalPrice = () => {
    return getPackagePrice() + getAddOnsTotal()
  }

  const handleAddOnToggle = (addonId) => {
    setSelectedAddOns((prev) => 
      prev.includes(addonId) 
        ? prev.filter((id) => id !== addonId) 
        : [...prev, addonId]
    )
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService && selectedPackage
      case 2:
        return selectedDate && selectedTime
      case 3:
        return true
      case 4:
        return watch('firstName') && watch('lastName') && watch('email') && watch('phone')
      case 5:
        return watch('address') && watch('city') && watch('state') && watch('pincode')
      default:
        return false
    }
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      const bookingData = {
        ...data,
        service: services.find(s => s.id === selectedService)?.name || '',
        package: packages.find(p => p.id === selectedPackage)?.name || '',
        date: selectedDate,
        time: selectedTime,
        addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)?.name).filter(Boolean),
        totalAmount: getTotalPrice(),
        status: 'pending'
      }

      // Send to backend API
      const response = await bookingAPI.create(bookingData)
      
      if (response.data.success) {
        toast.success('Booking submitted successfully!')
        setBookingComplete(true)
      }
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to submit booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Booking! 🎉</h1>
              <p className="text-xl text-gray-600 mb-8">
                We've received your booking request and will contact you within 24 hours to confirm your photography session.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  onClick={() => navigate('/')} 
                  className="btn-primary flex-1"
                >
                  Back to Home
                </button>
                <button 
                  onClick={() => navigate('/services')} 
                  className="btn-secondary flex-1"
                >
                  View Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200">
              🎯 Book Your Perfect Session
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Book Your Photography Session
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
              ✨ Choose your perfect photography package and schedule your session. Our professional photographers will
              come to your home with all the equipment needed. <span className="text-purple-600 font-semibold">Making memories has never been easier!</span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm sm:text-base font-bold text-gray-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm sm:text-base font-semibold text-purple-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 h-3 rounded-full transition-all duration-500 shadow-lg" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Choose Service</span>
              <span className="text-xs text-gray-500">Select Time</span>
              <span className="text-xs text-gray-500">Add-ons</span>
              <span className="text-xs text-gray-500">Contact Info</span>
              <span className="text-xs text-gray-500">Address</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="card p-4 sm:p-6 mb-6 sm:mb-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Service & Package</h2>
                
                                 {/* Service Selection */}
                 <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Service Type</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          selectedService === service.id
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <service.icon className="h-6 w-6 text-purple-600" />
                          <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{service.duration}</p>
                          <p className="text-sm font-semibold text-purple-600">₹{service.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                                 {/* Package Selection */}
                 {selectedService && (
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Package</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`relative p-6 border-2 rounded-lg text-left transition-all ${
                            selectedPackage === pkg.id
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-purple-300"
                          } ${pkg.popular ? "ring-2 ring-purple-200" : ""}`}
                        >
                          {pkg.popular && (
                            <div className="absolute -top-2 -left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                              Popular
                            </div>
                          )}
                          <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                          <p className="text-2xl font-bold text-purple-600 mt-2">₹{pkg.price}</p>
                          <p className="text-sm text-gray-600 mt-1">{pkg.duration} • {pkg.images} images</p>
                          <ul className="text-xs text-gray-600 mt-3 space-y-1">
                            {pkg.features.slice(0, 3).map((feature, index) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
                
                {/* Date Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Date</h3>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input-field"
                  />
                </div>

                                 {/* Time Selection */}
                 <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Time</h3>
                   <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          selectedTime === slot.time
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : slot.available
                            ? "border-gray-200 hover:border-purple-300"
                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add-Ons (Optional)</h2>
                <p className="text-gray-600 mb-6">Enhance your photography session with these additional services.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addOns.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => handleAddOnToggle(addon.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        selectedAddOns.includes(addon.id)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl mb-2">{addon.icon}</div>
                          <h4 className="font-semibold text-gray-900">{addon.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{addon.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">₹{addon.price}</p>
                          <div className={`w-5 h-5 rounded border-2 mt-2 ${
                            selectedAddOns.includes(addon.id)
                              ? "bg-purple-500 border-purple-500"
                              : "border-gray-300"
                          }`}>
                            {selectedAddOns.includes(addon.id) && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      {...register('phone', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/,
                          message: 'Please enter a valid Indian phone number'
                        }
                      })}
                      className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Address Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <textarea
                    {...register('address', { required: 'Address is required' })}
                    className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                    rows={3}
                    placeholder="Enter your complete address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      {...register('city', { required: 'City is required' })}
                      className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      {...register('state', { required: 'State is required' })}
                      className={`input-field ${errors.state ? 'border-red-500' : ''}`}
                      placeholder="Enter your state"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                    <input
                      type="text"
                      {...register('pincode', { 
                        required: 'PIN code is required',
                        pattern: {
                          value: /^\d{6}$/,
                          message: 'PIN code must be 6 digits'
                        }
                      })}
                      className={`input-field ${errors.pincode ? 'border-red-500' : ''}`}
                      placeholder="Enter PIN code"
                      maxLength={6}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    {...register('notes')}
                    className="input-field"
                    rows={3}
                    placeholder="Any special requests or additional information..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </button>
            
            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={!canProceed() || isLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                {isLoading ? "Processing..." : "Complete Booking"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>

          {/* Booking Summary */}
          {(selectedService || selectedPackage || selectedDate || selectedTime) && (
            <div className="mt-6 sm:mt-8 card p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                {selectedService && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{services.find(s => s.id === selectedService)?.name}</span>
                  </div>
                )}
                {selectedPackage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package:</span>
                    <span className="font-medium">{packages.find(p => p.id === selectedPackage)?.name}</span>
                  </div>
                )}
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                )}
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Add-ons:</span>
                    <span className="font-medium">{selectedAddOns.length} selected</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-purple-600">₹{getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingPage
