import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const Gallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = ['all', 'gel', 'acrylic', 'art', 'french']

  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", category: "gel", title: "Nude Gel Set" },
    { id: 2, src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&q=80", category: "art", title: "Abstract Art" },
    { id: 3, src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80", category: "french", title: "French Tips" },
    { id: 4, src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80", category: "acrylic", title: "Pink Acrylics" },
    { id: 5, src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", category: "gel", title: "Chrome Finish" },
    { id: 6, src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80", category: "art", title: "Floral Design" },
    { id: 7, src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&q=80", category: "acrylic", title: "Coffin Shape" },
    { id: 8, src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80", category: "french", title: "Modern French" },
  ]

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter)

  const currentIndex = selectedImage 
    ? filteredImages.findIndex(img => img.id === selectedImage.id)
    : -1

  const navigate = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] text-mocha uppercase mb-4">
            Portfolio
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">
            My <span className="text-mocha italic">Work</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-sm tracking-wide capitalize transition-all duration-300 min-h-[44px] ${
                activeFilter === filter
                  ? 'bg-mocha text-cream'
                  : 'bg-nude/50 text-charcoal/70 hover:bg-nude'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="aspect-square overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                layout
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full h-full">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-end p-4">
                    <p className="text-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                      {image.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300 min-h-[48px]"
          >
            See more on Instagram
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-3 text-cream/80 hover:text-cream transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate('prev') }}
              className="absolute left-4 p-3 text-cream/80 hover:text-cream transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate('next') }}
              className="absolute right-4 p-3 text-cream/80 hover:text-cream transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              className="max-w-4xl max-h-[80vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <p className="text-center text-cream/80 mt-4 font-medium">
                {selectedImage.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
