import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { recipeAPI } from '../utils/api'

function Home() {
  const [favorites, setFavorites] = useState([])
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await recipeAPI.getAll()
        if (response.data.success) {
          setRecipes(response.data.recipes)
        }
      } catch (error) {
        console.error('Error loading recipes:', error)
      } finally {
        setLoading(false)
      }
    }
    loadRecipes()
  }, [])

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const topRecipes = recipes.slice(0, 3)

  const recommendedRecipes = recipes

  const cuisines = [
    { name: 'Italian', count: 150 },
    { name: 'Mexican', count: 98 },
    { name: 'Asian', count: 132 },
    { name: 'American', count: 175 },
    { name: 'Mediterranean', count: 87 },
    { name: 'Indian', count: 110 },
    { name: 'French', count: 65 },
    { name: 'Japanese', count: 92 }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
      <Navbar />
      <HeroSection />
      
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Sidebar />
          
          <main className="lg:col-span-9 space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-gray-900 dark:text-dark-text">Community Feed</h2>
              <div className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-6 transition-colors">
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center font-semibold">
                      O
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold dark:text-dark-text">Owen</span>
                        <span className="text-gray-600 dark:text-dark-muted"> shared a new recipe</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">2 hours ago</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center font-semibold">
                      C
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold dark:text-dark-text">Chloe</span>
                        <span className="text-gray-600 dark:text-dark-muted"> shared a new recipe</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">3 days ago</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <h2 className="mb-4 text-gray-900 dark:text-dark-text">Top Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topRecipes.map((recipe, index) => {
                  const recipeId = recipe._id || recipe.id
                  return (
                  <motion.div 
                    key={recipeId} 
                    className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border overflow-hidden hover:shadow-lg dark:hover:shadow-orange-500/10 transition-all"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Link to={`/recipe/${recipeId}`}>
                      <div 
                        className="h-32 bg-cover bg-center"
                        style={{backgroundImage: `url('${recipe.image}')`}}
                        role="img"
                        aria-label={recipe.title}
                      />
                      <div className="p-3">
                        <h4 className="font-semibold mb-1 dark:text-dark-text">{recipe.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-dark-muted">by {recipe.chef}</p>
                      </div>
                    </Link>
                  </motion.div>
                )})
                }
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <h2 className="mb-4 text-gray-900 dark:text-dark-text">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedRecipes.map((recipe) => {
                  const recipeId = recipe._id || recipe.id
                  return (
                  <motion.div 
                    key={recipeId} 
                    className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border overflow-hidden hover:shadow-lg dark:hover:shadow-orange-500/10 transition-all"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Link to={`/recipe/${recipeId}`}>
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{backgroundImage: `url('${recipe.image}')`}}
                        role="img"
                        aria-label={recipe.title}
                      />
                    </Link>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/recipe/${recipeId}`} className="flex-1">
                          <h3 className="font-semibold mb-1 hover:text-orange-500 transition-colors dark:text-dark-text">
                            {recipe.title}
                          </h3>
                        </Link>
                        <motion.button 
                          onClick={() => toggleFavorite(recipeId)}
                          className={`h-8 w-8 p-0 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded ${favorites.includes(recipeId) ? 'text-red-500' : 'text-gray-400 dark:text-dark-muted hover:text-red-500'}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={favorites.includes(recipeId) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <svg className={`h-4 w-4 ${favorites.includes(recipeId) ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </motion.button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-dark-muted mb-3">by {recipe.chef}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-dark-muted">
                        <div className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{recipe.time} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{recipe.servings}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span style={{fontSize: '11px'}}>Rating:</span>
                          <span>{recipe.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {recipe.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-dark-muted rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
                })}
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <h2 className="mb-4 text-gray-900 dark:text-dark-text">Explore by Cuisine</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cuisines.map((cuisine, index) => (
                  <Link to={`/explore?cuisine=${cuisine.name}`} key={index}>
                    <motion.div 
                      className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-4 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-700 transition-colors text-center focus-within:ring-2 focus-within:ring-orange-500"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <h4 className="font-semibold mb-1 dark:text-dark-text">{cuisine.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-dark-muted">{cuisine.count} recipes</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>
          </main>
        </div>
      </div>

      <footer className="bg-white dark:bg-dark-card border-t dark:border-dark-border mt-12 transition-colors" role="contentinfo">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4 dark:text-dark-text">FOODIES</h4>
              <p className="text-sm text-gray-600 dark:text-dark-muted">
                Your ultimate destination for discovering and sharing delicious recipes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 dark:text-dark-text">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-muted">
                <li><Link to="/explore" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">All Recipes</Link></li>
                <li><Link to="/collections" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Collections</Link></li>
                <li><Link to="/dashboard" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Meal Planner</Link></li>
                <li><Link to="/add-recipe" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Create Recipe</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 dark:text-dark-text">Community</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-muted">
                <li><Link to="/" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Community Feed</Link></li>
                <li><Link to="/profile" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Your Profile</Link></li>
                <li><Link to="/explore" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Top Chefs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 dark:text-dark-text">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-muted">
                <li><Link to="/" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Help Center</Link></li>
                <li><Link to="/" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
