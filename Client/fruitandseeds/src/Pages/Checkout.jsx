import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'userId']);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState('');

  const orderId = location.state?.orderId;
console.log("Token from cookie:", cookies.token);
  useEffect(() => {
   
    if (!cookies.token || !cookies.userId) {
      navigate('/login', { state: { from: 'checkout' } });
      return;
    }

    if (!orderId) {
      navigate('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          headers: { 
            'Authorization': `Bearer ${cookies.token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include' // if you're using cookies for auth
        });

        const data = await response.json();
        
        // Check if order exists before using the data
        if (data && data.totalPrice) {
          // Convert totalPrice to a number
          const totalPrice = parseFloat(data.totalPrice);
          console.log("order.totalPrice:", totalPrice, "Type:", typeof totalPrice);
          
          setOrder({ ...data, totalPrice });
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        navigate('/');
      }
    };

    fetchOrder();
  }, [orderId, cookies.token, cookies.userId, navigate]);
  const handlePayment = async () => {
    try {
    await fetch(`http://localhost:5000/api/orders/${orderId}/pay`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.token}`
  },
  credentials: 'include',
  body: JSON.stringify({ paymentMethod, address })
});

      const result = await response.json();
      if (response.ok) {
        navigate('/order-confirmation', { state: { orderId: result.id } });
      } else {
        alert(result.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed');
    }
  };
useEffect(() => {
  if (order) {
    console.log("order.totalPrice:", order.totalPrice, "Type:", typeof order.totalPrice);
  }
}, [order]);
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">Order not found</div>;
  }

 return (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#99BC85] mb-8">Checkout</h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

          <div className="mt-4 space-y-4">
            {Array.isArray(order?.items) && order.items.length > 0 ? (
              order.items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">{item.product.name}</h3>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  
              {order?.totalPrice
  ? <p className="text-xl font-bold">${Number(order.totalPrice).toFixed(2)}</p>
  : <p className="text-xl font-bold">$0.00</p>}

                </div>
              ))
            ) : (
              <p>No items found in the order</p>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
            <h3 className="text-xl font-bold">Total</h3>
                       {order?.totalPrice
  ? <p className="text-xl font-bold">${Number(order.totalPrice).toFixed(2)}</p>
  : <p className="text-xl font-bold">$0.00</p>}
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#99BC85] focus:border-[#99BC85]"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="card"
                name="paymentMethod"
                type="radio"
                className="h-4 w-4 text-[#99BC85] focus:ring-[#99BC85] border-gray-300"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                Credit/Debit Card
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="cash"
                name="paymentMethod"
                type="radio"
                className="h-4 w-4 text-[#99BC85] focus:ring-[#99BC85] border-gray-300"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
              />
              <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                Cash on Delivery
              </label>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-8 w-full bg-gradient-to-r from-[#FF8BA7] to-[#FF6B6B] text-white py-3 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default CheckoutPage;