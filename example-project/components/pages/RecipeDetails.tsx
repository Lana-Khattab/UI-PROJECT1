import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Heart,
  Calendar,
  Clock,
  Users,
  Star,
  ChefHat,
  ArrowLeft,
  Check,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { mockRecipes } from '../../data/mockRecipes';
import { toast } from 'sonner@2.0.3';

export function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = mockRecipes.find((r) => r.id === id);

  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite || false);
  const [isInMealPlan, setIsInMealPlan] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [comment, setComment] = useState('');

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Recipe not found</h2>
          <Button onClick={() => navigate('/recipes')}>Browse Recipes</Button>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const addToMealPlan = () => {
    setIsInMealPlan(true);
    toast.success('Added to your meal plan!');
  };

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((i) => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const submitComment = () => {
    if (!comment.trim()) return;
    toast.success('Comment posted!');
    setComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-black">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <Button variant="secondary" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-white text-black">{recipe.cuisine}</Badge>
              <Badge className="bg-white text-black">{recipe.difficulty}</Badge>
              {recipe.diet.map((d) => (
                <Badge
                  key={d}
                  variant="outline"
                  className="border-white text-white"
                >
                  {d}
                </Badge>
              ))}
            </div>
            <h1 className="mb-2">{recipe.title}</h1>
            <p className="text-lg opacity-90 max-w-3xl">{recipe.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <ChefHat className="w-5 h-5" />
                <span>by {recipe.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>
                  {recipe.rating} ({recipe.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Info & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex justify-center mb-2">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-sm text-gray-600">Cook Time</p>
                <p className="font-semibold">{recipe.cookTime} min</p>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-sm text-gray-600">Servings</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  <Star className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="font-semibold">{recipe.rating}/5</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={toggleFavorite}
                variant={isFavorite ? 'default' : 'outline'}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${
                    isFavorite ? 'fill-current' : ''
                  }`}
                />
                {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </Button>
              <Button
                className="flex-1"
                onClick={addToMealPlan}
                variant={isInMealPlan ? 'default' : 'outline'}
                disabled={isInMealPlan}
              >
                <Calendar className="w-5 h-5 mr-2" />
                {isInMealPlan ? 'In Meal Plan' : 'Add to Meal Plan'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="ingredients" className="mb-8">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="mt-6">
            <Card className="p-6">
              <h3 className="mb-4">Ingredients</h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="mt-6">
            <Card className="p-6">
              <h3 className="mb-4">Instructions</h3>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 p-4 rounded-lg transition-colors ${
                      completedSteps.includes(index)
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <button
                      onClick={() => toggleStep(index)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        completedSteps.includes(index)
                          ? 'bg-green-500 text-white'
                          : 'bg-white border-2 border-gray-300'
                      }`}
                    >
                      {completedSteps.includes(index) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </button>
                    <p
                      className={
                        completedSteps.includes(index)
                          ? 'line-through text-gray-500'
                          : ''
                      }
                    >
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <Card className="p-6">
              <h3 className="mb-4">Nutrition Facts</h3>
              <p className="text-sm text-gray-600 mb-6">
                Per serving ({recipe.servings} servings)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-semibold text-orange-500">
                    {recipe.nutrition.calories}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Calories</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-semibold text-orange-500">
                    {recipe.nutrition.protein}g
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Protein</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-semibold text-orange-500">
                    {recipe.nutrition.carbs}g
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Carbs</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-semibold text-orange-500">
                    {recipe.nutrition.fat}g
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Fat</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* === NEW Mood + Seasonal + Comment Sections === */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="mb-3 font-semibold">Mood Based</h3>
            <div className="flex flex-wrap gap-2">
              {['Comfort', 'Energizing', 'Cozy', 'Fresh', 'Romantic'].map(
                (mood) => (
                  <Badge
                    key={mood}
                    variant="outline"
                    className="cursor-pointer hover:bg-orange-100 hover:text-orange-600 transition"
                  >
                    {mood}
                  </Badge>
                )
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-3 font-semibold">Suitable Season</h3>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="fall">Fall</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
              </SelectContent>
            </Select>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h3 className="mb-4 font-semibold">Add a Comment</h3>
          <Textarea
            placeholder="Share your thoughts about this recipe..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="mb-3"
          />
          <Button onClick={submitComment} disabled={!comment.trim()}>
            Post Comment
          </Button>
        </Card>

        {/* Reviews Section */}
        <Card className="p-6">
          <h3 className="mb-4">Reviews ({recipe.reviews})</h3>
          <div className="space-y-4">
            {[
              {
                name: 'John D.',
                rating: 5,
                comment: 'Absolutely delicious! My family loved it.',
                time: '2 days ago',
              },
              {
                name: 'Emma S.',
                rating: 5,
                comment: 'Easy to follow and tastes amazing!',
                time: '1 week ago',
              },
              {
                name: 'Mark T.',
                rating: 4,
                comment: 'Great recipe, will make again.',
                time: '2 weeks ago',
              },
            ].map((review, index) => (
              <div
                key={index}
                className="border-b last:border-b-0 pb-4 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span>{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.time}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
