import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock, Star, Heart, DollarSign } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Recipe } from '../../data/mockRecipes';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite?: (id: string) => void;
}

export function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/recipe/${recipe.id}`}>
        <div className="relative aspect-video">
          <ImageWithFallback 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-white/90 text-black hover:bg-white">
            {recipe.difficulty}
          </Badge>
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite(recipe.id);
              }}
              className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${recipe.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className="mb-2 hover:text-orange-500 transition-colors">{recipe.title}</h3>
        </Link>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{recipe.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{recipe.cuisine}</Badge>
          {recipe.diet.slice(0, 2).map((diet) => (
            <Badge key={diet} variant="outline">{diet}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-gray-700">Total cost:</span>
          <span className="text-green-600">${recipe.budget}</span>
        </div>
      </div>
    </Card>
  );
}
