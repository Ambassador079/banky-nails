import { motion } from 'framer-motion'
import { Instagram, MessageCircle, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Book', href: '#booking' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-charcoal text-cream py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-10 pb-12 border-b border-cream/10">
          {/* Brand */}
          <div>
            <a href="#home" className="font-serif text-3xl tracking-tight">
              BANKY
            </a>
            <p className="mt-4 text-cream/60 text-sm leading-relaxed">
              Your go-to nail tech for bespoke nail artistry. 
              Where precision meets elegance.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-cream/60 hover:text-dusty transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-cream/60 hover:text-dusty transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <MessageCircle size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4 text-sm tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                    className="text-cream/60 hover:text-cream transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-medium mb-4 text-sm tracking-wide uppercase">
              Working Hours
            </h3>
            <ul className="space-y-3 text-sm text-cream/60">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9AM - 6PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>10AM - 5PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); scrollToSection('#booking') }}
              className="inline-block mt-6 px-5 py-2 bg-mocha text-cream text-sm hover:bg-mocha-dark transition-colors min-h-[44px] flex items-center justify-center"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-cream/40 text-sm">
              {currentYear} BANKY. All rights reserved.
            </p>
            <Link 
              to="/admin" 
              className="text-cream/30 hover:text-cream/60 text-xs transition-colors"
            >
              Admin
            </Link>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="p-3 border border-cream/20 hover:bg-cream hover:text-charcoal transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
            whileHover={{ y: -4 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
