import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import CheckoutModal from '../components/CheckoutModal';
import { useCart } from '../context/CartContext';

function Cart() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cartItems, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const handleOrderComplete = () => {
    setTimeout(() => {
      navigate('/orders');
    }, 2000);
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

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors">
      <Navbar />
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-600 dark:text-dark-muted hover:text-orange-500 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span> 
          </Link>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text transition-colors">Shopping Cart</h1>
            <motion.span 
              className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </motion.span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <motion.div 
                className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-12 text-center transition-colors"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <ShoppingBag className="w-20 h-20 text-gray-300 dark:text-dark-muted mx-auto mb-4 transition-colors" />
                <p className="text-gray-500 dark:text-dark-muted text-xl mb-2 transition-colors">Your cart is empty</p>
                <p className="text-gray-400 dark:text-dark-muted mb-6 transition-colors">Add some kitchen essentials to get started!</p>
                <Link 
                  to="/shop" 
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Browse Products
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-4 sm:p-6 hover:shadow-md dark:hover:shadow-orange-500/10 transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-dark-text mb-1 transition-colors">{item.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-dark-muted mb-2 transition-colors">{item.category}</p>
                            <p className="text-orange-500 font-bold text-xl">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <motion.button
                            onClick={() => removeItem(item.id)}
                            className="p-2 h-fit hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Remove item"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400 transition-colors" />
                          </motion.button>
                        </div>
                        <div className="mt-auto pt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 dark:text-dark-muted transition-colors">Quantity:</span>
                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-dark-border rounded-lg border border-gray-300 dark:border-dark-border transition-colors">
                              <motion.button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded-l-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus className="w-4 h-4 text-gray-600 dark:text-dark-text transition-colors" />
                              </motion.button>
                              <span className="w-12 text-center font-semibold text-gray-900 dark:text-dark-text transition-colors">
                                {item.quantity}
                              </span>
                              <motion.button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded-r-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus className="w-4 h-4 text-gray-600 dark:text-dark-text transition-colors" />
                              </motion.button>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-dark-muted ml-auto transition-colors">
                              Subtotal: <span className="font-semibold text-gray-900 dark:text-dark-text transition-colors">${(item.price * item.quantity).toFixed(2)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <motion.div 
                className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-6 sticky top-24 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-4 transition-colors">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-dark-muted transition-colors">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-dark-muted transition-colors">
                    <span>Tax (8%):</span>
                    <span className="font-semibold">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-dark-muted transition-colors">
                    <span>Shipping:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400 transition-colors">FREE</span>
                  </div>
                  
                  <div className="border-t border-gray-300 dark:border-dark-border pt-3 mt-3 transition-colors">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-dark-text transition-colors">
                      <span>Total:</span>
                      <span className="text-orange-500">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <motion.button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg hover:shadow-xl mb-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
                
                <Link 
                  to="/shop" 
                  className="block w-full text-center border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border text-gray-700 dark:text-dark-text font-semibold py-3 rounded-xl transition-colors"
                >
                  Continue Shopping
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border transition-colors">
                  <div className="space-y-3 text-sm text-gray-600 dark:text-dark-muted transition-colors">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 dark:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 dark:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 dark:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Secure checkout</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        cartTotal={getCartTotal()}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}

export default Cart;
