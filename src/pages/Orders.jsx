import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { orderAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
  processing: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Shipped' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Delivered' },
  cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Cancelled' }
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAll();
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      const response = await orderAPI.cancel(orderId);
      if (response.data.success) {
        setOrders(orders.map(order => 
          order._id === orderId ? response.data.order : order
        ));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text transition-colors">My Orders</h1>
          </div>
          <p className="text-gray-600 dark:text-dark-muted transition-colors">Track and manage your orders</p>
        </div>

        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg transition-colors"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-600 dark:text-red-400 transition-colors">{error}</p>
          </motion.div>
        )}

        {orders.length === 0 ? (
          <motion.div 
            className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border p-12 text-center transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Package className="w-20 h-20 text-gray-300 dark:text-dark-muted mx-auto mb-4 transition-colors" />
            <p className="text-gray-500 dark:text-dark-muted text-xl mb-2 transition-colors">No orders yet</p>
            <p className="text-gray-400 dark:text-dark-muted mb-6 transition-colors">Start shopping to see your orders here</p>
            <Link 
              to="/shop" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const StatusIcon = statusConfig[order.status].icon;
              
              return (
                <motion.div
                  key={order._id}
                  className="bg-white dark:bg-dark-card rounded-xl border dark:border-dark-border hover:shadow-md dark:hover:shadow-orange-500/10 transition-all overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-dark-text transition-colors">
                            Order #{order._id.slice(-8)}
                          </h3>
                          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {statusConfig[order.status].label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-dark-muted transition-colors">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-dark-muted transition-colors">Total Amount</p>
                          <p className="text-2xl font-bold text-orange-500">
                            ${order.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-dark-border pt-4 mb-4 transition-colors">
                      <h4 className="font-medium text-gray-900 dark:text-dark-text mb-3 transition-colors">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-dark-text transition-colors">{item.name}</p>
                              <p className="text-sm text-gray-600 dark:text-dark-muted transition-colors">
                                Quantity: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-900 dark:text-dark-text transition-colors">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-dark-border pt-4 transition-colors">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-dark-text mb-2 transition-colors">Shipping Address</h4>
                          <p className="text-sm text-gray-600 dark:text-dark-muted transition-colors">
                            {order.shippingAddress.fullName}<br />
                            {order.shippingAddress.address}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                            {order.shippingAddress.country}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-dark-text mb-2 transition-colors">Payment Method</h4>
                          <p className="text-sm text-gray-600 dark:text-dark-muted capitalize transition-colors">
                            {order.paymentMethod.replace('-', ' ')}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-dark-muted mt-1 transition-colors">
                            {order.isPaid ? (
                              <span className="text-green-600 dark:text-green-400 font-medium transition-colors">✓ Paid</span>
                            ) : (
                              <span className="text-yellow-600 dark:text-yellow-400 font-medium transition-colors">Pending Payment</span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          to={`/orders/${order._id}`}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border rounded-lg transition-colors text-sm font-medium dark:text-dark-text"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <motion.button
                            onClick={() => handleCancelOrder(order._id)}
                            className="px-4 py-2 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Cancel Order
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Orders;
