import { motion } from 'framer-motion'

const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl text-mocha tracking-tight">
            BANKY
          </h1>
        </motion.div>
        
        <motion.div
          className="mt-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-[2px] bg-mocha"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{ margin: '0 auto' }}
          />
        </motion.div>

        <motion.p
          className="mt-6 text-sm tracking-[0.3em] text-mocha/70 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Your Go-To Nail Tech
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Preloader
