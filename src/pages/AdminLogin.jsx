import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Camera, Lock } from 'lucide-react'
import { authAPI } from '../services/api'

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    console.log('🔍 Login attempt with data:', data)
    
    try {
      console.log('📤 Making API request to:', import.meta.env.VITE_API_URL || 'https://shootphoto.onrender.com/api')
      const response = await authAPI.login(data)
      console.log('✅ Login response:', response.data)
      
      if (response.data.success) {
        const token = response.data.data.token
        
        if (!token) {
          console.error('❌ No token received')
          toast.error('Login failed - No token received')
          return
        }
        
        localStorage.setItem('adminToken', token)
        toast.success('Login successful!')
        navigate('/admin/dashboard')
      } else {
        console.error('❌ Login failed:', response.data.message)
        toast.error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      console.error('❌ Error response:', error.response?.data)
      const errorMessage = error.response?.data?.message || 'Invalid credentials. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23purple' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card p-6 sm:p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Camera className="w-10 h-10 text-purple-600" />
              </div>
              <div className="inline-block bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-600 px-4 py-2 mb-4 rounded-full text-sm font-semibold border border-purple-200">
                🔐 Admin Access
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                Welcome to <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Shootic</span> Dashboard
              </h1>
              <p className="text-gray-600">Access your photography business dashboard</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Password is required' })}
                    className={`input-field pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative group w-full inline-flex items-center justify-center disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-75 group-hover:opacity-100"></div>
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-6 py-3 rounded-xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 inline-flex items-center">
                  <Lock className="mr-2 h-4 w-4" />
                  {isLoading ? "Signing In..." : "Sign In"}
                </div>
              </button>
            </form>

            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 p-4 rounded-xl border border-purple-200">
                <p className="text-sm text-gray-700 font-medium mb-2">Demo Credentials</p>
                <p className="text-xs text-gray-600">
                  Email: <span className="font-mono text-purple-600">admin@shootic.com</span>
                </p>
                <p className="text-xs text-gray-600">
                  Password: <span className="font-mono text-purple-600">admin123</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
