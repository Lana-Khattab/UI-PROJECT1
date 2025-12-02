import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import CheckoutModal from '../components/CheckoutModal';
import { useCart } from '../context/CartContext';

function Cart() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cartItems, updateQuantity, removeItem } = useCart();

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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl border p-12 text-center">
                <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-xl mb-2">Your cart is empty</p>
                <p className="text-gray-400 mb-6">Add some kitchen essentials to get started!</p>
                <Link 
                  to="/" 
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border p-4 sm:p-6 hover:shadow-md transition-shadow"
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
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <p className="text-orange-500 font-bold text-xl">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 h-fit hover:bg-red-100 rounded-lg transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                        <div className="mt-auto pt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-300">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="w-12 text-center font-semibold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            <span className="text-sm text-gray-600 ml-auto">
                              Subtotal: <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%):</span>
                    <span className="font-semibold">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  
                  <div className="border-t border-gray-300 pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-orange-500">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg hover:shadow-xl mb-3"
                >
                  Proceed to Checkout
                </button>
                
                <Link 
                  to="/shop" 
                  className="block w-full text-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  Continue Shopping
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Secure checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        cartTotal={getCartTotal()}
      />
    </div>
  );
}

export default Cart;
