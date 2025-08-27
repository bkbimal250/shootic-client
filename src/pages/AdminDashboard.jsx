import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  LogOut,
  Camera,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import { adminAPI } from '../services/api'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    totalContacts: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [recentContacts, setRecentContacts] = useState([])
  const [allBookings, setAllBookings] = useState([])
  const [allContacts, setAllContacts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingBookings, setIsLoadingBookings] = useState(false)
  const [isLoadingContacts, setIsLoadingContacts] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }

    fetchDashboardData()
    fetchAllBookings()
    fetchAllContacts()
  }, [currentPage])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      
      if (!token) {
        navigate('/admin/login')
        return
      }
      
      const response = await adminAPI.getDashboard()
      
      if (response.data.success) {
        const dashboardData = response.data.data
        
        setStats({
          totalBookings: dashboardData.overview?.totalBookings || 0,
          totalCustomers: dashboardData.overview?.totalBookings || 0,
          totalRevenue: dashboardData.overview?.totalRevenue || 0,
          pendingBookings: dashboardData.statusBreakdown?.pending || 0,
          totalContacts: dashboardData.overview?.totalContacts || 0
        })
        
        setRecentBookings(dashboardData.recentActivity?.bookings || [])
        setRecentContacts(dashboardData.recentActivity?.contacts || [])
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllBookings = async () => {
    try {
      setIsLoadingBookings(true)
      const response = await adminAPI.getBookings({ 
        page: currentPage, 
        limit: 10
      })
      
      if (response.data.success) {
        setAllBookings(response.data.data.bookings || [])
        setTotalPages(response.data.data.pagination.totalPages || 1)
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
      }
    } finally {
      setIsLoadingBookings(false)
    }
  }

  const fetchAllContacts = async () => {
    try {
      setIsLoadingContacts(true)
      const response = await adminAPI.getContacts({ 
        page: currentPage, 
        limit: 10
      })
      
      if (response.data.success) {
        setAllContacts(response.data.data.contacts || [])
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
      }
    } finally {
      setIsLoadingContacts(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleRefresh = () => {
    fetchDashboardData()
    fetchAllBookings()
    fetchAllContacts()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-secondary-600 rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Shootic Admin</h1>
                <p className="text-xs sm:text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                  {/* Stats Grid */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[
            {
              title: "Total Bookings",
              value: stats.totalBookings,
              icon: Calendar,
              color: "blue",
              change: "+12%"
            },
            {
              title: "Total Customers",
              value: stats.totalCustomers,
              icon: Users,
              color: "green",
              change: "+8%"
            },
            {
              title: "Total Revenue",
              value: `₹${stats.totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: "purple",
              change: "+15%"
            },
                         {
               title: "Pending Bookings",
               value: stats.pendingBookings,
               icon: TrendingUp,
               color: "orange",
               change: "+5%"
             },
             {
               title: "Total Contacts",
               value: stats.totalContacts,
               icon: Mail,
               color: "indigo",
               change: "+10%"
             }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
                 </div>

         {/* Recent Bookings */}
         {recentBookings.length > 0 && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="card p-6 mb-6"
           >
             <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
             <div className="overflow-x-auto -mx-4 sm:mx-0">
               <div className="min-w-full inline-block align-middle">
                 <div className="overflow-hidden">
                   <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                       <tr>
                         <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                         <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Service</th>
                         <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                         <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                         <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                       </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                       {recentBookings.slice(0, 5).map((booking, index) => (
                         <tr key={booking._id || index} className="hover:bg-gray-50">
                           <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                             <div>
                               <p className="text-sm sm:text-base font-medium text-gray-900">{`${booking.firstName} ${booking.lastName}`}</p>
                               <p className="text-xs sm:text-sm text-gray-600">{booking.package || 'Standard'}</p>
                             </div>
                           </td>
                           <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">{booking.service}</td>
                           <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">{new Date(booking.createdAt).toLocaleDateString()}</td>
                           <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">₹{booking.totalAmount}</td>
                           <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                             <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                               booking.status === 'confirmed' 
                                 ? 'bg-green-100 text-green-800'
                                 : booking.status === 'pending'
                                 ? 'bg-yellow-100 text-yellow-800'
                                 : 'bg-red-100 text-red-800'
                             }`}>
                               {booking.status}
                             </span>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
           </motion.div>
                   )}

          {/* Recent Contacts */}
          {recentContacts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="card p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Contact Submissions</h2>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Message</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentContacts.slice(0, 5).map((contact, index) => (
                          <tr key={contact._id || index} className="hover:bg-gray-50">
                            <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                              <div>
                                <p className="text-sm sm:text-base font-medium text-gray-900">{`${contact.firstName} ${contact.lastName}`}</p>
                                <p className="text-xs sm:text-sm text-gray-600">{contact.email}</p>
                              </div>
                            </td>
                            <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                contact.subject === 'booking' 
                                  ? 'bg-purple-100 text-purple-800'
                                  : contact.subject === 'pricing'
                                  ? 'bg-blue-100 text-blue-800'
                                  : contact.subject === 'service'
                                  ? 'bg-green-100 text-green-800'
                                  : contact.subject === 'support'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {contact.subject}
                              </span>
                            </td>
                            <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-600">
                              <div className="max-w-xs truncate" title={contact.message}>
                                {contact.message}
                              </div>
                            </td>
                            <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">{new Date(contact.createdAt).toLocaleDateString()}</td>
                            <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                contact.status === 'read' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {contact.status || 'unread'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* All Bookings with Pagination */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.4 }}
           className="card p-6"
         >
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold text-gray-900">All Bookings</h2>
             <button
               onClick={handleRefresh}
               disabled={isLoadingBookings}
               className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
             >
               <RefreshCw className={`h-4 w-4 ${isLoadingBookings ? 'animate-spin' : ''}`} />
               Refresh
             </button>
           </div>
           
           {isLoadingBookings ? (
             <div className="text-center py-8">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
               <p className="mt-4 text-gray-600">Loading bookings...</p>
             </div>
           ) : allBookings.length > 0 ? (
             <>
               <div className="overflow-x-auto -mx-4 sm:mx-0">
                 <div className="min-w-full inline-block align-middle">
                   <div className="overflow-hidden">
                     <table className="min-w-full divide-y divide-gray-200">
                       <thead className="bg-gray-50">
                         <tr>
                           <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                           <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Service</th>
                           <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                           <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                           <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                         </tr>
                       </thead>
                       <tbody className="bg-white divide-y divide-gray-200">
                         {allBookings.map((booking, index) => (
                           <tr key={booking._id || index} className="hover:bg-gray-50">
                             <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                               <div>
                                 <p className="text-sm sm:text-base font-medium text-gray-900">{`${booking.firstName} ${booking.lastName}`}</p>
                                 <p className="text-xs sm:text-sm text-gray-600">{booking.package || 'Standard'}</p>
                               </div>
                             </td>
                             <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">{booking.service}</td>
                             <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">{new Date(booking.createdAt).toLocaleDateString()}</td>
                             <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">₹{booking.totalAmount}</td>
                             <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                               <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                 booking.status === 'confirmed' 
                                   ? 'bg-green-100 text-green-800'
                                   : booking.status === 'pending'
                                   ? 'bg-yellow-100 text-yellow-800'
                                   : 'bg-red-100 text-red-800'
                               }`}>
                                 {booking.status}
                               </span>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>

               {/* Pagination */}
               {totalPages > 1 && (
                 <div className="flex items-center justify-between mt-6">
                   <div className="text-sm text-gray-700">
                     Page {currentPage} of {totalPages}
                   </div>
                   <div className="flex items-center space-x-2">
                     <button
                       onClick={() => handlePageChange(currentPage - 1)}
                       disabled={currentPage === 1}
                       className="flex items-center gap-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       <ChevronLeft className="h-4 w-4" />
                       Previous
                     </button>
                     
                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                       const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                       return (
                         <button
                           key={page}
                           onClick={() => handlePageChange(page)}
                           className={`px-3 py-2 text-sm rounded-lg ${
                             currentPage === page
                               ? 'bg-purple-600 text-white'
                               : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                           }`}
                         >
                           {page}
                         </button>
                       )
                     })}
                     
                     <button
                       onClick={() => handlePageChange(currentPage + 1)}
                       disabled={currentPage === totalPages}
                       className="flex items-center gap-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       Next
                       <ChevronRight className="h-4 w-4" />
                     </button>
                   </div>
                 </div>
               )}
             </>
           ) : (
             <div className="text-center py-8">
               <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
               <p className="text-gray-600">No bookings found</p>
             </div>
           )}
                   </motion.div>

          {/* All Contacts with Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Form Submissions</h2>
              <button
                onClick={handleRefresh}
                disabled={isLoadingContacts}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isLoadingContacts ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            {isLoadingContacts ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading contacts...</p>
              </div>
            ) : allContacts.length > 0 ? (
              <>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {allContacts.map((contact, index) => (
                            <tr key={contact._id || index} className="hover:bg-gray-50">
                              <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                                <div>
                                  <p className="text-sm sm:text-base font-medium text-gray-900">{`${contact.firstName} ${contact.lastName}`}</p>
                                  <p className="text-xs sm:text-sm text-gray-600">{contact.phone}</p>
                                </div>
                              </td>
                              <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">{contact.email}</td>
                              <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  contact.subject === 'booking' 
                                    ? 'bg-purple-100 text-purple-800'
                                    : contact.subject === 'pricing'
                                    ? 'bg-blue-100 text-blue-800'
                                    : contact.subject === 'service'
                                    ? 'bg-green-100 text-green-800'
                                    : contact.subject === 'support'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {contact.subject}
                                </span>
                              </td>
                              <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-600">
                                <div className="max-w-xs truncate" title={contact.message}>
                                  {contact.message}
                                </div>
                              </td>
                              <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600">{new Date(contact.createdAt).toLocaleDateString()}</td>
                              <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  contact.status === 'read' 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {contact.status || 'unread'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No contact submissions found</p>
              </div>
            )}
          </motion.div>

         {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors">
                View All Bookings
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                Manage Customers
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                Generate Reports
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">admin@shootic.com</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Website</span>
                <span className="text-green-600 text-sm">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database</span>
                <span className="text-green-600 text-sm">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API</span>
                <span className="text-green-600 text-sm">Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
