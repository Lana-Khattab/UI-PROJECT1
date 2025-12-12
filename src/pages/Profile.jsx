import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { authAPI, userAPI } from '../utils/api'

function Profile() {
  const { user: authUser, updateProfile: updateAuthProfile } = useAuth()
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
    if (!authUser) {
      navigate('/login')
      return
    }
    fetchUserData()
  }, [authUser, navigate])

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

  if (loading) {
    return (
      <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-600">Unable to load profile</p>
        </div>
      </div>
    )
  }

  const displayRecipes = activeTab === 'recipes' ? recipes : favorites

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
      
      <section className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex flex-col items-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full object-cover mb-3" />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-3xl font-semibold mb-3">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Avatar URL"
                    value={editForm.avatar}
                    onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-full"
                  />
                </div>
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="text-xl font-semibold border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
                    required
                  />
                  <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                  <p className="text-gray-600 text-sm mb-2">Member since {formatDate(user.createdAt)}</p>
                  <textarea
                    placeholder="Bio"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="text-gray-700 text-sm border border-gray-300 rounded-md px-3 py-2 w-full"
                    rows="3"
                  />
                  <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600">
                      Save
                    </button>
                    <button type="button" onClick={handleEditToggle} className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex flex-col items-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full object-cover mb-3" />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-3xl font-semibold mb-3">
                    {getInitials(user.name)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600 text-sm flex items-center gap-2">{user.email}</p>
                    <p className="text-gray-600 text-sm flex items-center gap-2">Member since {formatDate(user.createdAt)}</p>
                  </div>
                  <button onClick={handleEditToggle} className="mt-4 md:mt-0 bg-gray-900 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1 hover:bg-gray-800">
                    Edit Profile
                  </button>
                </div>
                <p className="text-gray-700 text-sm mt-2">
                  {user.bio || 'No bio yet. Click "Edit Profile" to add one!'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-3xl font-semibold text-orange-500">{recipes.length}</p>
            <p className="text-gray-600 text-sm">Recipes Created</p>
          </div>
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-3xl font-semibold text-orange-500">{favorites.length}</p>
            <p className="text-gray-600 text-sm">Favorites</p>
          </div>
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-3xl font-semibold text-orange-500">{user.collections?.length || 0}</p>
            <p className="text-gray-600 text-sm">Collections</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('recipes')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === 'recipes' ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-orange-100 hover:text-orange-600'
            }`}
          >
            My Recipes
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === 'favorites' ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-orange-100 hover:text-orange-600'
            }`}
          >
            Favorites
          </button>
        </div>

        {displayRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {activeTab === 'recipes' ? 'No recipes created yet' : 'No favorites yet'}
            </p>
            <button 
              onClick={() => navigate(activeTab === 'recipes' ? '/add-recipe' : '/explore')}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
            >
              {activeTab === 'recipes' ? 'Create Recipe' : 'Explore Recipes'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRecipes.map((recipe) => (
              <div 
                key={recipe._id} 
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition cursor-pointer"
              >
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                      {recipe.difficulty}
                    </span>
                    {recipe.rating > 0 && (
                      <span className="text-yellow-500 text-sm">★ {recipe.rating.toFixed(1)}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    {recipe.time} min • {recipe.servings} servings
                  </p>
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-2 text-xs">
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Profile
