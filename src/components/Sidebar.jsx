import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRandomRecipe from '../utils/useRandomRecipe'
import { useAuth } from '../context/AuthContext'
import { userAPI } from '../utils/api'

function Sidebar() {
  const goRandom = useRandomRecipe()
  const { user, isAuthenticated } = useAuth()
  const [collections, setCollections] = useState([])

  useEffect(() => {
    if (isAuthenticated) {
      loadCollections()
    }
  }, [isAuthenticated])

  const loadCollections = async () => {
    try {
      const response = await userAPI.getCollections()
      if (response.data.success) {
        setCollections(response.data.collections || [])
      }
    } catch (error) {
      console.error('Error loading collections:', error)
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <aside className="lg:col-span-3 space-y-4">
      <div className="bg-white rounded-xl border p-6">
        {isAuthenticated && user ? (
          <Link to="/profile" className="flex flex-col items-center mb-6 hover:opacity-80 transition">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover mb-3" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-semibold mb-3">
                {getInitials(user.name)}
              </div>
            )}
            <p className="text-sm text-gray-800 font-medium">{user.name}</p>
          </Link>
        ) : (
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-semibold mb-3">
              U
            </div>
            <Link to="/login" className="text-sm text-orange-500 hover:underline">Login</Link>
          </div>
        )}

        <div className="space-y-2 mb-6">
          <button onClick={goRandom} className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-start gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Surprise me
          </button>
          <Link to="/add-recipe" className="w-full bg-gray-900 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-800 flex items-center justify-start gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create recipe
          </Link>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Collections
          </h4>
          {isAuthenticated ? (
            collections.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {collections.slice(0, 5).map((collection) => (
                  <li key={collection._id}>
                    <Link 
                      to={`/collections`} 
                      className="text-gray-700 hover:text-orange-500 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-orange-400" />
                      {collection.name}
                    </Link>
                  </li>
                ))}
                {collections.length > 5 && (
                  <li>
                    <Link to="/collections" className="text-orange-500 hover:underline text-xs">
                      View all ({collections.length})
                    </Link>
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No collections yet</p>
            )
          ) : (
            <p className="text-sm text-gray-500">Login to view collections</p>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
