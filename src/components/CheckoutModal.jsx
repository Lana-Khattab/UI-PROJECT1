import { useState } from 'react';
import { X, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../utils/api';

const CheckoutModal = ({ isOpen, onClose, cartTotal, onOrderComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: parseFloat(cartTotal.total),
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod
      };

      const response = await orderAPI.create(orderData);

      if (response.data.success) {
        setOrderId(response.data.order._id);
        clearCart();
        setStep(2);
        if (onOrderComplete) {
          onOrderComplete();
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Failed to create order. Please try again.';
      setError(errorMsg);
      console.error('Order creation error:', err);
      console.error('Error response:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setTimeout(() => {
      onClose();
      setStep(1);
      setError(null);
      setOrderId(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'credit-card',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
      });
    }, 2000);
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-6 pt-32 pb-6">
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="relative bg-white dark:bg-dark-card rounded-2xl shadow-2xl dark:shadow-orange-500/10 w-full max-w-md p-8 text-center border dark:border-dark-border"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">Please Sign In</h2>
              <p className="text-gray-600 dark:text-white mb-6">You need to be signed in to place an order.</p>
              <div className="flex gap-3">
                <motion.button
                  onClick={onClose}
                  className="flex-1 border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border text-gray-700 dark:text-dark-text font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.a
                  href="/login"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6 pt-32 pb-6">
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="relative bg-white dark:bg-dark-card rounded-2xl shadow-2xl dark:shadow-orange-500/10 w-full max-w-4xl max-h-full overflow-hidden flex flex-col border dark:border-dark-border"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {step === 1 ? (
              <>
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card transition-colors">
                  <motion.div 
                    className="flex items-center gap-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Truck className="w-6 h-6 text-orange-500" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white\">Checkout</h2>
                  </motion.div>
                  <motion.button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close checkout"
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-dark-text" />
                  </motion.button>
                </div>
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="flex-1 overflow-y-auto p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
              {error && (
                <motion.div 
                  className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </motion.div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Shipping Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Payment Method</h3>
                <div className="space-y-3 mb-4">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-300 dark:border-dark-border rounded-lg cursor-pointer hover:border-orange-500 dark:bg-dark-border transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-500"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600 dark:text-white" />
                    <span className="font-medium text-gray-900 dark:text-white transition-colors">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-300 dark:border-dark-border rounded-lg cursor-pointer hover:border-orange-500 dark:bg-dark-border transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium text-gray-900 dark:text-white transition-colors">PayPal</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-300 dark:border-dark-border rounded-lg cursor-pointer hover:border-orange-500 dark:bg-dark-border transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash-on-delivery"
                      checked={formData.paymentMethod === 'cash-on-delivery'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium text-gray-900 dark:text-white transition-colors">Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentMethod === 'credit-card' && (
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required={formData.paymentMethod === 'credit-card'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required={formData.paymentMethod === 'credit-card'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required={formData.paymentMethod === 'credit-card'}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="3"
                          required={formData.paymentMethod === 'credit-card'}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-border dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 dark:bg-dark-border rounded-lg p-4 mb-6 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-3 transition-colors">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white transition-colors">Subtotal:</span>
                    <span className="font-semibold text-gray-900 dark:text-dark-text transition-colors">${cartTotal?.subtotal || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white transition-colors">Tax:</span>
                    <span className="font-semibold text-gray-900 dark:text-dark-text transition-colors">${cartTotal?.tax || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white transition-colors">Shipping:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400 transition-colors">FREE</span>
                  </div>
                  <div className="border-t border-gray-300 dark:border-dark-text/20 pt-2 mt-2 transition-colors">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-gray-900 dark:text-dark-text transition-colors">Total:</span>
                      <span className="font-bold text-orange-500">${cartTotal?.total || '0.00'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? 'Processing...' : 'Complete Order'}
              </motion.button>
            </motion.form>
          </>
        ) : (
          
          <motion.div 
            className="flex flex-col items-center justify-center p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="mb-6 relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-3 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Order Confirmed!
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-white text-lg mb-2 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for your purchase, {formData.firstName}!
            </motion.p>
            <motion.p 
              className="text-gray-500 dark:text-white mb-6 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Your order has been successfully placed.
            </motion.p>
            <motion.div 
              className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6 w-full max-w-md transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {orderId && (
                <p className="text-sm text-gray-700 dark:text-dark-text mb-2 transition-colors">
                  <span className="font-semibold">Order ID:</span> {orderId}
                </p>
              )}
              <p className="text-sm text-gray-700 dark:text-dark-text transition-colors">
                <span className="font-semibold">Order Total:</span> ${cartTotal?.total || '0.00'}
              </p>
              <p className="text-sm text-gray-700 dark:text-dark-text mt-1 transition-colors">
                <span className="font-semibold">Delivery to:</span> {formData.city}, {formData.state}
              </p>
              <p className="text-sm text-gray-700 dark:text-dark-text mt-1 transition-colors">
                <span className="font-semibold">Payment Method:</span> {formData.paymentMethod === 'credit-card' ? 'Credit Card' : formData.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
              </p>
            </motion.div>
            <motion.p 
              className="text-sm text-gray-500 dark:text-white transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              A confirmation email has been sent to {formData.email}
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
