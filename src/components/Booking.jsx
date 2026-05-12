import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, MessageCircle, CheckCircle, Send, Loader2 } from 'lucide-react'
import { saveBooking, generateWhatsAppNotification, generateClientWhatsApp } from '../services/bookingService'
import emailjs from '@emailjs/browser'

const Booking = () => {
  const ref = useRef(null)
  const formRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [savedBooking, setSavedBooking] = useState(null)

  const services = [
    "Gel Extensions",
    "Acrylic Full Set",
    "Nail Art",
    "Gel Manicure",
    "Fills / Infills",
    "Nail Repair"
  ]

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Save booking to storage
      const booking = saveBooking(formData)
      setSavedBooking(booking)

      // Try to send email notification (optional - requires EmailJS setup)
      try {
        // Uncomment and configure if you set up EmailJS
        // await emailjs.sendForm(
        //   'YOUR_SERVICE_ID',
        //   'YOUR_TEMPLATE_ID',
        //   formRef.current,
        //   'YOUR_PUBLIC_KEY'
        // )
      } catch (emailError) {
        console.log('Email notification not configured')
      }

      setIsSubmitted(true)

      // Auto-open WhatsApp notification to BANKY after a short delay
      setTimeout(() => {
        const whatsappUrl = generateWhatsAppNotification(booking)
        window.open(whatsappUrl, '_blank')
      }, 1500)

    } catch (error) {
      console.error('Booking failed:', error)
      alert('Something went wrong. Please try WhatsApp booking instead.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleNewBooking = () => {
    setIsSubmitted(false)
    setSavedBooking(null)
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      notes: ''
    })
  }

  return (
    <section id="booking" className="py-24 md:py-32 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.3em] text-mocha uppercase mb-4">
              Booking
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
              Ready for Your<br />
              <span className="text-mocha italic">Perfect Set?</span>
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Book your appointment today and let&apos;s create something beautiful together. 
              A deposit may be required for first-time clients.
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-nude/30">
                <Calendar className="text-mocha mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium text-charcoal">Working Hours</h3>
                  <p className="text-sm text-charcoal/60">Monday - Saturday: 9AM - 6PM</p>
                  <p className="text-sm text-charcoal/60">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-nude/30">
                <Clock className="text-mocha mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium text-charcoal">Cancellation Policy</h3>
                  <p className="text-sm text-charcoal/60">24 hours notice required for cancellations</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-nude/30">
                <MessageCircle className="text-mocha mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-medium text-charcoal">Quick Booking</h3>
                  <p className="text-sm text-charcoal/60">Prefer WhatsApp? Send a message for faster booking</p>
                  <a 
                    href="https://wa.me/2348012345678" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-mocha font-medium hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSubmitted ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center p-8 bg-nude/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={64} className="text-mocha mb-6" />
                <h3 className="font-serif text-2xl text-charcoal mb-2">Booking Request Sent!</h3>
                <p className="text-charcoal/70 mb-6">
                  Thank you, {savedBooking?.name}! Your booking request has been saved. 
                  A WhatsApp message will open so BANKY can confirm your appointment.
                </p>
                
                <div className="bg-white p-4 w-full mb-6 text-left">
                  <p className="text-sm text-charcoal/60 mb-1">Booking ID</p>
                  <p className="font-mono text-charcoal">#{savedBooking?.id}</p>
                  <div className="mt-3 pt-3 border-t border-charcoal/10">
                    <p className="text-sm"><strong>Service:</strong> {savedBooking?.service}</p>
                    <p className="text-sm"><strong>Date:</strong> {savedBooking?.date}</p>
                    <p className="text-sm"><strong>Time:</strong> {savedBooking?.time}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href={savedBooking ? generateClientWhatsApp(savedBooking) : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-6 bg-green-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors min-h-[48px]"
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                  <button
                    onClick={handleNewBooking}
                    className="flex-1 py-3 px-6 border border-charcoal/20 text-charcoal font-medium hover:bg-charcoal/5 transition-colors min-h-[48px]"
                  >
                    New Booking
                  </button>
                </div>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 bg-nude/20 p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-mocha focus:outline-none transition-colors text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-mocha focus:outline-none transition-colors text-base"
                      placeholder="+234..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-mocha focus:outline-none transition-colors text-base"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-charcoal mb-2">
                    Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-mocha focus:outline-none transition-colors text-base appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-charcoal mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-mocha focus:outline-none transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-charcoal mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-mocha focus:outline-none transition-colors text-base appearance-none cursor-pointer"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-charcoal mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-mocha focus:outline-none transition-colors resize-none text-base"
                    placeholder="Any specific requests or inspiration ideas..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-mocha text-cream font-medium tracking-wide hover:bg-mocha-dark transition-colors duration-300 min-h-[56px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Request Appointment
                    </>
                  )}
                </button>

                <p className="text-xs text-charcoal/50 text-center">
                  By booking, you agree to the cancellation policy. A WhatsApp notification will be sent for confirmation.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Booking
