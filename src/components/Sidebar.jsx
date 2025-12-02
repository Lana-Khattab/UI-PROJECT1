import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="lg:col-span-3 space-y-4">
      <div className="bg-white rounded-xl border p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-semibold mb-3">
            U
          </div>
          <p className="text-sm text-gray-600">Username</p>
        </div>

        <div className="space-y-2 mb-6">
          <button className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-start gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Surprise me
          </button>
          <Link to="/add-recipe" className="w-full bg-gray-900 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-800 flex items-center justify-start gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create recipe
          </Link>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Favorites
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-gray-700 hover:text-orange-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Italian Pasta
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-orange-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Healthy Bowls
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-orange-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Quick Dinners
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
