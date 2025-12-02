import { Link } from 'react-router-dom'

function RecipeCard({ recipe }) {
  const {
    id,
    image,
    title,
    difficulty,
    time,
    rating,
    cuisine,
    tags,
    cost
  } = recipe

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {difficulty}
          </span>
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm flex items-center gap-1">
          {time} min Rating: {rating}
        </p>
        <div className="flex flex-wrap gap-2 my-2 text-xs">
          {cuisine && (
            <span className="bg-gray-100 px-2 py-1 rounded-md">{cuisine}</span>
          )}
          {tags && tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded-md">{tag}</span>
          ))}
        </div>
        {cost && (
          <p className="text-gray-700 text-sm">
            Total cost: <span className="text-green-600 font-semibold">${cost}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default RecipeCard
