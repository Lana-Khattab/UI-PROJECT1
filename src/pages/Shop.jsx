import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const { addToCart, removeFromCart, getProductQuantity, getTotalItems } = useCart();
  const [products] = useState([
    {
      id: 1,
      name: 'Wooden Spoon',
      category: 'Utensils',
      price: 12.99,
      description: 'Natural bamboo spoon, perfect for cooking and serving',
      image: 'https://m.media-amazon.com/images/I/61W5ot-61GL._AC_SL1500_.jpg?t=' + Date.now()
    },
    {
      id: 2,
      name: 'Wooden Spatula',
      category: 'Utensils',
      price: 14.50,
      description: 'Durable wooden spatula for flipping and stirring',
      image: 'https://mcprod.hyperone.com.eg/media/catalog/product/cache/8d4e6327d79fd11192282459179cc69e/5/1/5132_8yzjrdfdf515151fdvl._ac_sl1184_-removebg-preview.png?t=' + Date.now()
    },
    {
      id: 3,
      name: 'Bamboo Tongs',
      category: 'Utensils',
      price: 16.99,
      description: 'Eco-friendly bamboo tongs with secure grip',
      image: 'https://www.refillroom.com/wp-content/uploads/2020/10/0871853007443.jpg?t=' + Date.now()
    },
    {
      id: 4,
      name: 'Silicone Spatula',
      category: 'Utensils',
      price: 18.75,
      description: 'Heat-resistant silicone spatula, dishwasher safe',
      image: 'https://zealzeal.com/cdn/shop/products/zeal-j222_large-spatula-in-aqua_2000x2000.jpg?v=1687527215&t=' + Date.now()
    },
    {
      id: 5,
      name: 'Silicone Spoon',
      category: 'Utensils',
      price: 15.99,
      description: 'Non-stick silicone cooking spoon',
      image: 'https://www.oxouk.com/wp-content/uploads/gg_11281400_2.jpg?t=' + Date.now()
    },
    {
      id: 6,
      name: 'Stainless Steel Whisk',
      category: 'Utensils',
      price: 22.99,
      description: 'Professional-grade stainless steel whisk',
      image: 'https://www.paderno.com/cdn/shop/products/Untitled_design_9_1b8b9237-b12c-435c-a148-42be00fcf329.png?v=1689605502&t=' + Date.now()
    },
    {
      id: 7,
      name: 'Stainless Steel Ladle',
      category: 'Utensils',
      price: 24.50,
      description: 'Heavy-duty stainless steel ladle for soups and stews',
      image: 'https://www.stellinox.com/5011-superlarge_default/stainless-steel-ladle.jpg?t=' + Date.now()
    },
    {
      id: 8,
      name: 'Stainless Steel Slotted Spoon',
      category: 'Utensils',
      price: 19.99,
      description: 'Slotted spoon for draining and serving',
      image: 'https://images.allianceonline.co.uk/Products/LSSB00291.jpg?t=' + Date.now()
    },
    {
      id: 9,
      name: 'Heat-Resistant Nylon Turner',
      category: 'Utensils',
      price: 17.50,
      description: 'Flexible nylon turner, safe for non-stick pans',
      image: 'https://cdnimg.webstaurantstore.com/images/products/large/748879/2843973.jpg?t=' + Date.now()
    },
    {
      id: 10,
      name: 'Heat-Resistant Nylon Tongs',
      category: 'Utensils',
      price: 20.99,
      description: 'Durable nylon tongs with locking mechanism',
      image: 'https://i5.walmartimages.com/seo/Norpro-Grip-EZ-9-Stainless-Steel-Nylon-Heat-Resistant-Locking-Spatula-Tongs-3-Pack_5e9e8989-beef-4cd0-94b1-889d37c49dd5.c0b7fcad85f69c2c47b32c08d2654429.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF&t=' + Date.now()
    },
    {
      id: 11,
      name: 'Stainless Steel Measuring Cups',
      category: 'Measuring Tools',
      price: 28.99,
      description: 'Set of 4 stainless steel measuring cups',
      image: 'https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202531/0042/img448o.jpg?t=' + Date.now()
    },
    {
      id: 12,
      name: 'Stainless Steel Measuring Spoons',
      category: 'Measuring Tools',
      price: 16.50,
      description: 'Set of 6 measuring spoons with ring holder',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ytBd4Lbk4lw496KUdhYfWzPh74wGpe_gGg&s&t=' + Date.now()
    },
    {
      id: 13,
      name: 'Stainless Steel Mixing Bowls',
      category: 'Mixing & Prep',
      price: 34.99,
      description: 'Set of 3 nested stainless steel bowls',
      image: 'https://m.media-amazon.com/images/I/51tDTO312kL._AC_SL1409_.jpg?t=' + Date.now()
    },
    {
      id: 14,
      name: 'Glass Measuring Jug',
      category: 'Measuring Tools',
      price: 25.99,
      description: 'Large capacity glass measuring jug with spout',
      image: 'https://www.ikea.com/au/en/images/products/vardagen-measuring-jug-glass__1094875_pe863653_s5.jpg?t=' + Date.now()
    },
    {
      id: 15,
      name: "Chef's Knife",
      category: 'Knives',
      price: 89.99,
      description: '8-inch professional chef knife with ergonomic handle',
      image: 'https://rebexcutlery.com/cdn/shop/products/1.jpg?v=1678293343&width=1946&t=' + Date.now()
    },
    {
      id: 16,
      name: 'Paring Knife',
      category: 'Knives',
      price: 35.50,
      description: 'Precision paring knife for detailed cutting',
      image: 'https://www.zwilling.com/dw/image/v2/BCGV_PRD/on/demandware.static/-/Sites-zwilling-master-catalog/default/dwd098f042/images/large/38400-080-0_1.jpg?sw=720&sh=720&sm=fit&t=' + Date.now()
    },
    {
      id: 17,
      name: 'Cutting Board',
      category: 'Cutting Boards',
      price: 42.00,
      description: 'Large bamboo cutting board with juice groove',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCyCQN7xAahKICdYEnMc0EFDrOEUZzWU7VmA&s&t=' + Date.now()
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Utensils', 'Measuring Tools', 'Mixing & Prep', 'Knives', 'Cutting Boards'];

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
            const quantity = getProductQuantity(product.id);
            return (
              <motion.div
                key={product.id}
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
                        onClick={() => removeFromCart(product.id)}
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
      </motion.div>
    </div>
  );
};

export default Shop;
