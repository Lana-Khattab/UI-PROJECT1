import { useEffect } from 'react'

function NotificationsModal({ isOpen, onClose, notifications, setNotifications }) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        )
      case 'comment':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        )
      case 'follow':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        )
      case 'milestone':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        )
      default:
        return null
    }
  }

  const getUserAvatar = (notification) => {
    if (notification.type === 'milestone') {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        </div>
      )
    }
    
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
        <span className="text-sm font-bold text-white">
          {notification.user ? notification.user.split(' ').map(n => n[0]).join('').slice(0, 2) : 'N'}
        </span>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 sm:pt-24">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 max-h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white rounded-t-lg">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-600">{unreadCount} unread</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  {getUserAvatar(notification)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {notification.user && (
                          <span className="font-semibold">{notification.user} </span>
                        )}
                        <span className="text-gray-700">{notification.action}</span>
                        {notification.recipe && (
                          <span className="font-medium"> {notification.recipe}</span>
                        )}
                      </p>
                      {notification.comment && (
                        <p className="text-sm text-gray-600 mt-1 italic">"{notification.comment}"</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t bg-gray-50 rounded-b-lg">
          <button onClick={markAllAsRead} className="w-full text-sm text-gray-700 hover:text-gray-900 font-medium py-2 hover:bg-gray-100 rounded transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationsModal
