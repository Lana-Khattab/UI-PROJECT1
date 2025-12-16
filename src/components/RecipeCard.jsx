import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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
    <motion.div 
      className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow dark:shadow-orange-500/5 hover:shadow-md dark:hover:shadow-orange-500/10 transition-all"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/recipe/${id}`}>
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover" 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-dark-text text-xs font-medium px-2 py-1 rounded-full">
            {difficulty}
          </span>
        </div>
        <Link to={`/recipe/${id}`} className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded">
          <h3 className="font-semibold text-lg dark:text-dark-text hover:text-orange-500 transition-colors">{title}</h3>
        </Link>
        <p className="text-gray-600 dark:text-dark-muted text-sm flex items-center gap-1" role="text">
          <span>{time} min</span>
          <span aria-label={`Rating: ${rating} out of 5`}>Rating: {rating}</span>
        </p>
        <div className="flex flex-wrap gap-2 my-2 text-xs">
          {cuisine && (
            <span className="bg-gray-100 dark:bg-dark-border dark:text-dark-text px-2 py-1 rounded-md">{cuisine}</span>
          )}
          {tags && tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 dark:bg-dark-border dark:text-dark-text px-2 py-1 rounded-md">{tag}</span>
          ))}
        </div>
        {cost && (
          <p className="text-gray-700 dark:text-dark-text text-sm">
            Total cost: <span className="text-green-600 dark:text-green-400 font-semibold">${cost}</span>
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default RecipeCard
