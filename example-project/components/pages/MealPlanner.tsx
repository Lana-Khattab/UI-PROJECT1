import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Calendar, Plus, TrendingUp, Shuffle, Trash2 } from 'lucide-react';
import { mockRecipes } from '../../data/mockRecipes';
import { toast } from 'sonner@2.0.3';

interface MealPlanItem {
  day: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  recipe: typeof mockRecipes[0] | null;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner'] as const;

export function MealPlanner() {
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>(() => {
    const plan: MealPlanItem[] = [];
    daysOfWeek.forEach(day => {
      mealTypes.forEach(mealType => {
        plan.push({ day, mealType, recipe: null });
      });
    });
    return plan;
  });

  const addRecipeToSlot = (day: string, mealType: string, recipe: typeof mockRecipes[0]) => {
    setMealPlan(mealPlan.map(item => 
      item.day === day && item.mealType === mealType 
        ? { ...item, recipe } 
        : item
    ));
    toast.success(`${recipe.title} added to ${day} ${mealType}`);
  };

  const removeRecipe = (day: string, mealType: string) => {
    setMealPlan(mealPlan.map(item => 
      item.day === day && item.mealType === mealType 
        ? { ...item, recipe: null } 
        : item
    ));
    toast.success('Recipe removed from meal plan');
  };

  const surpriseMe = () => {
    const newPlan = mealPlan.map(item => {
      if (Math.random() > 0.5) {
        const suitableRecipes = mockRecipes.filter(r => 
          r.mealType.includes(item.mealType)
        );
        const randomRecipe = suitableRecipes[Math.floor(Math.random() * suitableRecipes.length)];
        return { ...item, recipe: randomRecipe };
      }
      return item;
    });
    setMealPlan(newPlan);
    toast.success('Meal plan randomized!');
  };

  const getStats = () => {
    const planned = mealPlan.filter(item => item.recipe !== null);
    const total = mealPlan.length;
    const percentage = Math.round((planned.length / total) * 100);
    
    const breakfastCount = mealPlan.filter(i => i.mealType === 'Breakfast' && i.recipe).length;
    const lunchCount = mealPlan.filter(i => i.mealType === 'Lunch' && i.recipe).length;
    const dinnerCount = mealPlan.filter(i => i.mealType === 'Dinner' && i.recipe).length;

    return { 
      planned: planned.length, 
      total, 
      percentage,
      breakfastCount,
      lunchCount,
      dinnerCount
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Weekly Meal Planner</h1>
            <p className="text-gray-600">Plan your meals for the week ahead</p>
          </div>
          <Button onClick={surpriseMe} variant="outline">
            <Shuffle className="w-4 h-4 mr-2" />
            Surprise Me
          </Button>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Meals Planned</p>
                <p className="text-2xl font-semibold">{stats.planned}/{stats.total}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completion</p>
                <p className="text-2xl font-semibold">{stats.percentage}%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Breakfast</p>
              <div className="flex gap-1">
                {daysOfWeek.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-2 flex-1 rounded ${
                      i < stats.breakfastCount ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Dinner</p>
              <div className="flex gap-1">
                {daysOfWeek.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-2 flex-1 rounded ${
                      i < stats.dinnerCount ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Meal Plan Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-8 gap-2 mb-2">
              <div className="font-semibold p-2">Meal Type</div>
              {daysOfWeek.map(day => (
                <div key={day} className="font-semibold p-2 text-center">
                  {day.substring(0, 3)}
                </div>
              ))}
            </div>

            {mealTypes.map(mealType => (
              <div key={mealType} className="grid grid-cols-8 gap-2 mb-4">
                <div className="flex items-center p-2">
                  <Badge>{mealType}</Badge>
                </div>
                {daysOfWeek.map(day => {
                  const meal = mealPlan.find(
                    m => m.day === day && m.mealType === mealType
                  );
                  return (
                    <MealSlot
                      key={`${day}-${mealType}`}
                      day={day}
                      mealType={mealType}
                      recipe={meal?.recipe || null}
                      onAddRecipe={addRecipeToSlot}
                      onRemoveRecipe={removeRecipe}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MealSlotProps {
  day: string;
  mealType: string;
  recipe: typeof mockRecipes[0] | null;
  onAddRecipe: (day: string, mealType: string, recipe: typeof mockRecipes[0]) => void;
  onRemoveRecipe: (day: string, mealType: string) => void;
}

function MealSlot({ day, mealType, recipe, onAddRecipe, onRemoveRecipe }: MealSlotProps) {
  const suitableRecipes = mockRecipes.filter(r => r.mealType.includes(mealType));

  if (recipe) {
    return (
      <Card className="p-2 group relative hover:shadow-md transition-shadow">
        <div 
          className="w-full h-20 bg-cover bg-center rounded mb-1"
          style={{ backgroundImage: `url(${recipe.image})` }}
        />
        <p className="text-xs truncate">{recipe.title}</p>
        <Button
          size="icon"
          variant="destructive"
          className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onRemoveRecipe(day, mealType)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </Card>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-2 h-full flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-orange-300 transition-colors min-h-[100px]">
          <Plus className="w-6 h-6 text-gray-400" />
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add {mealType} for {day}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {suitableRecipes.map(recipe => (
            <Card 
              key={recipe.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onAddRecipe(day, mealType, recipe)}
            >
              <div 
                className="w-full h-32 bg-cover bg-center rounded mb-2"
                style={{ backgroundImage: `url(${recipe.image})` }}
              />
              <h4 className="mb-1">{recipe.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{recipe.cuisine}</Badge>
                <Badge variant="outline">{recipe.cookTime} min</Badge>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
