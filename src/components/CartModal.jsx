import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, X } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-end justify-end">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white shadow-2xl w-full max-w-md h-full overflow-hidden flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
            <span className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some kitchen essentials to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.category}</p>
                    <p className="text-orange-500 font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 bg-gray-50 rounded-lg border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-200 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-200 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-100 rounded transition-colors ml-auto"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (8%):</span>
                <span className="font-semibold">${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-orange-500">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleCheckoutOpen}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>
              <Link 
                to="/cart" 
                onClick={onClose}
                className="block w-full text-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={handleCheckoutClose}
        cartTotal={getCartTotal()}
        onOrderComplete={clearCart}
      />
    </div>
  );
};

export default CartModal;
