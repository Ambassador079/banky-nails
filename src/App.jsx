import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-cream">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Testimonials />
            <Booking />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
