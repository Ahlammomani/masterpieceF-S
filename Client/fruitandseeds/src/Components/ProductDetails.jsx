import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProductDetails = ({ product, images, mainImage, setMainImage }) => {
  const navigate = useNavigate();
const [cookies] = useCookies(['token', 'userId']);
  const handleBuyNow = async () => {
if (!cookies.token || !cookies.userId) {
  navigate('/login', { state: { from: 'checkout' } });
  return;
}
console.log('token:', cookies.token);
console.log('userId:', cookies.userId);
    try {
      // Create a new order with this single product
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`
        },
         credentials: 'include',
        body: JSON.stringify({
         userId: cookies.userId,
          items: [{
            productId: product.id,
            quantity: 1,
            price: product.price
          }],
          totalPrice: product.price,
          status: 'pending',
          paymentMethod: 'card' // default, can be changed in checkout
        })
      });

      if (!response.ok) {
  const text = await response.text(); // Try to read what went wrong
  console.error('Failed response:', response.status, text);
  throw new Error('Order creation failed');
}

      const order = await response.json();
      navigate('/checkout', { state: { orderId: order.id } });
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error (show toast or message)
    }
  };

  return (
    <div className="relative md:flex md:gap-12 items-start">
      {/* Left column - Images */}
      <div className="md:w-1/2 relative">
        {/* Main image with creative border */}
        <div className="relative z-10 mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#99BC85] to-[#FF8BA7] opacity-70 rounded-2xl transform rotate-3 scale-105 transition-all duration-300 group-hover:rotate-1"></div>
          <div className="relative rounded-2xl overflow-hidden aspect-square shadow-lg">
            {mainImage ? (
              <img 
                src={mainImage} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder.jpg';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                No image available
              </div>
            )}
          </div>
        </div>

        {/* Image thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            {images.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setMainImage(img.url)}
                className={`aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                  mainImage === img.url ? 
                    'ring-2 ring-[#FF8BA7] scale-105 shadow-md z-10' : 
                    'ring-1 ring-[#99BC85] opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right column - Details */}
      <div className="md:w-1/2 mt-12 md:mt-0 relative">
        {/* Product name */}
        <div className="relative mb-6">
          <h1 className="text-4xl font-bold text-[#99BC85]">{product.name}</h1>
          <div className="h-1 w-24 bg-[#FF8BA7] mt-2 rounded-full"></div>
        </div>
        
        {/* Price */}
        <div className="inline-flex items-center mb-8">
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-[#FF8BA7] transform -rotate-3 rounded-lg"></span>
            <span className="relative block bg-[#FF8BA7] text-white text-2xl font-bold px-6 py-2 rounded-lg">
              ${product.price}
            </span>
          </span>
          {product.quantity > 0 && (
            <span className="ml-4 bg-[#97BE5A] bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
              In Stock
            </span>
          )}
          {product.quantity <= 0 && (
            <span className="ml-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Product description */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-[#99BC85] mb-2 flex items-center">
            <span className="w-2 h-2 bg-[#FF8BA7] rounded-full mr-2"></span>
            Product Description:
          </h3>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#99BC85] to-[#FF8BA7] rounded-full"></div>
            <p className="text-gray-700 pl-4 py-2">
              {product.description || 'No description available'}
            </p>
          </div>
        </div>

        {/* Categories */}
        {product.categories && product.categories.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-[#99BC85] mb-2 flex items-center">
              <span className="w-2 h-2 bg-[#FF8BA7] rounded-full mr-2"></span>
              Categories:
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.categories.map(category => (
                <span 
                  key={category.id} 
                  className="px-3 py-1 bg-gradient-to-r from-[#99BC85] to-[#97BE5A] bg-opacity-10 rounded-full text-sm text-white font-medium shadow-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buy Now Button */}
        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-[#FF8BA7] to-[#FF6B6B] text-white py-3 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;