import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useRandomRecipe from '../utils/useRandomRecipe'
import { useAuth } from '../context/AuthContext'
import { collectionAPI } from '../utils/api'

function Sidebar() {
  const goRandom = useRandomRecipe()
  const { user, isAuthenticated } = useAuth()
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      loadCollections()
    } else {
      setCollections([])
    }
  }, [isAuthenticated, user])

  const loadCollections = async () => {
    try {
      setLoading(true)
      const response = await collectionAPI.getMyCollections()
      if (response.data.success) {
        const allCollections = response.data.collections || []
        const favoriteCollections = allCollections.filter(c => c.isFavorite)
        setCollections(favoriteCollections)
      }
    } catch (error) {
      console.error('Error loading collections:', error)
      setCollections([])
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <aside className="lg:col-span-3 space-y-4" role="complementary" aria-label="Sidebar">
      <motion.div 
        className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-6 transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isAuthenticated && user ? (
          <Link to="/profile" className="flex flex-col items-center mb-6 hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-orange-500 rounded" aria-label={`Go to ${user.name}'s profile`}>
            {user.avatar ? (
              <motion.img 
                src={user.avatar} 
                alt={user.name} 
                className="w-20 h-20 rounded-full object-cover mb-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.div 
                className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center text-xl font-semibold mb-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {getInitials(user.name)}
              </motion.div>
            )}
            <p className="text-sm text-gray-800 dark:text-dark-text font-medium">{user.name}</p>
          </Link>
        ) : (
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center text-xl font-semibold mb-3" aria-hidden="true">
              U
            </div>
            <Link to="/login" className="text-sm text-orange-500 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">Login</Link>
          </div>
        )}

        <nav className="space-y-2 mb-6" aria-label="Quick actions">
          <motion.button 
            onClick={goRandom} 
            className="w-full border border-gray-300 dark:border-dark-border rounded-md px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-border dark:text-dark-text flex items-center justify-start gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Get a random recipe"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Surprise me
          </motion.button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/add-recipe" className="w-full bg-gray-900 dark:bg-orange-600 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-800 dark:hover:bg-orange-700 flex items-center justify-start gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create recipe
            </Link>
          </motion.div>
        </nav>

        <div>
          <h4 className="mb-3 flex items-center gap-2 font-semibold dark:text-dark-text">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Collections
          </h4>
          {isAuthenticated ? (
            collections.length > 0 ? (
              <ul className="space-y-2 text-sm" role="list">
                {collections.slice(0, 5).map((collection) => (
                  <motion.li 
                    key={collection._id}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to={`/collections`} 
                      className="text-gray-700 dark:text-dark-muted hover:text-orange-500 flex items-center gap-2 focus:outline-none focus:text-orange-500"
                    >
                      <span className="w-2 h-2 rounded-full bg-orange-400" aria-hidden="true" />
                      {collection.name}
                    </Link>
                  </motion.li>
                ))}
                {collections.length > 5 && (
                  <li>
                    <Link to="/collections" className="text-orange-500 hover:underline text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
                      View all ({collections.length})
                    </Link>
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-dark-muted">No collections yet</p>
            )
          ) : (
            <p className="text-sm text-gray-500 dark:text-dark-muted">Login to view collections</p>
          )}
        </div>
      </motion.div>
    </aside>
  )
}

export default Sidebar
