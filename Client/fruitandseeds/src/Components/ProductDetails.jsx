import React from 'react';
import { motion } from 'framer-motion';

const ProductDetails = ({ product, images, mainImage, setMainImage, handleAddToCart }) => {
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

        {/* Add to cart button */}
        <button
          disabled={product.quantity <= 0}
          onClick={handleAddToCart}
          className={`w-full py-4 px-6 rounded-full text-white font-bold text-lg transition-all duration-300 relative overflow-hidden ${
            product.quantity > 0 ? 
              'bg-[#FF8BA7] hover:bg-[#FF8BA7] shadow-lg' : 
              'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {product.quantity > 0 ? 'أضف إلى السلة' : 'غير متوفر'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;