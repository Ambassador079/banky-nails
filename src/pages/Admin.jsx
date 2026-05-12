import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  LogOut,
  Eye,
  Filter,
  RefreshCw,
  MessageCircle,
  Lock
} from 'lucide-react'
import { 
  getBookings, 
  updateBookingStatus, 
  deleteBooking, 
  getBookingStats,
  formatDate 
} from '../services/bookingService'
import toast, { Toaster } from 'react-hot-toast'

// Simple password protection - In production, use proper authentication
const ADMIN_PASSWORD = 'banky2024' // Change this!

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({})
  const [filter, setFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem('banky_admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings()
    }
  }, [isAuthenticated])

  const loadBookings = () => {
    const data = getBookings()
    setBookings(data)
    setStats(getBookingStats())
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('banky_admin_auth', 'true')
      toast.success('Welcome back, BANKY!')
    } else {
      toast.error('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('banky_admin_auth')
    setPassword('')
  }

  const handleStatusUpdate = (id, status) => {
    updateBookingStatus(id, status)
    loadBookings()
    toast.success(`Booking ${status}`)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id)
      loadBookings()
      setSelectedBooking(null)
      toast.success('Booking deleted')
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <Toaster position="top-center" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl text-charcoal mb-2">BANKY</h1>
            <p className="text-charcoal/60">Admin Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white p-8 shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-mocha/10 rounded-full flex items-center justify-center">
                <Lock className="text-mocha" size={28} />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Enter Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-charcoal/20 focus:border-mocha focus:outline-none text-base"
                placeholder="Admin password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-mocha text-cream font-medium hover:bg-mocha-dark transition-colors min-h-[48px]"
            >
              Access Dashboard
            </button>
          </form>

          <p className="text-center text-sm text-charcoal/50 mt-4">
            <a href="/" className="hover:text-mocha">Back to Website</a>
          </p>
        </motion.div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-charcoal">BANKY</h1>
            <p className="text-sm text-charcoal/60">Booking Management</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={loadBookings}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Refresh"
            >
              <RefreshCw size={20} className="text-charcoal/60" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-charcoal/70 hover:text-charcoal transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'bg-charcoal' },
            { label: 'Pending', value: stats.pending, color: 'bg-yellow-500' },
            { label: 'Confirmed', value: stats.confirmed, color: 'bg-green-500' },
            { label: 'Completed', value: stats.completed, color: 'bg-blue-500' },
            { label: 'Cancelled', value: stats.cancelled, color: 'bg-red-500' }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className={`w-3 h-3 rounded-full ${stat.color} mb-2`} />
              <p className="text-2xl font-semibold text-charcoal">{stat.value || 0}</p>
              <p className="text-sm text-charcoal/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter size={18} className="text-charcoal/60 flex-shrink-0" />
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === status
                  ? 'bg-mocha text-cream'
                  : 'bg-white text-charcoal/70 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Calendar size={48} className="mx-auto text-charcoal/30 mb-4" />
            <p className="text-charcoal/60">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-charcoal truncate">{booking.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-charcoal/60">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(booking.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {booking.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={14} />
                          {booking.phone}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-mocha font-medium">{booking.service}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} className="text-charcoal/60" />
                      </button>
                      <a
                        href={`https://wa.me/${booking.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                        title="WhatsApp Client"
                      >
                        <MessageCircle size={18} className="text-green-600" />
                      </a>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle size={18} className="text-green-600" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <XCircle size={18} className="text-red-600" />
                          </button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'completed')}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl text-charcoal">Booking Details</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <p className="text-sm text-charcoal/50">ID: #{selectedBooking.id}</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <User size={20} className="text-mocha mt-0.5" />
                  <div>
                    <p className="text-sm text-charcoal/60">Client Name</p>
                    <p className="font-medium text-charcoal">{selectedBooking.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-mocha mt-0.5" />
                  <div>
                    <p className="text-sm text-charcoal/60">Phone</p>
                    <a href={`tel:${selectedBooking.phone}`} className="font-medium text-charcoal hover:text-mocha">
                      {selectedBooking.phone}
                    </a>
                  </div>
                </div>

                {selectedBooking.email && (
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-mocha mt-0.5" />
                    <div>
                      <p className="text-sm text-charcoal/60">Email</p>
                      <a href={`mailto:${selectedBooking.email}`} className="font-medium text-charcoal hover:text-mocha">
                        {selectedBooking.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-mocha mt-0.5" />
                  <div>
                    <p className="text-sm text-charcoal/60">Service</p>
                    <p className="font-medium text-charcoal">{selectedBooking.service}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-mocha mt-0.5" />
                    <div>
                      <p className="text-sm text-charcoal/60">Date</p>
                      <p className="font-medium text-charcoal">{formatDate(selectedBooking.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-mocha mt-0.5" />
                    <div>
                      <p className="text-sm text-charcoal/60">Time</p>
                      <p className="font-medium text-charcoal">{selectedBooking.time}</p>
                    </div>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-charcoal/60 mb-1">Notes</p>
                    <p className="text-charcoal">{selectedBooking.notes}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 text-sm text-charcoal/50">
                  <p>Submitted: {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                  {selectedBooking.updatedAt && (
                    <p>Last Updated: {new Date(selectedBooking.updatedAt).toLocaleString()}</p>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <a
                  href={`https://wa.me/${selectedBooking.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-green-600 text-white font-medium text-center rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
                <button
                  onClick={() => handleDelete(selectedBooking.id)}
                  className="px-4 py-3 border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Admin
