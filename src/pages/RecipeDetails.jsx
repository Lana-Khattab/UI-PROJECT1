function RecipeDetails() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <nav className="bg-white border-b">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-12">
            <div className="text-2xl font-bold text-gray-900">FOODIES</div>
            <ul className="flex items-center gap-6 text-sm text-gray-800">
              <li><a href="#" className="hover:text-orange-500">Recipes ▾</a></li>
              <li><a href="#" className="hover:text-orange-500">Collections ▾</a></li>
              <li><a href="#" className="hover:text-orange-500">Cravings ▾</a></li>
              <li><a href="#" className="hover:text-orange-500">Budget ▾</a></li>
            </ul>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-md mx-6">
            <input 
              type="text" 
              placeholder="ingredient, dish"
              className="w-full px-4 py-2 border rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" 
            />
            <button className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 whitespace-nowrap">Search</button>
          </div>

          <div className="flex items-center gap-3">
            <button className="border border-gray-300 px-6 py-2 rounded-md text-sm hover:bg-gray-100 whitespace-nowrap">Sign in</button>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 whitespace-nowrap">Register</button>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-6">
          <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkbZZUB4DeyraUK5MozeT4jSHFseFoSwa76Q&s" 
              alt="Mediterranean Quinoa Bowl"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Mediterranean Quinoa Bowl
            </h1>

            <div className="flex items-center gap-4 text-gray-700">
              <p className="text-base">
                by <span className="font-semibold text-gray-900">Chef Alex</span>
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-semibold text-gray-900">4.9</span>
                <span className="text-gray-600">(189 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-0">
        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Cook Time</p>
              <p className="font-semibold text-2xl text-gray-900">30 min</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Servings</p>
              <p className="font-semibold text-2xl text-gray-900">2</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Rating</p>
              <p className="font-semibold text-2xl text-gray-900">4.9/5</p>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button className="bg-gray-900 text-white px-6 py-2 rounded-md w-full md:w-auto hover:bg-gray-800">❤ Favorited</button>
            <button className="border border-gray-900 text-gray-900 px-6 py-2 rounded-md w-full md:w-auto hover:bg-gray-50">Add to Meal Plan</button>
          </div>
        </div>

        <div className="border-b mt-8 mb-6">
          <div className="flex text-sm font-medium">
            <div className="px-4 py-2 border-b-2 border-gray-900">Ingredients</div>
            <div className="px-4 py-2 text-gray-600">Instructions</div>
            <div className="px-4 py-2 text-gray-600">Nutrition</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Ingredients</h3>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>• 1 cup quinoa</li>
            <li>• 1 can chickpeas, drained</li>
            <li>• 1 cucumber, diced</li>
            <li>• 2 tomatoes, diced</li>
            <li>• 1/4 red onion, sliced</li>
            <li>• 1/4 cup olives</li>
            <li>• 1/4 cup tahini</li>
            <li>• 2 tbsp lemon juice</li>
            <li>• Fresh herbs</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Instructions</h3>
          <ol className="space-y-3 text-sm text-gray-700">
            <li>1. Cook quinoa according to package instructions and let it cool.</li>
            <li>2. Prepare the vegetables and place them in a large mixing bowl.</li>
            <li>3. Add the cooled quinoa and drained chickpeas to the bowl.</li>
            <li>4. Whisk together tahini, lemon juice, salt, and olive oil to make the dressing.</li>
            <li>5. Pour the dressing over the salad and toss gently to combine.</li>
            <li>6. Garnish with fresh herbs and serve chilled.</li>
          </ol>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-10">
          <h3 className="font-semibold mb-3">Nutrition Facts</h3>
          <p className="text-sm text-gray-600 mb-6">Per serving (2 servings)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-orange-500">320</p>
              <p className="text-sm text-gray-600">Calories</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-orange-500">12g</p>
              <p className="text-sm text-gray-600">Protein</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-orange-500">45g</p>
              <p className="text-sm text-gray-600">Carbs</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-orange-500">10g</p>
              <p className="text-sm text-gray-600">Fat</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Mood Based</h3>
          <div className="flex flex-wrap gap-2">
            <span className="border border-gray-300 rounded-full px-4 py-1 text-sm">Comfort</span>
            <span className="border border-gray-300 rounded-full px-4 py-1 text-sm">Energizing</span>
            <span className="border border-gray-300 rounded-full px-4 py-1 text-sm">Cozy</span>
            <span className="border border-gray-300 rounded-full px-4 py-1 text-sm">Fresh</span>
            <span className="border border-gray-300 rounded-full px-4 py-1 text-sm">Romantic</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Suitable Season</h3>
          <div className="border border-gray-200 rounded-md bg-gray-50 px-4 py-3 text-sm text-gray-600">All Seasons</div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h3 className="font-semibold mb-3">Add a Comment</h3>
          <textarea 
            placeholder="Share your thoughts about this recipe..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none" 
            rows="3"
          ></textarea>
          <div className="flex justify-end mt-3">
            <button className="bg-gray-900 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800">Submit</button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border mb-8">
          <h3 className="font-semibold mb-4">Reviews (189)</h3>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start mb-1">
                <p className="font-semibold">John D.</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
              <p className="text-gray-700 text-sm">Absolutely delicious! My family loved it.</p>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between items-start mb-1">
                <p className="font-semibold">Emma S.</p>
                <p className="text-sm text-gray-500">1 week ago</p>
              </div>
              <p className="text-gray-700 text-sm">Easy to follow and tastes amazing!</p>
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <p className="font-semibold">Mark T.</p>
                <p className="text-sm text-gray-500">2 weeks ago</p>
              </div>
              <p className="text-gray-700 text-sm">Great recipe, will make again.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RecipeDetails
