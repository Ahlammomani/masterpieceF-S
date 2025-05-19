import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import Swal from 'sweetalert2';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'userId']);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [position, setPosition] = useState(null);
  const [processing, setProcessing] = useState(false);
  const orderId = location.state?.orderId;
  const [deliveryDate, setDeliveryDate] = useState(() => {
  const today = new Date().toISOString().split('T')[0];
  return today;
});


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
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }

        const data = await response.json();
        if (data && data.totalPrice) {
          setOrder({
            ...data,
            totalPrice: parseFloat(data.totalPrice)
          });
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        navigate('/');
      }
    };

    fetchOrder();
  }, [orderId, cookies.token, cookies.userId, navigate]);



const handlePayment = async (paypalOrderId = null) => {
  if (!position) {
    await Swal.fire({
      icon: 'warning',
      title: 'Location Required',
      text: 'Please select your delivery location on the map.',
      confirmButtonColor: '#3085d6',
    });
    return;
  }

  setProcessing(true);
  
  // عرض رسالة "جاري المعالجة"
  Swal.fire({
    title: 'Processing',
    html: 'Your order is being processed...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await fetch(`http://localhost:5000/api/payments/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      body: JSON.stringify({
        paymentMethod,
        address: {
          lat: position.lat,
          lng: position.lng,
          formatted: `Lat: ${position.lat.toFixed(5)}, Lng: ${position.lng.toFixed(5)}`
        },
        amount: order.totalPrice,
        currency: 'JD',
        paypalOrderId,
        userId: cookies.userId,
         deliveryDate: deliveryDate  // هنا التاريخ الجديد
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Payment failed');
    }

    // إغلاق رسالة "جاري المعالجة"
    Swal.close();
    
    // عرض رسالة النجاح
    await Swal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      html: `
        <div style="text-align: left; margin-top: 20px;">
          <p><strong>Order ID:</strong> ${data.data.orderId}</p>
          <p><strong>Payment ID:</strong> ${data.data.paymentId}</p>
        </div>
      `,
      confirmButtonText: 'View Order',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Continue Shopping'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/order-confirmation?orderId=${data.data.orderId}`;
      }
    });

  } catch (error) {
    console.error('Payment error:', error);
    
    // إغلاق رسالة "جاري المعالجة"
    Swal.close();
    
    // عرض رسالة الخطأ
    let errorTitle = 'Payment Failed';
    let errorMessage = error.message;
    
    if (error.message.includes('Internal server error')) {
      errorTitle = 'Server Error';
      errorMessage = 'An unexpected error occurred. Please try again later.';
    }
    
    await Swal.fire({
      icon: 'error',
      title: errorTitle,
      text: errorMessage,
      confirmButtonColor: '#d33',
    });
    
  } finally {
    setProcessing(false);
  }
};

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  if (!order) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Order not found</div>;
  }

  return (
    <PayPalScriptProvider options={{ 
      "client-id": "AVYvR10qmkdmsF_YA9LW6FaMXeCo-nBhAtazvDTAiktMQ4vPytPqdfJrh5rbh_IDqG13h34ycUvKoY0Z",
      currency: "USD"
    }}>
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#99BC85] mb-8">Checkout</h1>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            {/* Order Summary Section */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              <div className="mt-4 space-y-4">
                {order.items?.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">{item.product?.name}</h3>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xl font-bold">JD{(item.product?.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
                <h3 className="text-xl font-bold">Total</h3>
                <p className="text-xl font-bold">${order.totalPrice?.toFixed(2)}</p>
              </div>
            </div>

            {/* Shipping Information Section */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <div className="w-full h-64 mb-4 border border-gray-300 rounded-md overflow-hidden">
                    <MapContainer 
                      center={[31.963158, 35.930359]} 
                      zoom={8} 
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker position={position} setPosition={setPosition} />
                    </MapContainer>
                  </div>
                  {position && (
                    <p className="text-sm text-gray-600">
                      Selected Location: Latitude: {position.lat.toFixed(5)}, Longitude: {position.lng.toFixed(5)}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
  <input
    type="date"
    className="border border-gray-300 rounded-md px-3 py-2 w-full"
    value={deliveryDate}
    min={new Date().toISOString().split('T')[0]} // يمنع التواريخ السابقة
    onChange={(e) => setDeliveryDate(e.target.value)}
  />
</div>

            </div>

            {/* Payment Method Section */}
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
                    PayPal
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

              {paymentMethod === 'card' ? (
                <div className="mt-6">
                  <PayPalButtons
                    style={{ layout: 'vertical' }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: order.totalPrice.toFixed(2),
                              currency_code: "USD"
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      try {
                        const details = await actions.order.capture();
                        await handlePayment(data.orderID);
                      } catch (err) {
                        console.error("PayPal approval error:", err);
                        alert("Payment processing failed. Please try again.");
                      }
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      alert("Failed to initialize PayPal. Please try another payment method.");
                    }}
                  />
                </div>
              ) : (
                <button
                  onClick={() => handlePayment()}
                  disabled={processing}
                  className={`mt-8 w-full bg-gradient-to-r from-[#FF8BA7] to-[#FF6B6B] text-white py-3 px-6 rounded-lg font-bold text-lg shadow hover:shadow-md transition-all duration-300 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {processing ? 'Processing...' : 'Complete Payment'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default CheckoutPage;