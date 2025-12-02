import Navbar from '../components/Navbar'

function Profile() {
  const userRecipes = [
    {
      id: 1,
      title: 'Creamy Garlic Pasta',
      image: 'https://www.allrecipes.com/thmb/QiGptPjQB5mqSXGVxE4sLPMJs_4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-2x1-bcd9cb83138849e4b17104a1cd51d063.jpg',
      difficulty: 'Easy',
      time: 25,
      rating: 4.8,
      cuisine: 'Italian',
      tags: ['Vegetarian'],
      cost: 8
    },
    {
      id: 2,
      title: 'Mediterranean Quinoa Bowl',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkbZZUB4DeyraUK5MozeT4jSHFseFoSwa76Q&s',
      difficulty: 'Easy',
      time: 30,
      rating: 4.9,
      cuisine: 'Mediterranean',
      tags: ['Vegan'],
      cost: 12
    },
    {
      id: 3,
      title: 'Herb-Grilled Chicken',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMYnuORFBCpJxwYOgIOw0YOZ7y0RsKewABA&s',
      difficulty: 'Medium',
      time: 45,
      rating: 4.7,
      cuisine: 'American',
      tags: ['Keto'],
      cost: 15
    }
  ]

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
      
      <section className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-3xl font-semibold mb-3">SJ</div>
              <button className="border border-gray-300 rounded-md px-3 py-1.5 flex items-center text-sm hover:bg-gray-100 transition">Change Photo</button>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <div>
                  <h2 className="text-xl font-semibold">Sarah Johnson</h2>
                  <p className="text-gray-600 text-sm flex items-center gap-2">sarah.johnson@example.com</p>
                  <p className="text-gray-600 text-sm flex items-center gap-2">San Francisco, CA</p>
                  <p className="text-gray-600 text-sm flex items-center gap-2">Member since January 2024</p>
                </div>
                <button className="mt-4 md:mt-0 bg-gray-900 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1 hover:bg-gray-800">Edit Profile</button>
              </div>
              <p className="text-gray-700 text-sm">Home cook & food enthusiast. Love experimenting with new recipes and sharing them with the community!</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-3xl font-semibold text-orange-500">3</p>
            <p className="text-gray-600 text-sm">Recipes Created</p>
          </div>
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-3xl font-semibold text-orange-500">4</p>
            <p className="text-gray-600 text-sm">Favorites</p>
          </div>
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-3xl font-semibold text-orange-500">12</p>
            <p className="text-gray-600 text-sm">Followers</p>
          </div>
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-3xl font-semibold text-orange-500">34</p>
            <p className="text-gray-600 text-sm">Following</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 rounded-full text-sm font-medium transition bg-gray-200 text-gray-800">My Recipes</button>
          <button className="px-4 py-2 rounded-full text-sm font-medium transition text-gray-600 hover:bg-orange-100 hover:text-orange-600">Favorites</button>
          <button className="px-4 py-2 rounded-full text-sm font-medium transition text-gray-600 hover:bg-orange-100 hover:text-orange-600">Activity</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">{recipe.difficulty}</span>
                </div>
                <h3 className="font-semibold text-lg">{recipe.title}</h3>
                <p className="text-gray-600 text-sm flex items-center gap-1">{recipe.time} min Rating: {recipe.rating}</p>
                <div className="flex flex-wrap gap-2 my-2 text-xs">
                  <span className="bg-gray-100 px-2 py-1 rounded-md">{recipe.cuisine}</span>
                  {recipe.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded-md">{tag}</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm">Total cost: <span className="text-green-600 font-semibold">${recipe.cost}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Profile
