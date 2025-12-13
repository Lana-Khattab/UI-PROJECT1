import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden" role="banner">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{backgroundImage: 'url("https://images.unsplash.com/photo-1636647511414-c9ec06da32bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwY29va2luZyUyMGtpdGNoZW58ZW58MXx8fHwxNzYyMDM3OTY5fDA&ixlib=rb-4.1.0&q=80&w=1080")'}}
        role="img"
        aria-label="Kitchen with cooking scene"
      />
      
      <div className="absolute inset-0 bg-black/40" />
    
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.h1 
            className="text-4xl md:text-6xl text-white font-bold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Discover, share, and savor the world
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            Join our community of food lovers and explore thousands of delicious recipes from around the globe. Share your culinary creations and connect with fellow foodies.
          </motion.p>
          
          <motion.div 
            className="pt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/signup" className="bg-gray-900 dark:bg-orange-600 text-white px-6 py-3 rounded-md text-lg hover:bg-gray-800 dark:hover:bg-orange-700 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                Join us!
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
