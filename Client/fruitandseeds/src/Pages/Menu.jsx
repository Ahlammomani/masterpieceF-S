import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import menuImage from "../assets/menu.jpeg";
import heroBackground from "../assets/contactus.jpeg";
import { Link } from 'react-router-dom';

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchProducts();
  }, [search, category]);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: {
          search: search,
          categoryId: category,
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('');
  };

  return (
    <div className="min-h-screen bg-[#EDE8DC] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E7CCCC] rounded-bl-full opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-96 h-72 bg-[#C1CFA1] rounded-tr-full opacity-30"></div>
      <div className="absolute top-1/3 left-0 w-32 h-64 bg-[#A5B68D] rounded-r-full opacity-20 transform -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-[#E7CCCC] rounded-l-full opacity-20"></div>
      
      {/* Floating Circles */}
      <div className="absolute top-20 left-1/4 w-12 h-12 rounded-full bg-[#C1CFA1] opacity-20"></div>
      <div className="absolute bottom-20 right-1/4 w-16 h-16 rounded-full bg-[#E7CCCC] opacity-30"></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 rounded-full bg-[#A5B68D] opacity-20"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section with the new design */}
        <div className="relative w-full overflow-hidden mb-8 rounded-xl shadow-lg">
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src={heroBackground}
              alt="Recipe Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 text-center">
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-wider">RECIPE INDEX</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Discover our collection of delicious recipes for every occasion
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar - Keeping your original style */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              {/* Search Input */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">SEARCH</h3>
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E7CCCC]"
                />
              </div>
              
              {/* Category Dropdown */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">CATEGORY</h3>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E7CCCC]"
                >
                  <option value="">All Categories</option>
                  <option value="Keto Treats">Keto Treats</option>
                  <option value="Diabetic Treats">Diabetic Treats</option>
                  <option value="Allergy-Friendly Treats">Allergy-Friendly Treats</option>
                  <option value="Kids' Treats">Kids' Treats</option>
                  <option value="Seasonal Treats">Seasonal Treats</option>
                  <option value="Holiday Treats">Holiday Treats</option>
                </select>
              </div>
              
              <button 
                onClick={resetFilters}
                className="w-full py-2 bg-[#A5B68D] text-white rounded-md hover:bg-[#C1CFA1] transition"
              >
                RESET INDEX
              </button>
            </div>
          </div>

          {/* Main Content with the new card design */}
          <div className="flex-1">
            {/* Recipe Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#F0F0F0]"
                  >
                    <div 
                      className="h-48 overflow-hidden cursor-pointer relative group"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <img 
                        src={`http://localhost:5000/uploads/${product.image}`} 
                        alt={product.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                        <h3 className="text-white font-medium text-xl">{product.name}</h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {product.categories?.map(cat => (
                            <span 
                              key={cat.id} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#A5B68D]/20 text-[#A5B68D]"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                        <button 
                          onClick={() => handleProductClick(product.id)}
                          className="text-[#E7CCCC] hover:text-[#C1CFA1] text-sm font-medium"
                        >
                          View Recipe →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-[#F0F0F0]">
                <div className="mx-auto h-24 w-24 bg-[#A5B68D]/10 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    className="h-12 w-12 text-[#A5B68D]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No recipes found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                <div className="mt-6">
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#A5B68D] hover:bg-[#C1CFA1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A5B68D]"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;