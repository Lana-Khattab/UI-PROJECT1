import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Dashboard() {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text font-sans min-h-screen transition-colors">
      <Navbar />
      
      <div className="min-h-screen p-4 sm:p-6">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-dark-muted">Your cooking overview</p>
            </div>
            
            <div className="flex gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[140px] transition-colors"
              >
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-dark-muted">Total Recipes</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-dark-text">63</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -3 }}
                className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[140px] transition-colors"
              >
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-dark-muted">Favorites</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-dark-text">40</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -3 }}
                className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[140px] transition-colors"
              >
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-dark-muted">Avg Time</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-dark-text">35m</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -3 }}
                className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[140px] transition-colors"
              >
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-dark-muted">This Week</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-dark-text">21</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-5 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text">Weekly Meal Plan</h2>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 border border-gray-300 dark:border-dark-border rounded hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </motion.button>
                    <span className="text-sm font-medium px-3">This Week</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 border border-gray-300 dark:border-dark-border rounded hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-gray-50 dark:bg-dark-bg rounded border border-gray-200 dark:border-dark-border p-2 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
                    >
                      <h3 className="font-semibold text-xs text-gray-900 dark:text-dark-text mb-2 text-center border-b dark:border-dark-border pb-1">{day}</h3>
                      <div className="space-y-2">
                        <div>
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-500">B</span>
                          <p className="text-xs text-gray-700 dark:text-dark-muted leading-tight">
                            {index === 0 && 'Avocado Toast'}
                            {index === 1 && 'Oatmeal Bowl'}
                            {index === 2 && 'Smoothie Bowl'}
                            {index === 3 && 'Pancakes'}
                            {index === 4 && 'French Toast'}
                            {index === 5 && 'Eggs Benedict'}
                            {index === 6 && 'Waffles'}
                          </p>
                        </div>
                        <div>
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-orange-200 dark:bg-orange-800/30 text-orange-800 dark:text-orange-400">L</span>
                          <p className="text-xs text-gray-700 dark:text-dark-muted leading-tight">
                            {index === 0 && 'Caesar Salad'}
                            {index === 1 && 'Chicken Wrap'}
                            {index === 2 && 'Quinoa Salad'}
                            {index === 3 && 'Tomato Soup'}
                            {index === 4 && 'Sushi Bowl'}
                            {index === 5 && 'Greek Salad'}
                            {index === 6 && 'Burrito Bowl'}
                          </p>
                        </div>
                        <div>
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-orange-300 dark:bg-orange-700/30 text-orange-900 dark:text-orange-300">D</span>
                          <p className="text-xs text-gray-700 dark:text-dark-muted leading-tight">
                            {index === 0 && 'Grilled Salmon'}
                            {index === 1 && 'Pasta Carbonara'}
                            {index === 2 && 'Beef Stir Fry'}
                            {index === 3 && 'Roasted Chicken'}
                            {index === 4 && 'Margherita Pizza'}
                            {index === 5 && 'BBQ Ribs'}
                            {index === 6 && 'Lasagna'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-5 transition-colors"
                >
                  <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4">Recipe Types</h2>
                  <div className="space-y-3">
                    {[
                      { label: 'Breakfast', count: 12, width: '120px', color: 'bg-orange-600' },
                      { label: 'Lunch', count: 18, width: '180px', color: 'bg-orange-500' },
                      { label: 'Dinner', count: 25, width: '250px', color: 'bg-orange-400' },
                      { label: 'Snacks', count: 8, width: '80px', color: 'bg-orange-300' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-3 h-3 rounded ${item.color}`}></div>
                          <span className="text-sm text-gray-700 dark:text-dark-muted">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: item.width }}
                            transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                            className={`h-6 ${item.color} rounded`}
                          ></motion.div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-dark-text w-8 text-right">{item.count}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-5 transition-colors"
                >
                  <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4">Favorites by Category</h2>
                  <div className="space-y-3">
                    {[
                      { label: 'Desserts', count: 8, color: 'bg-orange-600' },
                      { label: 'Mains', count: 15, color: 'bg-orange-500' },
                      { label: 'Sides', count: 6, color: 'bg-orange-400' },
                      { label: 'Appetizers', count: 4, color: 'bg-orange-300' },
                      { label: 'Salads', count: 7, color: 'bg-orange-200' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-sm text-gray-700 dark:text-dark-muted">{item.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-dark-text">{item.count}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-5 transition-colors"
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 border border-gray-300 dark:border-dark-border rounded-md hover:bg-gray-50 dark:hover:bg-dark-border transition-colors flex items-center gap-3 text-left"
                  >
                    <svg className="w-5 h-5 text-orange-600 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-dark-muted font-medium">Plan Next Week</span>
                  </motion.button>
                  <Link to="/add-recipe">
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 border border-gray-300 dark:border-dark-border rounded-md hover:bg-gray-50 dark:hover:bg-dark-border transition-colors flex items-center gap-3 text-left"
                    >
                      <svg className="w-5 h-5 text-orange-600 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-dark-muted font-medium">Add New Recipe</span>
                    </motion.div>
                  </Link>
                  <Link to="/explore?tab=favorites">
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 border border-gray-300 dark:border-dark-border rounded-md hover:bg-gray-50 dark:hover:bg-dark-border transition-colors flex items-center gap-3 text-left"
                    >
                      <svg className="w-5 h-5 text-orange-600 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-dark-muted font-medium">Browse Favorites</span>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg shadow-sm border border-orange-200 dark:border-orange-700/30 p-5 transition-colors"
              >
                <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-2">Weekly Progress</h3>
                <p className="text-xs text-gray-600 dark:text-dark-muted mb-3">You've cooked 15 out of 21 planned meals</p>
                <div className="w-full bg-white dark:bg-dark-border rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '71%' }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="bg-orange-500 h-2 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-600 dark:text-dark-muted">71% complete</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-5 transition-colors"
              >
                <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'Created recipe', detail: 'Creamy Garlic Pasta • 2 days ago' },
                    { action: 'Added favorite', detail: 'Mediterranean Bowl • 4 days ago' },
                    { action: 'Completed meal', detail: 'Grilled Salmon • 5 days ago' },
                    { action: 'Planned week', detail: 'Week of Nov 4 • 1 week ago' }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className={`text-xs text-gray-600 dark:text-dark-muted pb-2 ${index < 3 ? 'border-b border-gray-100 dark:border-dark-border' : ''} cursor-pointer`}
                    >
                      <p className="font-medium text-gray-900 dark:text-dark-text">{activity.action}</p>
                      <p>{activity.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
