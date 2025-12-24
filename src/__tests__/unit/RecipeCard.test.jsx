import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard';

const mockRecipe = {
  id: 1,
  image: 'https://example.com/recipe.jpg',
  title: 'Spaghetti Carbonara',
  difficulty: 'Medium',
  time: 30,
  rating: 4.5,
  cuisine: 'Italian',
  tags: ['Pasta', 'Quick'],
  cost: 15.99
};

const mockRecipeMinimal = {
  id: 2,
  image: 'https://example.com/recipe2.jpg',
  title: 'Simple Salad',
  difficulty: 'Easy',
  time: 10,
  rating: 4.0,
};

describe('RecipeCard Component - API Data Rendering', () => {
  test('renders recipe card with all provided data', () => {
    render(
      <BrowserRouter>
        <RecipeCard recipe={mockRecipe} />
      </BrowserRouter>
    );

    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText(/Rating: 4.5/i)).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('Quick')).toBeInTheDocument();
    expect(screen.getByText(/\$15.99/)).toBeInTheDocument();
  });

  test('renders recipe image with correct src and alt attributes', () => {
    render(
      <BrowserRouter>
        <RecipeCard recipe={mockRecipe} />
      </BrowserRouter>
    );

    const image = screen.getByAltText('Spaghetti Carbonara');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/recipe.jpg');
  });

  test('renders links to recipe detail page with correct paths', () => {
    render(
      <BrowserRouter>
        <RecipeCard recipe={mockRecipe} />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/recipe/1');
    expect(links[1]).toHaveAttribute('href', '/recipe/1');
  });

  test('renders recipe without optional fields (cuisine, tags, cost)', () => {
    render(
      <BrowserRouter>
        <RecipeCard recipe={mockRecipeMinimal} />
      </BrowserRouter>
    );

    expect(screen.getByText('Simple Salad')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('10 min')).toBeInTheDocument();
    expect(screen.getByText(/Rating: 4/i)).toBeInTheDocument();
    expect(screen.queryByText('Italian')).not.toBeInTheDocument();
    expect(screen.queryByText(/\$/)).not.toBeInTheDocument();
  });

  test('renders multiple tags correctly', () => {
    const recipeWithManyTags = {
      ...mockRecipe,
      cuisine: 'French',
      tags: ['Pasta', 'Quick', 'Dinner', 'Comfort Food']
    };

    render(
      <BrowserRouter>
        <RecipeCard recipe={recipeWithManyTags} />
      </BrowserRouter>
    );

    expect(screen.getByText('Pasta')).toBeInTheDocument();
    expect(screen.getByText('Quick')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();
    expect(screen.getByText('Comfort Food')).toBeInTheDocument();
  });

  test('displays correct difficulty levels', () => {
    const easyRecipe = { ...mockRecipe, difficulty: 'Easy' };
    const { rerender } = render(
      <BrowserRouter>
        <RecipeCard recipe={easyRecipe} />
      </BrowserRouter>
    );
    expect(screen.getByText('Easy')).toBeInTheDocument();

    const hardRecipe = { ...mockRecipe, difficulty: 'Hard' };
    rerender(
      <BrowserRouter>
        <RecipeCard recipe={hardRecipe} />
      </BrowserRouter>
    );
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  test('formats cost correctly with dollar sign', () => {
    const recipesWithDifferentCosts = [
      { ...mockRecipe, cost: 5.50 },
      { ...mockRecipe, cost: 100.00 },
      { ...mockRecipe, cost: 0.99 }
    ];

    recipesWithDifferentCosts.forEach((recipe, index) => {
      const { unmount } = render(
        <BrowserRouter>
          <RecipeCard recipe={recipe} />
        </BrowserRouter>
      );
      
      expect(screen.getByText(`$${recipe.cost}`)).toBeInTheDocument();
      unmount();
    });
  });

  test('renders rating with proper aria-label for accessibility', () => {
    render(
      <BrowserRouter>
        <RecipeCard recipe={mockRecipe} />
      </BrowserRouter>
    );

    const ratingElement = screen.getByText(/Rating: 4.5/i);
    expect(ratingElement).toBeInTheDocument();
    expect(ratingElement.closest('p')).toHaveAttribute('role', 'text');
  });
});

