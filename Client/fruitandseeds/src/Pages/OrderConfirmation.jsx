import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId: paramOrderId } = useParams();
  const [cookies] = useCookies(['token', 'userId']);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // الحصول على orderId من جميع المصادر الممكنة
  const orderId = location.state?.orderId || paramOrderId;

  useEffect(() => {
    if (!cookies.token || !cookies.userId) {
      navigate('/login');
      return;
    }

    if (!orderId) {
      navigate('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://your-api-url/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${cookies.token}`
          }
        });

        if (!response.ok) throw new Error('Order not found');
        
        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        navigate('/');
      }
    };

    fetchOrder();
  }, [orderId, cookies.token, cookies.userId, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Order Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-[#99BC85] text-white px-6 py-2 rounded-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            ✅
          </div>
          <h1 className="text-3xl font-bold text-[#99BC85] mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">Your order #{order.id} has been placed successfully.</p>
          
          <div className="text-left mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="bg-[#99BC85] text-white px-6 py-2 rounded-lg hover:bg-[#88a76f]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;