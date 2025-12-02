import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'

function Home() {
  const topRecipes = [
    {
      title: 'Classic Margherita Pizza',
      chef: 'Chef Mario',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80'
    },
    {
      title: 'Chicken Tikka Masala',
      chef: 'Chef Priya',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80'
    },
    {
      title: 'Spaghetti Carbonara',
      chef: 'Chef Antonio',
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80'
    }
  ]

  const recommendedRecipes = [
    {
      id: 1,
      title: 'Classic Margherita Pizza',
      chef: 'Chef Mario',
      time: 25,
      servings: 4,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
      tags: ['Italian', 'Pizza', 'Vegetarian']
    },
    {
      id: 2,
      title: 'Chicken Tikka Masala',
      chef: 'Chef Priya',
      time: 35,
      servings: 6,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
      tags: ['Indian', 'Curry', 'Spicy'],
      isFavorite: true
    },
    {
      id: 3,
      title: 'Caesar Salad',
      chef: 'Chef Julia',
      time: 15,
      servings: 4,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80',
      tags: ['Salad', 'Quick', 'Easy']
    },
    {
      id: 4,
      title: 'Beef Tacos',
      chef: 'Chef Carlos',
      time: 20,
      servings: 4,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
      tags: ['Mexican', 'Tacos', 'Quick'],
      isFavorite: true
    },
    {
      id: 5,
      title: 'Pad Thai',
      chef: 'Chef Somchai',
      time: 25,
      servings: 4,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
      tags: ['Thai', 'Noodles', 'Asian']
    },
    {
      id: 6,
      title: 'Greek Salad',
      chef: 'Chef Dimitri',
      time: 10,
      servings: 4,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
      tags: ['Greek', 'Salad', 'Healthy']
    }
  ]

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

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
      <HeroSection />
      
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Sidebar />
          
          <main className="lg:col-span-9 space-y-6">
            <section>
              <h2 className="mb-4">Community Feed</h2>
              <div className="bg-white rounded-xl border p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold">
                      O
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">Owen</span>
                        <span className="text-gray-600"> shared a new recipe</span>
                      </p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold">
                      C
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">Chloe</span>
                        <span className="text-gray-600"> shared a new recipe</span>
                      </p>
                      <p className="text-sm text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4">Top Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topRecipes.map((recipe, index) => (
                  <div key={index} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to="/recipe/1">
                      <div 
                        className="h-32 bg-cover bg-center"
                        style={{backgroundImage: `url('${recipe.image}')`}}
                      />
                      <div className="p-3">
                        <h4 className="font-semibold mb-1">{recipe.title}</h4>
                        <p className="text-sm text-gray-600">by {recipe.chef}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedRecipes.map((recipe) => (
                  <div key={recipe.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/recipe/${recipe.id}`}>
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{backgroundImage: `url('${recipe.image}')`}}
                      />
                    </Link>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/recipe/${recipe.id}`} className="flex-1">
                          <h3 className="font-semibold mb-1 hover:text-orange-500 transition-colors">
                            {recipe.title}
                          </h3>
                        </Link>
                        <button className={`h-8 w-8 p-0 ${recipe.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                          <svg className={`h-4 w-4 ${recipe.isFavorite ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">by {recipe.chef}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{recipe.time} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4">Explore by Cuisine</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cuisines.map((cuisine, index) => (
                  <a href="#" key={index}>
                    <div className="bg-white rounded-xl border p-4 hover:bg-orange-50 hover:border-orange-300 transition-colors text-center">
                      <h4 className="font-semibold mb-1">{cuisine.name}</h4>
                      <p className="text-sm text-gray-600">{cuisine.count} recipes</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">FOODIES</h4>
              <p className="text-sm text-gray-600">
                Your ultimate destination for discovering and sharing delicious recipes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">All Recipes</a></li>
                <li><a href="#" className="hover:text-orange-500">Collections</a></li>
                <li><a href="#" className="hover:text-orange-500">Meal Planner</a></li>
                <li><a href="#" className="hover:text-orange-500">Create Recipe</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">Community Feed</a></li>
                <li><Link to="/profile" className="hover:text-orange-500">Your Profile</Link></li>
                <li><a href="#" className="hover:text-orange-500">Top Chefs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
