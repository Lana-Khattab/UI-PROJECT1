import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/layout/Header';
import { HomePage } from './components/pages/HomePage';
import { RecipeExplorer } from './components/pages/RecipeExplorer';
import { RecipeDetails } from './components/pages/RecipeDetails';
import { MealPlanner } from './components/pages/MealPlanner';
import { CreateRecipe } from './components/pages/CreateRecipe';
import { LoginPage } from './components/pages/LoginPage';
import { SignUpPage } from './components/pages/SignUpPage';
import { ProfilePage } from './components/pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/recipes" element={<RecipeExplorer />} />
                  <Route path="/recipe/:id" element={<RecipeDetails />} />
                  <Route path="/meal-planner" element={<MealPlanner />} />
                  <Route path="/create" element={<CreateRecipe />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </>
            }
          />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}
