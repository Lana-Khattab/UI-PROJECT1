export interface Recipe {
  id: string;
  title: string;
  image: string;
  cuisine: string;
  diet: string[];
  mealType: string[];
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  reviews: number;
  author: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isFavorite: boolean;
  budget: number;
}

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Garlic Pasta',
    image: 'https://images.unsplash.com/photo-1711539137930-3fa2ae6cec60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYxOTUzNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Italian',
    diet: ['Vegetarian'],
    mealType: ['Dinner', 'Lunch'],
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 234,
    author: 'Chef Maria',
    description: 'A rich and creamy pasta dish with roasted garlic and parmesan cheese. Perfect for a quick weeknight dinner.',
    ingredients: [
      '400g pasta',
      '6 cloves garlic, minced',
      '1 cup heavy cream',
      '1/2 cup parmesan cheese',
      '2 tbsp olive oil',
      'Salt and pepper to taste',
      'Fresh parsley for garnish'
    ],
    instructions: [
      'Boil pasta according to package directions.',
      'In a large pan, heat olive oil and sauté minced garlic until fragrant.',
      'Add heavy cream and simmer for 3-4 minutes.',
      'Stir in parmesan cheese until melted.',
      'Drain pasta and toss with the creamy sauce.',
      'Season with salt and pepper.',
      'Garnish with fresh parsley and serve hot.'
    ],
    nutrition: {
      calories: 520,
      protein: 18,
      carbs: 62,
      fat: 22
    },
    isFavorite: false,
    budget: 8
  },
  {
    id: '2',
    title: 'Mediterranean Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2MTk0NTIxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Mediterranean',
    diet: ['Vegan', 'Gluten-Free'],
    mealType: ['Lunch', 'Dinner'],
    cookTime: 30,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 189,
    author: 'Chef Alex',
    description: 'Fresh and healthy quinoa bowl loaded with Mediterranean vegetables, chickpeas, and a tangy lemon dressing.',
    ingredients: [
      '1 cup quinoa',
      '1 can chickpeas, drained',
      '1 cucumber, diced',
      '2 tomatoes, diced',
      '1/4 red onion, sliced',
      '1/4 cup olives',
      '1/4 cup tahini',
      '2 tbsp lemon juice',
      'Fresh herbs'
    ],
    instructions: [
      'Cook quinoa according to package instructions and let cool.',
      'In a large bowl, combine cooked quinoa, chickpeas, cucumber, tomatoes, onion, and olives.',
      'In a small bowl, whisk together tahini, lemon juice, and a splash of water.',
      'Drizzle dressing over the quinoa bowl.',
      'Top with fresh herbs and serve.'
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 52,
      fat: 12
    },
    isFavorite: true,
    budget: 12
  },
  {
    id: '3',
    title: 'Fluffy Blueberry Pancakes',
    image: 'https://images.unsplash.com/photo-1636743713732-125909a35dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBwYW5jYWtlc3xlbnwxfHx8fDE3NjE5ODczNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'American',
    diet: ['Vegetarian'],
    mealType: ['Breakfast'],
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.7,
    reviews: 412,
    author: 'Chef Sarah',
    description: 'Light, fluffy pancakes bursting with fresh blueberries. A perfect weekend breakfast treat!',
    ingredients: [
      '2 cups all-purpose flour',
      '2 tbsp sugar',
      '2 tsp baking powder',
      '1/2 tsp salt',
      '2 eggs',
      '1 3/4 cups milk',
      '1/4 cup melted butter',
      '1 cup fresh blueberries',
      'Maple syrup for serving'
    ],
    instructions: [
      'In a large bowl, whisk together flour, sugar, baking powder, and salt.',
      'In another bowl, beat eggs and mix in milk and melted butter.',
      'Pour wet ingredients into dry ingredients and stir until just combined.',
      'Gently fold in blueberries.',
      'Heat a griddle over medium heat and grease lightly.',
      'Pour 1/4 cup batter for each pancake.',
      'Cook until bubbles form, then flip and cook until golden.',
      'Serve with maple syrup.'
    ],
    nutrition: {
      calories: 340,
      protein: 10,
      carbs: 48,
      fat: 12
    },
    isFavorite: false,
    budget: 9
  },
  {
    id: '4',
    title: 'Herb-Grilled Chicken',
    image: 'https://images.unsplash.com/photo-1496074620649-6b1b02e5c1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NjE4ODg0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'American',
    diet: ['Gluten-Free', 'Keto'],
    mealType: ['Dinner', 'Lunch'],
    cookTime: 35,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.6,
    reviews: 298,
    author: 'Chef Mike',
    description: 'Juicy grilled chicken marinated in fresh herbs and spices. Perfect protein for any meal.',
    ingredients: [
      '4 chicken breasts',
      '3 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 tbsp fresh rosemary',
      '1 tbsp fresh thyme',
      '1 lemon, juiced',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a bowl, combine olive oil, garlic, rosemary, thyme, lemon juice, salt, and pepper.',
      'Add chicken breasts and marinate for at least 30 minutes.',
      'Preheat grill to medium-high heat.',
      'Grill chicken for 6-7 minutes per side until cooked through.',
      'Let rest for 5 minutes before serving.'
    ],
    nutrition: {
      calories: 280,
      protein: 42,
      carbs: 2,
      fat: 11
    },
    isFavorite: true,
    budget: 15
  },
  {
    id: '5',
    title: 'Decadent Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjE5OTgyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'French',
    diet: ['Vegetarian'],
    mealType: ['Dessert'],
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    reviews: 567,
    author: 'Chef Pierre',
    description: 'Rich chocolate cake with a molten center. Serve warm with vanilla ice cream for the ultimate dessert experience.',
    ingredients: [
      '1/2 cup butter',
      '4 oz dark chocolate',
      '2 eggs',
      '2 egg yolks',
      '1/4 cup sugar',
      '2 tbsp flour',
      'Pinch of salt',
      'Vanilla ice cream for serving'
    ],
    instructions: [
      'Preheat oven to 425°F. Butter and flour 4 ramekins.',
      'Melt butter and chocolate together in a double boiler.',
      'In a separate bowl, whisk eggs, egg yolks, and sugar until thick.',
      'Fold in chocolate mixture, then flour and salt.',
      'Divide batter among ramekins.',
      'Bake for 12-14 minutes until edges are firm but center jiggles.',
      'Let cool for 1 minute, then invert onto plates.',
      'Serve immediately with ice cream.'
    ],
    nutrition: {
      calories: 420,
      protein: 8,
      carbs: 38,
      fat: 28
    },
    isFavorite: false,
    budget: 10
  },
  {
    id: '6',
    title: 'Fresh Sushi Platter',
    image: 'https://images.unsplash.com/photo-1735190093631-d66ecd1bc433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN1c2hpJTIwcGxhdHRlcnxlbnwxfHx8fDE3NjE5OTk3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Japanese',
    diet: ['Pescatarian', 'Gluten-Free'],
    mealType: ['Lunch', 'Dinner'],
    cookTime: 45,
    servings: 4,
    difficulty: 'Hard',
    rating: 4.8,
    reviews: 156,
    author: 'Chef Yuki',
    description: 'Authentic homemade sushi with fresh fish and vegetables. A beautiful and delicious meal.',
    ingredients: [
      '2 cups sushi rice',
      '1/4 cup rice vinegar',
      '1 tbsp sugar',
      'Nori sheets',
      '200g fresh salmon',
      '200g tuna',
      '1 cucumber',
      '1 avocado',
      'Soy sauce',
      'Wasabi',
      'Pickled ginger'
    ],
    instructions: [
      'Cook sushi rice according to package directions.',
      'Mix rice vinegar and sugar, fold into cooked rice.',
      'Slice fish and vegetables into thin strips.',
      'Place nori on bamboo mat, spread rice evenly.',
      'Add fillings in a line across the center.',
      'Roll tightly using the mat.',
      'Slice into pieces with a sharp, wet knife.',
      'Serve with soy sauce, wasabi, and ginger.'
    ],
    nutrition: {
      calories: 320,
      protein: 24,
      carbs: 42,
      fat: 8
    },
    isFavorite: true,
    budget: 25
  },
  {
    id: '7',
    title: 'Spicy Vegetarian Curry',
    image: 'https://images.unsplash.com/photo-1743674453123-93356ade2891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwY3VycnklMjBkaXNofGVufDF8fHx8MTc2MjAwNTcxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Indian',
    diet: ['Vegan', 'Vegetarian', 'Gluten-Free'],
    mealType: ['Dinner', 'Lunch'],
    cookTime: 40,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.7,
    reviews: 223,
    author: 'Chef Priya',
    description: 'Aromatic curry with mixed vegetables in a rich coconut sauce. Serve with rice or naan.',
    ingredients: [
      '2 tbsp coconut oil',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp ginger, minced',
      '2 tbsp curry powder',
      '1 can coconut milk',
      '2 cups mixed vegetables',
      '1 can chickpeas',
      'Fresh cilantro'
    ],
    instructions: [
      'Heat coconut oil in a large pot.',
      'Sauté onion until soft, add garlic and ginger.',
      'Stir in curry powder and cook for 1 minute.',
      'Add coconut milk and bring to a simmer.',
      'Add vegetables and chickpeas.',
      'Simmer for 20 minutes until vegetables are tender.',
      'Garnish with cilantro and serve with rice.'
    ],
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 32,
      fat: 14
    },
    isFavorite: false,
    budget: 11
  },
  {
    id: '8',
    title: 'Artisan Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1734774421809-48eac182a5cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lbWFkZSUyMHBpenphfGVufDF8fHx8MTc2MTk1MTg4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Italian',
    diet: ['Vegetarian'],
    mealType: ['Dinner', 'Lunch'],
    cookTime: 90,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.9,
    reviews: 445,
    author: 'Chef Giovanni',
    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil. Made with homemade dough.',
    ingredients: [
      '500g pizza dough',
      '1 cup tomato sauce',
      '250g fresh mozzarella',
      '2 tomatoes, sliced',
      'Fresh basil leaves',
      '2 tbsp olive oil',
      'Salt to taste'
    ],
    instructions: [
      'Preheat oven to 475°F with pizza stone inside.',
      'Roll out pizza dough to desired thickness.',
      'Spread tomato sauce evenly over dough.',
      'Tear mozzarella and distribute over sauce.',
      'Add tomato slices.',
      'Drizzle with olive oil and sprinkle with salt.',
      'Bake for 12-15 minutes until crust is golden.',
      'Top with fresh basil before serving.'
    ],
    nutrition: {
      calories: 480,
      protein: 20,
      carbs: 58,
      fat: 18
    },
    isFavorite: true,
    budget: 13
  }
];
