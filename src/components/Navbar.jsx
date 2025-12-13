import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import NotificationsModal from './NotificationsModal'
import CartModal from './CartModal'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
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
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
      <nav className="bg-white dark:bg-dark-bg shadow-sm border-b dark:border-dark-border sticky top-0 z-50 transition-colors" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500 rounded" aria-label="FOODIES Home">FOODIES</Link>
        <div className="hidden md:flex flex-1 mx-8">
          <label htmlFor="search-input" className="sr-only">Search for ingredients or dishes</label>
          <input 
            id="search-input"
            type="text" 
            placeholder="ingredient, dish" 
            className="w-full max-w-sm px-4 py-2 border dark:border-dark-border rounded-full text-sm bg-white dark:bg-dark-card dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
            aria-label="Search recipes"
          />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-5 h-5 text-orange-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-5 h-5 text-gray-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600 dark:text-dark-muted">Hi, {user?.name}</span>
              <motion.button 
                onClick={logout}
                className="border dark:border-dark-border px-4 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-dark-card dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/login" className="bg-gray-900 dark:bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 dark:hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors">
                  Sign in
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/signup" className="border dark:border-dark-border px-4 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-dark-card dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors">
                  Register
                </Link>
              </motion.div>
            </>
          )}
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 dark:text-dark-text" /> : <Menu className="w-6 h-6 dark:text-dark-text" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden border-t dark:border-dark-border bg-white dark:bg-dark-bg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <label htmlFor="mobile-search-input" className="sr-only">Search for ingredients or dishes</label>
              <input 
                id="mobile-search-input"
                type="text" 
                placeholder="ingredient, dish" 
                className="w-full px-4 py-2 border dark:border-dark-border rounded-full text-sm bg-white dark:bg-dark-card dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors" 
                aria-label="Search recipes"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-dark-muted">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <span className="text-sm text-gray-600 dark:text-dark-muted px-4 py-2">Hi, {user?.name}</span>
                    <button 
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="border dark:border-dark-border px-4 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-dark-card dark:text-dark-text text-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="bg-gray-900 dark:bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 dark:hover:bg-orange-700 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors">
                      Sign in
                    </Link>
                    <Link to="/signup" className="border dark:border-dark-border px-4 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-dark-card dark:text-dark-text text-center focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors">
                      Register
                    </Link>
                  </>
                )}
              </div>
              <nav className="flex flex-col gap-3 pt-3 border-t dark:border-dark-border" aria-label="Mobile navigation">
                <Link to="/" className="hover:text-orange-500 dark:text-dark-text py-2 focus:outline-none focus:text-orange-500" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/explore" className="hover:text-orange-500 dark:text-dark-text py-2 focus:outline-none focus:text-orange-500" onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
                <Link to="/shop" className="hover:text-orange-500 dark:text-dark-text py-2 focus:outline-none focus:text-orange-500" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                <Link to="/collections" className="hover:text-orange-500 dark:text-dark-text py-2 focus:outline-none focus:text-orange-500" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
                <Link to="/dashboard" className="hover:text-orange-500 dark:text-dark-text py-2 focus:outline-none focus:text-orange-500" onClick={() => setIsMobileMenuOpen(false)}>Meal Planner</Link>
              </nav>
              <div className="flex flex-col gap-3 pt-3 border-t dark:border-dark-border">
                <button 
                  onClick={() => {
                    setIsNotificationsOpen(true);
                    setIsMobileMenuOpen(false);
                  }} 
                  className="hover:text-orange-500 dark:text-dark-text text-left py-2 flex items-center justify-between focus:outline-none focus:text-orange-500"
                >
                  Notifications
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold" aria-label={`${unreadCount} unread notifications`}>{unreadCount}</span>
                  )}
                </button>
                <button 
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMobileMenuOpen(false);
                  }} 
                  className="hover:text-orange-500 dark:text-dark-text text-left py-2 focus:outline-none focus:text-orange-500"
                >
                  Cart
                </button>
                <Link to="/orders" className="hover:text-orange-500 dark:text-dark-text py-2 focus:outline-none focus:text-orange-500" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
                <Link to="/profile" className="hover:text-orange-500 dark:text-dark-text py-2 focus:outline-none focus:text-orange-500" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t dark:border-dark-border hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 py-2 flex items-center justify-between text-sm text-gray-600 dark:text-dark-muted">
          <nav className="flex gap-6" aria-label="Secondary navigation">
            <Link to="/" className="hover:text-orange-500 cursor-pointer focus:outline-none focus:text-orange-500">Home</Link>
            <Link to="/explore" className="hover:text-orange-500 cursor-pointer focus:outline-none focus:text-orange-500">Explore</Link>
            <Link to="/collections" className="hover:text-orange-500 cursor-pointer focus:outline-none focus:text-orange-500">Collections</Link>
            <Link to="/shop" className="hover:text-orange-500 cursor-pointer focus:outline-none focus:text-orange-500">Shop</Link>
            <Link to="/dashboard" className="hover:text-orange-500 cursor-pointer focus:outline-none focus:text-orange-500">Meal Planner</Link>
          </nav>
          <div className="flex gap-4">
            <button onClick={() => setIsNotificationsOpen(true)} className="hover:text-orange-500 relative pr-3 focus:outline-none focus:text-orange-500" aria-label="Notifications">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold" aria-label={`${unreadCount} unread notifications`}>{unreadCount}</span>
              )}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Cart</button>
            <Link to="/orders" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Orders</Link>
            <Link to="/profile" className="hover:text-orange-500 focus:outline-none focus:text-orange-500">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar

