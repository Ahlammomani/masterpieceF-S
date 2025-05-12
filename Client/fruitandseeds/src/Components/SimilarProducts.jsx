import React from 'react';

const SimilarProducts = ({ products, navigate }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-[#99BC85] mb-4">منتجات مشابهة</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            onClick={() => navigate(`/Details/${product.id}`)}
            className="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition p-4"
          >
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;