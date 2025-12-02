import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AddRecipe from './pages/AddRecipe'
import RecipeDetails from './pages/RecipeDetails'

import Collections from './pages/Collections'
import CollectionDetail from './pages/CollectionDetail'

import Shop from './pages/Shop'
import Cart from './pages/Cart'

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />

          {/* Collections */}
          <Route path="/collections" element={<Collections />} />
          <Route path="/collection/:id" element={<CollectionDetail />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
