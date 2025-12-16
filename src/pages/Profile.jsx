import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { authAPI, userAPI } from '../utils/api'

function Profile() {
  const { user: authUser, updateProfile: updateAuthProfile, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('recipes')
  const [recipes, setRecipes] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    avatar: ''
  })

  useEffect(() => {
    if (authLoading) {
      console.log('Auth still loading, waiting...')
      return
    }
    
    if (!authUser) {
      console.log('No auth user found, redirecting to login')
      navigate('/login')
      return
    }
    
    console.log('Auth user found:', authUser)
    fetchUserData()
  }, [authUser, authLoading, navigate])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await authAPI.getMe()
      if (response.data.success) {
        const userData = response.data.user
        setUser(userData)
        setRecipes(userData.createdRecipes || [])
        setFavorites(userData.favorites || [])
        setEditForm({
          name: userData.name || '',
          bio: userData.bio || '',
          
          avatar: userData.avatar || ''
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (isEditing) {
      setEditForm({
        name: user?.name || '',
        bio: user?.bio || '',
        avatar: user?.avatar || ''
      })
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await updateAuthProfile(editForm)
      if (result.success) {
        setUser({ ...user, ...editForm })
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const formatDate = (date) => {
    if (!date) return 'Recently'
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) return 'Recently'
    return parsedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  if (authLoading || loading) {
    return (
      <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <motion.div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-gray-600 dark:text-dark-muted">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-600 dark:text-dark-muted">Unable to load profile</p>
        </div>
      </div>
    )
  }

  const displayRecipes = activeTab === 'recipes' ? recipes : favorites

  return (
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
      <Navbar />
      
      <motion.section 
        className="container mx-auto px-6 py-8 max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-white dark:bg-dark-card rounded-xl shadow dark:shadow-orange-500/5 p-6 mb-6 border dark:border-dark-border transition-colors"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex flex-col items-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full object-cover mb-3" />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center text-3xl font-semibold mb-3">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <label htmlFor="avatar-input" className="sr-only">Avatar URL</label>
                  <input
                    id="avatar-input"
                    type="text"
                    placeholder="Avatar URL"
                    value={editForm.avatar}
                    onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                    className="border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-dark-text rounded-md px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label htmlFor="name-input" className="sr-only">Name</label>
                  <input
                    id="name-input"
                    type="text"
                    placeholder="Name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="text-xl font-semibold border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-dark-text rounded-md px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    required
                  />
                  <p className="text-gray-600 dark:text-dark-muted text-sm mb-2">{user.email}</p>
                  <p className="text-gray-600 dark:text-dark-muted text-sm mb-2">Member since {formatDate(user.createdAt)}</p>
                  <label htmlFor="bio-input" className="sr-only">Bio</label>
                  <textarea
                    id="bio-input"
                    placeholder="Bio"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="text-gray-700 dark:text-dark-text text-sm border border-gray-300 dark:border-dark-border dark:bg-dark-border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    rows="3"
                  />
                  <div className="flex gap-2 mt-4">
                    <motion.button 
                      type="submit" 
                      className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save
                    </motion.button>
                    <motion.button 
                      type="button" 
                      onClick={handleEditToggle} 
                      className="border border-gray-300 dark:border-dark-border dark:text-dark-text px-4 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-dark-border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full object-cover mb-3" />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center text-3xl font-semibold mb-3">
                    {getInitials(user.name)}
                  </div>
                )}
              </motion.div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <div>
                    <h2 className="text-xl font-semibold dark:text-dark-text">{user.name}</h2>
                    <p className="text-gray-600 dark:text-dark-muted text-sm flex items-center gap-2">{user.email}</p>
                    <p className="text-gray-600 dark:text-dark-muted text-sm flex items-center gap-2">Member since {formatDate(user.createdAt)}</p>
                  </div>
                  <motion.button 
                    onClick={handleEditToggle} 
                    className="mt-4 md:mt-0 bg-gray-900 dark:bg-orange-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1 hover:bg-gray-800 dark:hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Edit profile"
                  >
                    Edit Profile
                  </motion.button>
                </div>
                <p className="text-gray-700 dark:text-dark-muted text-sm mt-2">
                  {user.bio || 'No bio yet. Click "Edit Profile" to add one!'}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="bg-white dark:bg-dark-card border dark:border-dark-border rounded-xl p-6 text-center transition-colors"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-3xl font-semibold text-orange-500">{recipes.length}</p>
            <p className="text-gray-600 dark:text-dark-muted text-sm">Recipes Created</p>
          </motion.div>
          <motion.div 
            className="bg-white dark:bg-dark-card border dark:border-dark-border rounded-xl p-6 text-center transition-colors"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-3xl font-semibold text-orange-500">{favorites.length}</p>
            <p className="text-gray-600 dark:text-dark-muted text-sm">Favorites</p>
          </motion.div>
          <motion.div 
            className="bg-white dark:bg-dark-card border dark:border-dark-border rounded-xl p-6 text-center transition-colors"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-3xl font-semibold text-orange-500">{user.collections?.length || 0}</p>
            <p className="text-gray-600 dark:text-dark-muted text-sm">Collections</p>
          </motion.div>
        </motion.div>

        <motion.nav 
          className="flex gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          role="tablist"
          aria-label="Recipe tabs"
        >
          <motion.button 
            onClick={() => setActiveTab('recipes')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              activeTab === 'recipes' ? 'bg-orange-500 text-white' : 'text-gray-600 dark:text-dark-muted hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            role="tab"
            aria-selected={activeTab === 'recipes'}
          >
            My Recipes
          </motion.button>
          <motion.button 
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              activeTab === 'favorites' ? 'bg-orange-500 text-white' : 'text-gray-600 dark:text-dark-muted hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            role="tab"
            aria-selected={activeTab === 'favorites'}
          >
            Favorites
          </motion.button>
        </motion.nav>

        {displayRecipes.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 dark:text-dark-muted text-lg">
              {activeTab === 'recipes' ? 'No recipes created yet' : 'No favorites yet'}
            </p>
            <motion.button 
              onClick={() => navigate(activeTab === 'recipes' ? '/add-recipe' : '/explore')}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === 'recipes' ? 'Create Recipe' : 'Explore Recipes'}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {displayRecipes.map((recipe, index) => (
              <motion.div 
                key={recipe._id} 
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow dark:shadow-orange-500/5 hover:shadow-md dark:hover:shadow-orange-500/10 transition-all cursor-pointer border dark:border-dark-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                role="article"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    navigate(`/recipe/${recipe._id}`)
                  }
                }}
                aria-label={`View recipe: ${recipe.title}`}
              >
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-dark-text text-xs font-medium px-2 py-1 rounded-full transition-colors">
                      {recipe.difficulty}
                    </span>
                    {recipe.rating > 0 && (
                      <span className="text-yellow-500 text-sm" aria-label={`Rating: ${recipe.rating.toFixed(1)} out of 5`}>★ {recipe.rating.toFixed(1)}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg dark:text-dark-text">{recipe.title}</h3>
                  <p className="text-gray-600 dark:text-dark-muted text-sm flex items-center gap-1">
                    {recipe.time} min • {recipe.servings} servings
                  </p>
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-2 text-xs">
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 dark:bg-dark-border dark:text-dark-text px-2 py-1 rounded-md transition-colors">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
    </div>
  )
}

export default Profile
