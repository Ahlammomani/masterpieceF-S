
import React, { useEffect, useState } from 'react';

const SimilarProducts = ({ products, navigate }) => {
  const [productImages, setProductImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/images');
        if (!response.ok) throw new Error('Failed to fetch images');
        const imagesData = await response.json();
        // Create a mapping of productId to first image URL
        const imagesMap = {};
        imagesData.forEach(img => {
          if (!imagesMap[img.productId]) {
            imagesMap[img.productId] = `http://localhost:5000/${img.image.replace(/\\/g, '/')}`;
          }
        });
        setProductImages(imagesMap);
      } catch (error) {
        console.error('Error fetching product images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductImages();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#99BC85]"></div>
    </div>
  );

  return (
    <div className="mt-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#99BC85] mb-6 border-b border-[#99BC85] pb-2">Similar Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/Details/${product.id}`)}
              className="cursor-pointer bg-[#FDFAF6] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-gray-100 group"
            >
              {/* Product Image */}
              <div className="h-52 bg-gray-50 overflow-hidden relative">
                {productImages[product.id] ? (
                  <img
                    src={productImages[product.id]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
                <div className="absolute top-0 right-0 bg-[#99BC85] text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                  ${product.price}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-[#97BE5A] transition-colors duration-300">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">View details</span>
                  <svg className="w-5 h-5 text-[#99BC85] transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;