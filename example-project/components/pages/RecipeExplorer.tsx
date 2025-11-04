import { useState, useMemo } from 'react';
import { RecipeCard } from '../recipe/RecipeCard';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Search, Filter, X } from 'lucide-react';
import { mockRecipes } from '../../data/mockRecipes';
import { Button } from '../ui/button';

const cuisines = ['All', 'Italian', 'American', 'Mediterranean', 'Japanese', 'Indian', 'French'];
const diets = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Pescatarian'];
const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];

export function RecipeExplorer() {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [activeTab, setActiveTab] = useState('all');

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map(r => 
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    // Tab filter
    if (activeTab === 'favorites') {
      filtered = filtered.filter(r => r.isFavorite);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Cuisine filter
    if (selectedCuisine !== 'All') {
      filtered = filtered.filter(r => r.cuisine === selectedCuisine);
    }

    // Diet filter
    if (selectedDiet !== 'All') {
      filtered = filtered.filter(r => r.diet.includes(selectedDiet));
    }

    // Meal type filter
    if (selectedMealType !== 'All') {
      filtered = filtered.filter(r => r.mealType.includes(selectedMealType));
    }

    return filtered;
  }, [recipes, searchQuery, selectedCuisine, selectedDiet, selectedMealType, activeTab]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('All');
    setSelectedDiet('All');
    setSelectedMealType('All');
  };

  const hasActiveFilters = searchQuery || selectedCuisine !== 'All' || selectedDiet !== 'All' || selectedMealType !== 'All';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8">Recipe Explorer</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search recipes, ingredients, or keywords..." 
              className="pl-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold">Filters</span>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="ml-auto"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Cuisine</label>
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cuisines.map(cuisine => (
                    <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Diet</label>
              <Select value={selectedDiet} onValueChange={setSelectedDiet}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {diets.map(diet => (
                    <SelectItem key={diet} value={diet}>{diet}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Meal Type</label>
              <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Recipes</TabsTrigger>
            <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No recipes found. Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite} />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {recipes.some(r => r.isFavorite) 
                    ? 'No favorite recipes match your filters.' 
                    : 'No favorite recipes yet. Start exploring and save your favorites!'}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  {filteredRecipes.length} favorite recipe{filteredRecipes.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite} />
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
