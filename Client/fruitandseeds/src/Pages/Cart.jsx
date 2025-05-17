import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart', {
        credentials: 'include'
      });

      // إذا كان الرد غير ناجح (مثل 404)
      if (response.status === 404) {
        navigate('/not-found');
        return;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch cart items');
      }

      setCartItems(data);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      
      // للردود غير الناجحة (500, 404, إلخ)
      if (err.message.includes('404')) {
        navigate('/not-found');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // دالة مساعدة للتعامل مع الاستجابات
  const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/update/${cartItemId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      await handleResponse(response);
      
      setCartItems(cartItems.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert(err.message);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${cartItemId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      await handleResponse(response);

      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (err) {
      console.error('Error removing item:', err);
      alert(err.message);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.Product.price * item.quantity),
      0
    ).toFixed(2);
  };

   if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FF8BA7]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Error Occurred</h2>
        <p className="text-xl mb-6 text-gray-300">{error}</p>
        <button
          onClick={fetchCartItems}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#FF8BA7]">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">Your cart is empty</p>
          <p className="mt-2">Start shopping to add items to your cart</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col md:flex-row"
              >
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <img
                    src={item.Product.image}
                    alt={item.Product.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                <div className="md:w-3/4 md:pl-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">{item.Product.name}</h2>
                      <p className="text-gray-600 mt-1">{item.Product.description}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 
                          00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-lg font-semibold">
                      ${(item.Product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-2xl font-semibold mb-4">Summary</h3>
            <p className="text-lg mb-2">Total: ${calculateTotal()}</p>
            <button className="bg-[#FF8BA7] text-white px-6 py-2 rounded-md hover:bg-[#ff6f91]">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
