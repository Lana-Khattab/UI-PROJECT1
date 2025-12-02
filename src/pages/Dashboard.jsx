import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
      
      <div className="min-h-screen p-4 sm:p-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Your cooking overview</p>
            </div>
            
            <div className="flex gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[140px]">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Recipes</p>
                  <p className="text-xl font-bold text-gray-900">63</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[140px]">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Favorites</p>
                  <p className="text-xl font-bold text-gray-900">40</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[140px]">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Avg Time</p>
                  <p className="text-xl font-bold text-gray-900">35m</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial min-w-[140px]">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">This Week</p>
                  <p className="text-xl font-bold text-gray-900">21</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Weekly Meal Plan</h2>
                  <div className="flex items-center gap-2">
                    <button className="p-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <span className="text-sm font-medium px-3">This Week</span>
                    <button className="p-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                  <div className="bg-gray-50 rounded border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                    <h3 className="font-semibold text-xs text-gray-900 mb-2 text-center border-b pb-1">Mon</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-100 text-gray-700">B</span>
                        <p className="text-xs text-gray-700 leading-tight">Avocado Toast</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-200 text-gray-800">L</span>
                        <p className="text-xs text-gray-700 leading-tight">Caesar Salad</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-300 text-gray-900">D</span>
                        <p className="text-xs text-gray-700 leading-tight">Grilled Salmon</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                    <h3 className="font-semibold text-xs text-gray-900 mb-2 text-center border-b pb-1">Tue</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-100 text-gray-700">B</span>
                        <p className="text-xs text-gray-700 leading-tight">Oatmeal Bowl</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-200 text-gray-800">L</span>
                        <p className="text-xs text-gray-700 leading-tight">Chicken Wrap</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-300 text-gray-900">D</span>
                        <p className="text-xs text-gray-700 leading-tight">Pasta Carbonara</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                    <h3 className="font-semibold text-xs text-gray-900 mb-2 text-center border-b pb-1">Wed</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-100 text-gray-700">B</span>
                        <p className="text-xs text-gray-700 leading-tight">Smoothie Bowl</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-200 text-gray-800">L</span>
                        <p className="text-xs text-gray-700 leading-tight">Quinoa Salad</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-300 text-gray-900">D</span>
                        <p className="text-xs text-gray-700 leading-tight">Beef Stir Fry</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                    <h3 className="font-semibold text-xs text-gray-900 mb-2 text-center border-b pb-1">Thu</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-100 text-gray-700">B</span>
                        <p className="text-xs text-gray-700 leading-tight">Pancakes</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-200 text-gray-800">L</span>
                        <p className="text-xs text-gray-700 leading-tight">Tomato Soup</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-300 text-gray-900">D</span>
                        <p className="text-xs text-gray-700 leading-tight">Roasted Chicken</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                    <h3 className="font-semibold text-xs text-gray-900 mb-2 text-center border-b pb-1">Fri</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-100 text-gray-700">B</span>
                        <p className="text-xs text-gray-700 leading-tight">French Toast</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-200 text-gray-800">L</span>
                        <p className="text-xs text-gray-700 leading-tight">Sushi Bowl</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-300 text-gray-900">D</span>
                        <p className="text-xs text-gray-700 leading-tight">Margherita Pizza</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                    <h3 className="font-semibold text-xs text-gray-900 mb-2 text-center border-b pb-1">Sat</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-100 text-gray-700">B</span>
                        <p className="text-xs text-gray-700 leading-tight">Eggs Benedict</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-200 text-gray-800">L</span>
                        <p className="text-xs text-gray-700 leading-tight">Greek Salad</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-300 text-gray-900">D</span>
                        <p className="text-xs text-gray-700 leading-tight">BBQ Ribs</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                    <h3 className="font-semibold text-xs text-gray-900 mb-2 text-center border-b pb-1">Sun</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-100 text-gray-700">B</span>
                        <p className="text-xs text-gray-700 leading-tight">Waffles</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-200 text-gray-800">L</span>
                        <p className="text-xs text-gray-700 leading-tight">Burrito Bowl</p>
                      </div>
                      <div>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-0.5 bg-gray-300 text-gray-900">D</span>
                        <p className="text-xs text-gray-700 leading-tight">Lasagna</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Recipe Types</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-3 h-3 rounded bg-gray-800"></div>
                        <span className="text-sm text-gray-700">Breakfast</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-6 bg-gray-800 rounded" style={{width: '120px'}}></div>
                        <span className="text-sm font-semibold text-gray-900 w-8 text-right">12</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-3 h-3 rounded bg-gray-700"></div>
                        <span className="text-sm text-gray-700">Lunch</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-6 bg-gray-700 rounded" style={{width: '180px'}}></div>
                        <span className="text-sm font-semibold text-gray-900 w-8 text-right">18</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-3 h-3 rounded bg-gray-600"></div>
                        <span className="text-sm text-gray-700">Dinner</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-6 bg-gray-600 rounded" style={{width: '250px'}}></div>
                        <span className="text-sm font-semibold text-gray-900 w-8 text-right">25</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-3 h-3 rounded bg-gray-500"></div>
                        <span className="text-sm text-gray-700">Snacks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-6 bg-gray-500 rounded" style={{width: '80px'}}></div>
                        <span className="text-sm font-semibold text-gray-900 w-8 text-right">8</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Favorites by Category</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                        <span className="text-sm text-gray-700">Desserts</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                        <span className="text-sm text-gray-700">Mains</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                        <span className="text-sm text-gray-700">Sides</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                        <span className="text-sm text-gray-700">Appetizers</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span className="text-sm text-gray-700">Salads</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-3 text-left">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">Plan Next Week</span>
                  </button>
                  <Link to="/add-recipe" className="w-full py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-3 text-left">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">Add New Recipe</span>
                  </Link>
                  <button className="w-full py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-3 text-left">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">Browse Favorites</span>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Weekly Progress</h3>
                <p className="text-xs text-gray-600 mb-3">You've cooked 15 out of 21 planned meals</p>
                <div className="w-full bg-white rounded-full h-2 mb-2">
                  <div className="bg-gray-800 h-2 rounded-full" style={{width: '71%'}}></div>
                </div>
                <p className="text-xs text-gray-600">71% complete</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="text-xs text-gray-600 pb-2 border-b border-gray-100">
                    <p className="font-medium text-gray-900">Created recipe</p>
                    <p>Creamy Garlic Pasta • 2 days ago</p>
                  </div>
                  <div className="text-xs text-gray-600 pb-2 border-b border-gray-100">
                    <p className="font-medium text-gray-900">Added favorite</p>
                    <p>Mediterranean Bowl • 4 days ago</p>
                  </div>
                  <div className="text-xs text-gray-600 pb-2 border-b border-gray-100">
                    <p className="font-medium text-gray-900">Completed meal</p>
                    <p>Grilled Salmon • 5 days ago</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p className="font-medium text-gray-900">Planned week</p>
                    <p>Week of Nov 4 • 1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
