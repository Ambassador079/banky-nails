import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Heart, Sparkles } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Sparkles,
      title: "Premium Products",
      description: "Only the finest quality gels, acrylics, and nail care products"
    },
    {
      icon: Heart,
      title: "Personal Touch",
      description: "Every set is uniquely crafted to match your style and personality"
    },
    {
      icon: Award,
      title: "5+ Years Experience",
      description: "Trusted by hundreds of clients for consistent, stunning results"
    }
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-nude to-dusty/30 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80"
                alt="Nail artist at work"
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-mocha/20 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm tracking-[0.3em] text-mocha uppercase mb-4">
              About Me
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
              Crafting Beauty,<br />
              <span className="text-mocha italic">One Nail at a Time</span>
            </h2>
            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              <p>
                Hi, I&apos;m Banky - a passionate nail artist dedicated to transforming 
                your nails into stunning works of art. With over 5 years of experience, 
                I&apos;ve perfected the art of creating bespoke nail designs that reflect 
                your unique personality.
              </p>
              <p>
                From classic elegance to bold statements, I believe every set of nails 
                tells a story. My studio is a sanctuary where creativity meets precision, 
                ensuring you leave feeling confident and beautiful.
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="p-3 bg-nude/50 text-mocha">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">{feature.title}</h3>
                    <p className="text-sm text-charcoal/60">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
