import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { notificationAPI } from '../utils/api'

function NotificationsModal({ isOpen, onClose, notifications, setNotifications }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      fetchNotifications()
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await notificationAPI.getAll()
      if (response.data.success) {
        setNotifications(response.data.notifications)
      }
    } catch (err) {
      console.error('Error fetching notifications:', err)
      setError('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead()
      setNotifications(notifications.map(n => ({ ...n, read: true })))
    } catch (err) {
      console.error('Error marking all as read:', err)
    }
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
    
    const senderName = notification.sender?.name || 'N'
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
        <span className="text-sm font-bold text-white">
          {senderName.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </span>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 sm:pt-24">
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="relative bg-white dark:bg-dark-card rounded-lg shadow-2xl dark:shadow-orange-500/10 w-full max-w-md mx-4 max-h-[calc(100vh-8rem)] flex flex-col border dark:border-dark-border"
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-dark-border sticky top-0 bg-white dark:bg-dark-card rounded-t-lg transition-colors">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text">Notifications</h2>
                {unreadCount > 0 && (
                  <motion.p 
                    className="text-xs text-gray-600 dark:text-dark-muted"
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {unreadCount} unread
                  </motion.p>
                )}
              </div>
              <motion.button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close notifications"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </motion.button>
            </div>

            <div className="overflow-y-auto flex-1">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-500 dark:text-red-400">
                  {error}
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                  <p>No notifications yet</p>
                </div>
              ) : (
                <AnimatePresence>
                  {notifications.map((notification, index) => (
                    <motion.div 
                      key={notification._id}
                      className={`p-4 border-b dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      layout
                    >
                      <div className="flex gap-3">
                        <motion.div 
                          className="flex-shrink-0"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          {getUserAvatar(notification)}
                        </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-dark-text">
                              {notification.sender?.name && (
                                <span className="font-semibold">{notification.sender.name} </span>
                              )}
                              <span className="text-gray-700 dark:text-dark-muted">{notification.action}</span>
                              {notification.relatedRecipe?.title && (
                                <span className="font-medium"> {notification.relatedRecipe.title}</span>
                              )}
                            </p>
                            {notification.comment && (
                              <p className="text-sm text-gray-600 dark:text-dark-muted mt-1 italic">"{notification.comment}"</p>
                            )}
                            <p className="text-xs text-gray-500 dark:text-dark-muted mt-1">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <motion.div 
                            className="flex-shrink-0"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, delay: index * 0.05 + 0.1 }}
                          >
                            {getNotificationIcon(notification.type)}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              )}
            </div>

            <motion.div 
              className="p-3 border-t dark:border-dark-border bg-gray-50 dark:bg-dark-border rounded-b-lg transition-colors"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.button 
                onClick={markAllAsRead} 
                className="w-full text-sm text-gray-700 dark:text-dark-text hover:text-gray-900 dark:hover:text-dark-text font-medium py-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Mark all as read
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default NotificationsModal
