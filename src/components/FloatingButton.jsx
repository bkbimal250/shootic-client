import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  ArrowUp, 
  Phone, 
  MessageCircle, 
  Camera, 
  Sparkles,
  X
} from 'lucide-react'

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Hide floating button on admin pages
  const isAdminPage = location.pathname.includes('/admin')

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setIsExpanded(false)
  }

  const handleAction = (action) => {
    setIsExpanded(false)
    switch (action) {
      case 'phone':
        window.open('tel:+919876543210', '_self')
        break
      case 'contact':
        navigate('/contact')
        break
      case 'booking':
        navigate('/booking')
        break
      default:
        break
    }
  }

  if (isAdminPage) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.6
          }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-20 right-0 mb-4"
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 min-w-[200px]">
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAction('phone')}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-all duration-300 group"
                    >
                      <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                        <Phone className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">Call Us</p>
                        <p className="text-xs text-gray-600">+91 98765 43210</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleAction('contact')}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-all duration-300 group"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <MessageCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">Contact</p>
                        <p className="text-xs text-gray-600">Send us a message</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleAction('booking')}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-all duration-300 group"
                    >
                      <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                        <Camera className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">Book Now</p>
                        <p className="text-xs text-gray-600">Schedule your session</p>
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Main Button */}
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white p-4 rounded-full shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300">
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-bold">Menu</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>

          {/* Scroll to Top Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="relative group mt-3"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Scroll Button */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
              <ArrowUp className="h-5 w-5" />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingButton
