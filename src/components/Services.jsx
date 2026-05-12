import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      title: "Gel Extensions",
      description: "Lightweight, natural-looking extensions with a glossy finish that lasts 3-4 weeks",
      price: "From $60",
      duration: "2-3 hours",
      popular: true
    },
    {
      title: "Acrylic Full Set",
      description: "Classic acrylic nails with endless shape and length options for a bold look",
      price: "From $55",
      duration: "2-2.5 hours",
      popular: false
    },
    {
      title: "Nail Art",
      description: "Custom hand-painted designs, 3D art, chrome, and embellishments",
      price: "From $15",
      duration: "Add 30-60 min",
      popular: true
    },
    {
      title: "Gel Manicure",
      description: "Long-lasting gel polish on natural nails with cuticle care",
      price: "From $35",
      duration: "1 hour",
      popular: false
    },
    {
      title: "Fills / Infills",
      description: "Maintenance service to fill in grown-out extensions",
      price: "From $40",
      duration: "1.5 hours",
      popular: false
    },
    {
      title: "Nail Repair",
      description: "Fix broken or lifted nails to restore your perfect set",
      price: "From $10",
      duration: "15-30 min",
      popular: false
    }
  ]

  return (
    <section id="services" className="py-24 md:py-32 bg-nude/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] text-mocha uppercase mb-4">
            Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">
            What I <span className="text-mocha italic">Offer</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative bg-cream p-8 hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {service.popular && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-mocha text-cream text-xs tracking-wide">
                  Popular
                </span>
              )}
              
              <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-mocha transition-colors">
                {service.title}
              </h3>
              
              <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-medium text-mocha">{service.price}</p>
                  <p className="text-xs text-charcoal/50 mt-1">{service.duration}</p>
                </div>
                
                <button 
                  onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="p-3 bg-charcoal/5 group-hover:bg-mocha group-hover:text-cream transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={`Book ${service.title}`}
                >
                  <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-charcoal/60 mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 text-mocha font-medium hover:gap-4 transition-all duration-300"
          >
            Get in touch for custom requests
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
