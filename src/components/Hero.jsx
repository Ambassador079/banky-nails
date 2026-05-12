import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-nude/30 via-cream to-cream"
        style={{ scale }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-dusty/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-48 h-48 bg-mocha/10 rounded-full blur-3xl" />

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y, opacity }}
      >
        <motion.p
          className="text-sm md:text-base tracking-[0.3em] text-mocha/70 uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.8 }}
        >
          Your Go-To Nail Tech
        </motion.p>

        <motion.h1
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-charcoal leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <span className="block">Nails That</span>
          <span className="block text-mocha italic">Speak</span>
        </motion.h1>

        <motion.p
          className="mt-8 text-lg md:text-xl text-charcoal/70 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.3 }}
        >
          Where precision meets elegance. Crafting bespoke nail artistry 
          for those who appreciate the finer details.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.5 }}
        >
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-8 py-4 bg-mocha text-cream font-medium tracking-wide hover:bg-mocha-dark transition-all duration-300 min-h-[56px] flex items-center justify-center"
          >
            Book Appointment
          </a>
          <a
            href="#gallery"
            onClick={(e) => { e.preventDefault(); document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-8 py-4 border border-charcoal/30 text-charcoal font-medium tracking-wide hover:bg-charcoal hover:text-cream transition-all duration-300 min-h-[56px] flex items-center justify-center"
          >
            View Gallery
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mocha/60 hover:text-mocha transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 4, duration: 0.6 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
        aria-label="Scroll to about section"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  )
}

export default Hero
