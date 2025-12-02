import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-gray-900">FOODIES</Link>
        <div className="flex-1 w-full sm:w-auto sm:mx-8">
          <input 
            type="text" 
            placeholder="ingredient, dish" 
            className="w-full max-w-sm px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/login" className="bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-md text-sm hover:bg-gray-800">
            Sign in
          </Link>
          <Link to="/signup" className="border px-3 sm:px-4 py-2 rounded-md text-sm hover:bg-gray-100">
            Register
          </Link>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 gap-3 sm:gap-0">
          <div className="flex gap-4 sm:gap-6 flex-wrap">
            <Link to="/" className="hover:text-orange-500 cursor-pointer">Home</Link>
            <Link to="/explore" className="hover:text-orange-500 cursor-pointer">Explore</Link>
            <a href="#collections" className="hover:text-orange-500 cursor-pointer">Collections</a>
            <Link to="/dashboard" className="hover:text-orange-500 cursor-pointer">Meal Planner</Link>
          </div>
          <div className="flex gap-3 sm:gap-4 flex-wrap">
            <button className="hover:text-orange-500">Notifications</button>
            <button className="hover:text-orange-500">Cart</button>
            <Link to="/profile" className="hover:text-orange-500">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
