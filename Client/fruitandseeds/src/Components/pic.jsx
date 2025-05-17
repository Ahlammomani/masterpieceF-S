import { useState } from 'react';

export default function ProductGallery() {
  // Sample product data
  const products = [
    { id: 1, name: "Pink Flowers", image: "/api/placeholder/60/60" },
    { id: 2, name: "Heart Decoration", image: "/api/placeholder/60/60" },
    { id: 3, name: "Marble Pattern", image: "/api/placeholder/60/60" },
    { id: 4, name: "Makeup Brush", image: "/api/placeholder/60/60" },
    { id: 5, name: "Gold Ribbon", image: "/api/placeholder/60/60" },
    { id: 6, name: "Vanilla Cake", image: "/api/placeholder/60/60" },
    { id: 7, name: "Pink Utensils", image: "/api/placeholder/60/60" },
    { id: 8, name: "Cosmetic Product", image: "/api/placeholder/60/60" },
    { id: 9, name: "Floral Pattern", image: "/api/placeholder/60/60" },
    { id: 10, name: "Pink Decoration", image: "/api/placeholder/60/60" },
  ];

  return (
    <div className="bg-[#FDFAF6]">
      {/* Compact horizontal gallery with pink border */}
      <div className="border-t-2 border-b-2 border-[#FF8BA7] py-1">
        <div className="flex overflow-x-auto space-x-0">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative flex-shrink-0 w-16 h-16 cursor-pointer transform transition-transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover"
      />
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <p className="text-white text-xs text-center px-1">{product.name}</p>
        </div>
      )}
    </div>
  );
}