import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Adaeze O.",
      role: "Regular Client",
      content: "Banky is absolutely amazing! She took my vague idea and turned it into the most stunning set I've ever had. The attention to detail is unmatched.",
      rating: 5
    },
    {
      id: 2,
      name: "Chioma N.",
      role: "Bride",
      content: "My bridal nails were perfect. Banky understood exactly what I wanted and made my wedding day even more special. Highly recommend!",
      rating: 5
    },
    {
      id: 3,
      name: "Funke A.",
      role: "Regular Client",
      content: "I've been coming to Banky for over a year now and I'm never disappointed. The quality is consistent and she's always so welcoming.",
      rating: 5
    },
    {
      id: 4,
      name: "Temi K.",
      role: "First-time Client",
      content: "Found Banky on Instagram and was blown away by her work. The studio is beautiful, and she made me feel so comfortable. Already booked my next appointment!",
      rating: 5
    }
  ]

  const next = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [])

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  }

  return (
    <section className="py-24 md:py-32 bg-mocha/10" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] text-mocha uppercase mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">
            Client <span className="text-mocha italic">Love</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center px-4 md:px-12"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-mocha text-mocha" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal leading-relaxed mb-8">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <p className="font-medium text-charcoal text-lg">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-charcoal/60 text-sm">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 border border-charcoal/20 hover:bg-charcoal hover:text-cream transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    index === currentIndex ? 'bg-mocha' : 'bg-charcoal/20'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-mocha' : 'bg-charcoal/20'}`} />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 border border-charcoal/20 hover:bg-charcoal hover:text-cream transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
