import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contactInfo = [
    {
      icon: MapPin,
      title: "Studio Location",
      details: ["Lekki Phase 1", "Lagos, Nigeria"],
      link: "https://maps.google.com"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+234 XXX XXX XXXX"],
      link: "tel:+234XXXXXXXXXX"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@banky.nails"],
      link: "mailto:hello@banky.nails"
    }
  ]

  const socials = [
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/1234567890" }
  ]

  return (
    <section id="contact" className="py-24 md:py-32 bg-charcoal text-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.3em] text-dusty uppercase mb-4">
              Contact
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Let&apos;s <span className="text-dusty italic">Connect</span>
            </h2>
            <p className="text-cream/70 leading-relaxed mb-10">
              Have questions or want to discuss a custom design? Reach out and 
              I&apos;ll get back to you as soon as possible.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="p-3 bg-cream/10 group-hover:bg-dusty/30 transition-colors">
                    <item.icon size={24} className="text-dusty" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-cream/60 text-sm">{detail}</p>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="mt-10 flex gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-cream/20 hover:bg-cream hover:text-charcoal transition-all duration-300 min-h-[56px] min-w-[56px] flex items-center justify-center"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Image/Map Placeholder */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="aspect-square bg-gradient-to-br from-mocha/40 to-dusty/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-cream/30 rounded-full flex items-center justify-center">
                  <MapPin size={32} className="text-cream/60" />
                </div>
                <h3 className="font-serif text-2xl mb-2">Visit the Studio</h3>
                <p className="text-cream/60 mb-6">
                  Located in the heart of Lekki, Lagos
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-6 py-3 border border-cream/30 hover:bg-cream hover:text-charcoal transition-all duration-300 min-h-[48px]"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-dusty/30" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-dusty/30" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
