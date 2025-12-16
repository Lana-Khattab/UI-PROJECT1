import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { productAPI } from '../utils/api';

const Shop = () => {
  const { addToCart, removeFromCart, getProductQuantity, getTotalItems } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await productAPI.getAll();
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const totalItems = getTotalItems();

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors">
      <Navbar />
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-2 transition-colors">Kitchen Essentials Shop</h1>
            <p className="text-gray-600 dark:text-dark-muted transition-colors">Discover premium utensils and tools for your kitchen</p>
          </div>
          <Link
            to="/cart"
            className="relative bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            View Cart
            {totalItems > 0 && (
              <motion.span 
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
        </div>

        {error && (
          <motion.div 
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <>
            <motion.div 
              className="mb-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-border border border-gray-300 dark:border-dark-border'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => {
            const quantity = getProductQuantity(product._id);
            return (
              <motion.div
                key={product._id}
                className="bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-orange-500/10 transition-all overflow-hidden group border dark:border-dark-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 bg-gray-100 dark:bg-dark-border overflow-hidden transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  {quantity > 0 && (
                    <motion.div 
                      className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <Check className="w-4 h-4" />
                      In Cart
                    </motion.div>
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mt-1 mb-2 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-dark-muted line-clamp-2 transition-colors">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-orange-500">
                      ${product.price}
                    </span>
                  </div>
                  {quantity === 0 ? (
                    <motion.button
                      onClick={() => addToCart(product)}
                      className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </motion.button>
                  ) : (
                    <div className="mt-4 flex items-center justify-between bg-gray-50 dark:bg-dark-border rounded-lg p-2 transition-colors">
                      <motion.button
                        onClick={() => removeFromCart(product._id)}
                        className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Minus className="w-5 h-5" />
                      </motion.button>
                      <span className="text-xl font-bold text-gray-900 dark:text-dark-text px-4 transition-colors">
                        {quantity}
                      </span>
                      <motion.button
                        onClick={() => addToCart(product)}
                        className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Plus className="w-5 h-5" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        {filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ShoppingCart className="w-16 h-16 text-gray-400 dark:text-dark-muted mx-auto mb-4 transition-colors" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2 transition-colors">No products found</h3>
            <p className="text-gray-600 dark:text-dark-muted transition-colors">Try selecting a different category</p>
          </motion.div>
        )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Shop;
