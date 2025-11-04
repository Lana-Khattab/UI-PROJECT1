import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Plus, X, Upload, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const cuisines = ['Italian', 'American', 'Mediterranean', 'Japanese', 'Indian', 'French', 'Mexican', 'Chinese'];
const diets = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Pescatarian', 'Dairy-Free'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
const difficulties = ['Easy', 'Medium', 'Hard'];

export function CreateRecipe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cuisine: '',
    difficulty: '',
    cookTime: '',
    servings: '',
    imageUrl: ''
  });
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [nutrition, setNutrition] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDiet = (diet: string) => {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter(d => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
  };

  const toggleMealType = (type: string) => {
    if (selectedMealTypes.includes(type)) {
      setSelectedMealTypes(selectedMealTypes.filter(t => t !== type));
    } else {
      setSelectedMealTypes([...selectedMealTypes, type]);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.cuisine) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedMealTypes.length === 0) {
      toast.error('Please select at least one meal type');
      return;
    }

    if (ingredients.filter(i => i.trim()).length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    if (instructions.filter(i => i.trim()).length === 0) {
      toast.error('Please add at least one instruction');
      return;
    }

    // Success
    toast.success('Recipe created successfully!');
    setTimeout(() => {
      navigate('/recipes');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="mb-2">Create New Recipe</h1>
          <p className="text-gray-600">Share your culinary creation with the Foodies community</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <Card className="p-6 mb-6">
            <h3 className="mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Recipe Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Creamy Garlic Pasta"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your recipe..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  />
                  <Button type="button" variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cuisine">Cuisine *</Label>
                  <Select value={formData.cuisine} onValueChange={(value) => handleInputChange('cuisine', value)}>
                    <SelectTrigger id="cuisine">
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuisines.map(cuisine => (
                        <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cookTime">Cook Time (minutes)</Label>
                  <Input
                    id="cookTime"
                    type="number"
                    placeholder="30"
                    value={formData.cookTime}
                    onChange={(e) => handleInputChange('cookTime', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    placeholder="4"
                    value={formData.servings}
                    onChange={(e) => handleInputChange('servings', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Categories */}
          <Card className="p-6 mb-6">
            <h3 className="mb-4">Categories</h3>

            <div className="space-y-4">
              <div>
                <Label>Meal Type *</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mealTypes.map(type => (
                    <Badge
                      key={type}
                      variant={selectedMealTypes.includes(type) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleMealType(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Diet</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {diets.map(diet => (
                    <Badge
                      key={diet}
                      variant={selectedDiets.includes(diet) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleDiet(diet)}
                    >
                      {diet}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Ingredients */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Ingredients *</h3>
              <Button type="button" size="sm" onClick={addIngredient}>
                <Plus className="w-4 h-4 mr-1" />
                Add Ingredient
              </Button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Ingredient ${index + 1}`}
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                  />
                  {ingredients.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Instructions *</h3>
              <Button type="button" size="sm" onClick={addInstruction}>
                <Plus className="w-4 h-4 mr-1" />
                Add Step
              </Button>
            </div>

            <div className="space-y-3">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <Textarea
                    placeholder={`Step ${index + 1}`}
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    rows={2}
                  />
                  {instructions.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeInstruction(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Nutrition */}
          <Card className="p-6 mb-6">
            <h3 className="mb-4">Nutrition Information (Optional)</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="0"
                  value={nutrition.calories}
                  onChange={(e) => setNutrition(prev => ({ ...prev, calories: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  placeholder="0"
                  value={nutrition.protein}
                  onChange={(e) => setNutrition(prev => ({ ...prev, protein: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  placeholder="0"
                  value={nutrition.carbs}
                  onChange={(e) => setNutrition(prev => ({ ...prev, carbs: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  placeholder="0"
                  value={nutrition.fat}
                  onChange={(e) => setNutrition(prev => ({ ...prev, fat: e.target.value }))}
                />
              </div>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1">
              Publish Recipe
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
