import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CheckoutModal from './CheckoutModal';
import { useCart } from '../context/CartContext';

const CartModal = ({ isOpen, onClose }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const handleCheckoutOpen = () => {
    setIsCheckoutOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
    document.body.style.overflow = 'unset';
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const getCartTotal = () => {
    return {
      subtotal: calculateSubtotal().toFixed(2),
      tax: calculateTax().toFixed(2),
      total: calculateTotal().toFixed(2)
    };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          <motion.div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
      
      <motion.div 
        className="relative bg-white dark:bg-dark-card shadow-2xl w-full max-w-md h-full overflow-hidden flex flex-col"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card transition-colors">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Cart</h2>
            <motion.span 
              className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full"
              key={cartItems.length}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              {cartItems.length}
            </motion.span>
          </div>
          <motion.button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close cart"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-dark-text" />
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-dark-muted mx-auto mb-4" />
              <p className="text-gray-500 dark:text-dark-muted text-lg">Your cart is empty</p>
              <p className="text-gray-400 dark:text-dark-muted text-sm mt-2">Add some kitchen essentials to get started!</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex gap-3 p-3 bg-white dark:bg-dark-bg rounded-lg hover:shadow-md dark:hover:shadow-orange-500/10 transition-all border border-gray-100 dark:border-dark-border"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    layout
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-dark-text truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-dark-muted">{item.category}</p>
                      <p className="text-orange-500 font-bold mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-dark-border rounded-lg border border-gray-300 dark:border-dark-border">
                          <motion.button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-dark-card rounded-l-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 text-gray-600 dark:text-dark-text" />
                          </motion.button>
                          <motion.span 
                            className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-dark-text"
                            key={item.quantity}
                            initial={{ scale: 1.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-dark-card rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 text-gray-600 dark:text-dark-text" />
                          </motion.button>
                        </div>
                        <motion.button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors ml-auto focus:outline-none focus:ring-2 focus:ring-red-500"
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <motion.div 
            className="border-t border-gray-200 dark:border-dark-border p-6 bg-white dark:bg-dark-card transition-colors"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-dark-muted">
                <span>Subtotal:</span>
                <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-dark-muted">
                <span>Tax (8%):</span>
                <span className="font-semibold">${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-dark-muted">
                <span>Shipping:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">FREE</span>
              </div>
              <div className="border-t border-gray-300 dark:border-dark-border pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-dark-text">
                  <span>Total:</span>
                  <span className="text-orange-500">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <motion.button 
                onClick={handleCheckoutOpen}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
              </motion.button>
              <Link 
                to="/cart" 
                onClick={onClose}
                className="block w-full text-center border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border text-gray-700 dark:text-dark-text font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                View Full Cart
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={handleCheckoutClose}
        cartTotal={getCartTotal()}
        onOrderComplete={clearCart}
      />
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
