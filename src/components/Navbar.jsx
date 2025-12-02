import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import NotificationsModal from './NotificationsModal'

function Navbar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      user: 'Farida Hassan',
      action: 'liked your recipe',
      recipe: 'Koshari',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      user: 'Omar Mahmoud',
      action: 'commented on',
      recipe: 'Mahshi Warak Enab',
      comment: 'This looks amazing! Can\'t wait to try it.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'follow',
      user: 'Nour El-Din',
      action: 'started following you',
      time: '2 hours ago',
      read: false
    },
    {
      id: 4,
      type: 'like',
      user: 'Ahmed Mostafa',
      action: 'liked your recipe',
      recipe: 'Fattah',
      time: '3 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'comment',
      user: 'Yasmin Ibrahim',
      action: 'commented on',
      recipe: 'Mahalabia',
      comment: 'Perfect dessert! Looks delicious.',
      time: '5 hours ago',
      read: true
    },
    {
      id: 6,
      type: 'milestone',
      action: 'Your recipe reached 100 likes!',
      recipe: 'Molokheya',
      time: '1 day ago',
      read: true
    },
    {
      id: 7,
      type: 'like',
      user: 'Karim Abdel Aziz',
      action: 'liked your recipe',
      recipe: 'Hawawshi',
      time: '2 days ago',
      read: true
    },
    {
      id: 8,
      type: 'follow',
      user: 'Salma Youssef',
      action: 'started following you',
      time: '3 days ago',
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <>
      <NotificationsModal 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-gray-900">FOODIES</Link>
        <div className="hidden md:flex flex-1 mx-8">
          <input 
            type="text" 
            placeholder="ingredient, dish" 
            className="w-full max-w-sm px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
          />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800">
            Sign in
          </Link>
          <Link to="/signup" className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
            Register
          </Link>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <input 
              type="text" 
              placeholder="ingredient, dish" 
              className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
            />
            <div className="flex flex-col gap-2">
              <Link to="/login" className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 text-center">
                Sign in
              </Link>
              <Link to="/signup" className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100 text-center">
                Register
              </Link>
            </div>
            <div className="flex flex-col gap-3 pt-3 border-t">
              <Link to="/" className="hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/explore" className="hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
              <Link to="/shop" className="hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <a href="#collections" className="hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>Collections</a>
              <Link to="/dashboard" className="hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>Meal Planner</Link>
            </div>
            <div className="flex flex-col gap-3 pt-3 border-t">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(true);
                  setIsMobileMenuOpen(false);
                }} 
                className="hover:text-orange-500 text-left py-2 flex items-center justify-between"
              >
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">{unreadCount}</span>
                )}
              </button>
              <Link to="/cart" className="hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
              <Link to="/profile" className="hover:text-orange-500 py-2" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
            </div>
          </div>
        </div>
      )}

      <div className="border-t hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 py-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex gap-6">
            <Link to="/" className="hover:text-orange-500 cursor-pointer">Home</Link>
            <Link to="/explore" className="hover:text-orange-500 cursor-pointer">Explore</Link>
            <Link to="/collections" className="hover:text-orange-500 cursor-pointer">Collections</Link>
            <Link to="/shop" className="hover:text-orange-500 cursor-pointer">Shop</Link>
            <Link to="/dashboard" className="hover:text-orange-500 cursor-pointer">Meal Planner</Link>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setIsNotificationsOpen(true)} className="hover:text-orange-500 relative pr-3">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">{unreadCount}</span>
              )}
            </button>
            <Link to="/cart" className="hover:text-orange-500">Cart</Link>
            <Link to="/profile" className="hover:text-orange-500">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar

