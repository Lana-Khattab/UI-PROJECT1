import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { RecipeCard } from '../recipe/RecipeCard';
import { Shuffle, Plus, Heart, ChevronRight } from 'lucide-react';
import { mockRecipes } from '../../data/mockRecipes';

export function HomePage() {
  const [recipes, setRecipes] = useState(mockRecipes);

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map(r => 
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const topRecipes = recipes.sort((a, b) => b.rating - a.rating).slice(0, 3);
  const latestRecipes = recipes.slice(0, 3);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            <Card className="p-6">
              {/* User Profile */}
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-20 h-20 mb-3">
                  <AvatarFallback className="text-xl bg-orange-100 text-orange-600">
                    U
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-gray-600">Username</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mb-6">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/meal-planner">
                    <Shuffle className="w-4 h-4 mr-2" />
                    Surprise me
                  </Link>
                </Button>
                <Button className="w-full justify-start" asChild>
                  <Link to="/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Create recipe
                  </Link>
                </Button>
              </div>

              {/* Favorites Section */}
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Favorites
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/recipes" className="flex items-center justify-between hover:text-orange-500">
                      <span>• Collection</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/recipes" className="flex items-center justify-between hover:text-orange-500">
                      <span>• Cuisines</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/recipes" className="flex items-center justify-between hover:text-orange-500">
                      <span>• Special diets</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </li>
                </ul>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* Community Feed */}
            <section>
              <h2 className="mb-4">Community Feed</h2>
              <Card className="p-6">
                <div className="space-y-4">
                  {[
                    { user: 'Owen', recipe: 'a new recipe', time: '2 hours ago' },
                    { user: 'Chloe', recipe: 'a new recipe', time: '3 days ago' }
                  ].map((post, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {post.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-semibold">{post.user}</span>
                          <span className="text-gray-600"> shared {post.recipe}</span>
                        </p>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* Top Recipes */}
            <section>
              <h2 className="mb-4">Top Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topRecipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden">
                    <Link to={`/recipe/${recipe.id}`}>
                      <div 
                        className="h-32 bg-cover bg-center"
                        style={{ backgroundImage: `url(${recipe.image})` }}
                      />
                      <div className="p-3">
                        <h4 className="mb-1">{recipe.title}</h4>
                        <p className="text-sm text-gray-600">by {recipe.author}</p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>

            {/* Latest Recipes */}
            <section>
              <h2 className="mb-4">Latest Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {latestRecipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden">
                    <Link to={`/recipe/${recipe.id}`}>
                      <div 
                        className="h-32 bg-cover bg-center"
                        style={{ backgroundImage: `url(${recipe.image})` }}
                      />
                      <div className="p-3">
                        <h4 className="mb-1">{recipe.title}</h4>
                        <p className="text-sm text-gray-600">by {recipe.author}</p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>

            {/* Your Week's Meal Plan */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2>Your week's meal plan</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/meal-planner">View All</Link>
                </Button>
              </div>
              <Card className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                  {daysOfWeek.map((day) => (
                    <Link 
                      key={day}
                      to="/meal-planner"
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center p-2 hover:border-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      <span className="text-sm text-gray-600">{day}</span>
                    </Link>
                  ))}
                </div>
              </Card>
            </section>

            {/* Featured Collections */}
            <section>
              <h2 className="mb-4">Featured Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Quick & Easy',
                    description: 'Meals ready in 30 minutes or less',
                    image: 'https://images.unsplash.com/photo-1647545401834-39096eb7e4ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWljayUyMG1lYWwlMjBwcmVwfGVufDF8fHx8MTc2MjAwNzM5NHww&ixlib=rb-4.1.0&q=80&w=1080',
                    count: '120 recipes'
                  },
                  {
                    title: 'Comfort Food',
                    description: 'Hearty meals that warm the soul',
                    image: 'https://images.unsplash.com/photo-1760537553252-d2db6f20a4a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21mb3J0JTIwZm9vZCUyMGRpc2h8ZW58MXx8fHwxNzYyMDA3Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
                    count: '85 recipes'
                  },
                  {
                    title: 'Healthy Choices',
                    description: 'Nutritious and delicious options',
                    image: 'https://images.unsplash.com/photo-1710750509144-28c8cdb7855d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwY29sbGVjdGlvbiUyMHZhcmlldHl8ZW58MXx8fHwxNzYyMDA3MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
                    count: '95 recipes'
                  }
                ].map((collection, index) => (
                  <Link key={index} to="/recipes">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div 
                        className="h-40 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${collection.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="mb-1">{collection.title}</h3>
                          <p className="text-sm opacity-90">{collection.description}</p>
                          <p className="text-xs mt-2 opacity-75">{collection.count}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Trending This Week */}
            <section>
              <h2 className="mb-4">Trending This Week</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {recipes.slice(3, 7).map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/recipe/${recipe.id}`}>
                      <div 
                        className="h-32 bg-cover bg-center"
                        style={{ backgroundImage: `url(${recipe.image})` }}
                      />
                      <div className="p-3">
                        <h4 className="mb-1 line-clamp-1">{recipe.title}</h4>
                        <p className="text-sm text-gray-600">by {recipe.author}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">{recipe.cookTime} min</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">⭐ {recipe.rating}</span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recommended for You */}
            <section>
              <h2 className="mb-4">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recipes.slice(0, 6).map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
            </section>

            {/* Popular Cuisines */}
            <section>
              <h2 className="mb-4">Explore by Cuisine</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Italian', count: 150 },
                  { name: 'Mexican', count: 98 },
                  { name: 'Asian', count: 132 },
                  { name: 'American', count: 175 },
                  { name: 'Mediterranean', count: 87 },
                  { name: 'Indian', count: 110 },
                  { name: 'French', count: 65 },
                  { name: 'Japanese', count: 92 }
                ].map((cuisine) => (
                  <Link key={cuisine.name} to="/recipes">
                    <Card className="p-4 hover:bg-orange-50 hover:border-orange-300 transition-colors text-center">
                      <h4 className="mb-1">{cuisine.name}</h4>
                      <p className="text-sm text-gray-600">{cuisine.count} recipes</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="mb-4">FOODIES</h4>
              <p className="text-sm text-gray-600">
                Your ultimate destination for discovering and sharing delicious recipes.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/recipes" className="hover:text-orange-500">All Recipes</Link></li>
                <li><Link to="/recipes" className="hover:text-orange-500">Collections</Link></li>
                <li><Link to="/meal-planner" className="hover:text-orange-500">Meal Planner</Link></li>
                <li><Link to="/create" className="hover:text-orange-500">Create Recipe</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-orange-500">Community Feed</Link></li>
                <li><Link to="/profile" className="hover:text-orange-500">Your Profile</Link></li>
                <li><Link to="/recipes" className="hover:text-orange-500">Top Chefs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Foodies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
