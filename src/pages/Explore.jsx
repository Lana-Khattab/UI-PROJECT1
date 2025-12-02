import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Explore() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [selectedDiet, setSelectedDiet] = useState('All')
  const [selectedMealType, setSelectedMealType] = useState('All')
  const [activeTab, setActiveTab] = useState('all')
  const [favorites, setFavorites] = useState([2, 4, 6, 8])

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    const cuisineParam = searchParams.get('cuisine')
    
    if (tabParam === 'favorites') {
      setActiveTab('favorites')
    }
    
    if (cuisineParam) {
      setSelectedCuisine(cuisineParam)
    }
  }, [searchParams])

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const recipes = [
    {
      id: 1,
      title: 'Creamy Garlic Pasta',
      image: 'https://images.unsplash.com/photo-1711539137930-3fa2ae6cec60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYxOTUzNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'Easy',
      time: 25,
      rating: 4.8,
      cuisine: 'Italian',
      tags: ['Vegetarian'],
      cost: 8,
      mealType: 'Dinner'
    },
    {
      id: 2,
      title: 'Mediterranean Quinoa Bowl',
      image: 'https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2MTk0NTIxNHww&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'Easy',
      time: 35,
      rating: 4.9,
      cuisine: 'Mediterranean',
      tags: ['Vegan'],
      cost: 12,
      mealType: 'Lunch'
    },
    {
      id: 3,
      title: 'Fluffy Blueberry Pancakes',
      image: 'https://images.unsplash.com/photo-1636743713732-125909a35dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBwYW5jYWtlc3xlbnwxfHx8fDE3NjE5ODczNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'Easy',
      time: 20,
      rating: 4.7,
      cuisine: 'American',
      tags: ['Vegetarian'],
      cost: 9,
      mealType: 'Breakfast'
    },
    {
      id: 4,
      title: 'Herb-Grilled Chicken',
      image: 'https://images.unsplash.com/photo-1496074620649-6b1b02e5c1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NjE4ODg0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'Medium',
      time: 50,
      rating: 4.6,
      cuisine: 'American',
      tags: ['Keto'],
      cost: 15,
      mealType: 'Dinner'
    },
    {
      id: 5,
      title: 'Decadent Chocolate Lava Cake',
      image: 'https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjE5OTgyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'Medium',
      time: 25,
      rating: 4.9,
      cuisine: 'French',
      tags: ['Vegetarian'],
      cost: 10,
      mealType: 'Dessert'
    },
    {
      id: 6,
      title: 'Fresh Sushi Platter',
      image: 'https://images.unsplash.com/photo-1735190093631-d66ecd1bc433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN1c2hpJTIwcGxhdHRlcnxlbnwxfHx8fDE3NjE5OTk3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'Hard',
      time: 45,
      rating: 4.8,
      cuisine: 'Japanese',
      tags: ['Pescatarian'],
      cost: 25,
      mealType: 'Dinner'
    },
    {
      id: 7,
      title: 'Spicy Vegetarian Curry',
      image: 'https://images.unsplash.com/photo-1743674453123-93356ade2891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwY3VycnklMjBkaXNofGVufDF8fHx8MTc2MjAwNTcxOHww&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'Medium',
      time: 30,
      rating: 4.8,
      cuisine: 'Indian',
      tags: ['Vegan'],
      cost: 11,
      mealType: 'Lunch'
    },
    {
      id: 8,
      title: 'Artisan Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1734774421809-48eac182a5cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lbWFkZSUyMHBpenphfGVufDF8fHx8MTc2MTk1MTg4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      difficulty: 'Medium',
      time: 40,
      rating: 4.9,
      cuisine: 'Italian',
      tags: ['Vegetarian'],
      cost: 13,
      mealType: 'Dinner'
    }
  ]

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCuisine = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine
    const matchesDiet = selectedDiet === 'All' || recipe.tags.includes(selectedDiet)
    const matchesMealType = selectedMealType === 'All' || recipe.mealType === selectedMealType
    const matchesTab = activeTab === 'all' || (activeTab === 'favorites' && favorites.includes(recipe.id))

    return matchesSearch && matchesCuisine && matchesDiet && matchesMealType && matchesTab
  })

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Recipe Explorer</h1>

        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search recipes, ingredients, or keywords..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="mb-4">
            <span className="font-semibold">Filters</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Cuisine</label>
              <select 
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Italian</option>
                <option>American</option>
                <option>Mediterranean</option>
                <option>Japanese</option>
                <option>Indian</option>
                <option>French</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Diet</label>
              <select 
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Gluten-Free</option>
                <option>Keto</option>
                <option>Pescatarian</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Meal Type</label>
              <select 
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 border-b">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
            >
              All Recipes
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 font-medium ${activeTab === 'favorites' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
            >
              My Favorites ({favorites.length})
            </button>
          </div>
        </div>

        <div className="mb-4 text-gray-600">Showing {filteredRecipes.length} recipes</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/recipe/${recipe.id}`}>
                <div className="relative">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                  <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium">{recipe.difficulty}</span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(recipe.id)
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100"
                  >
                    <svg className={`w-5 h-5 ${favorites.includes(recipe.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/recipe/${recipe.id}`}>
                  <h3 className="font-semibold mb-2 hover:text-orange-500 transition-colors">{recipe.title}</h3>
                </Link>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{recipe.time} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span style={{fontSize: '10px'}}>⭐</span>
                    <span>{recipe.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{recipe.cuisine}</span>
                  {recipe.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="text-gray-700">Total cost:</span>
                  <span className="text-green-600 font-semibold"> ${recipe.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore
