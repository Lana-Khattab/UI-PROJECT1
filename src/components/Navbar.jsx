import { Link } from 'react-router-dom'
import { useState } from 'react'
import NotificationsModal from './NotificationsModal'

function Navbar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
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
            <button onClick={() => setIsNotificationsOpen(true)} className="hover:text-orange-500 relative pr-3">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">{unreadCount}</span>
              )}
            </button>
            <button className="hover:text-orange-500">Cart</button>
            <Link to="/profile" className="hover:text-orange-500">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
