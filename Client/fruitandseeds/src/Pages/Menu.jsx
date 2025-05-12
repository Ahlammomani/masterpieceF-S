import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Added missing import
import heroBackground from "../assets/contactus.jpeg";
import heroBg from "../assets/contactus.jpeg"; // Added missing import

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchCategories();
        await fetchProducts();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, selectedCategories]);

  useEffect(() => {
    if (products.length > 0) {
      fetchImages();
    }
  }, [products]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: {
          search: search,
          categoryId: selectedCategories.length > 0 ? selectedCategories.join(',') : '',
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchImages = async () => {
    setImageLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/images');
      const imagesMap = {};
      response.data.forEach(img => {
        if (img.productId) {
          const imagePath = img.image.replace(/\\/g, '/');
          if (!imagesMap[img.productId]) {
            imagesMap[img.productId] = [];
          }
          imagesMap[img.productId].push({
            id: img.id,
            url: `http://localhost:5000/${imagePath}`,
            alt: `Product ${img.productId} image`
          });
        }
      });
      setProductImages(imagesMap);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/Details/${productId}`);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategories([]);
  };
  
  const toggleCategory = (catId) => {
    setSelectedCategories(prev => {
      if (prev.includes(catId)) {
        return prev.filter(id => id !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative elements */}
      {/* <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8BA7] rounded-bl-full opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-72 bg-[#99BC85] rounded-tr-full opacity-30"></div> */}

      {/* Main content container */}
      <div className="container mx-auto  relative z-10">
        {/* Hero section */}
        <motion.div 
          className="relative h-96 flex items-center justify-center overflow-hidden bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroBg})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="text-center px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">RECIPE INDEX</h1>
            <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
              Discover our collection of delicious recipes for every occasion
            </p>
          </motion.div>
        </motion.div>

        {/* Custom note section */}
        <div className="bg-[#FF8BA7]/15 border-l-4 border-[#FF8BA7] p-4 rounded-r-lg shadow-sm mb-8">
          <p className="text-gray-700 italic flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF8BA7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>You can choose or change the type of fruit you prefer, including seasonal fruits, even if it's not shown in the picture.</span>
          </p>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">

        {/* Search and filter section - Horizontal layout */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 ">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:flex-1">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">SEARCH</h3>
              <input
                type="text"
                placeholder="Search for recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#97BE5A]"
              />
            </div>
            
            <div className="w-full md:flex-1">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">CATEGORY</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedCategories([])}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategories.length === 0 ? 'bg-[#97BE5A] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategories.includes(cat.id) ? 'bg-[#97BE5A] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name}
                    {selectedCategories.includes(cat.id) && (
                      <span className="ml-1">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-7">
              <button 
                onClick={resetFilters}
                className="w-full md:w-auto px-6 py-3 bg-[#97BE5A] text-white rounded-md hover:bg-[#99BC85] transition flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                RESET FILTERS
              </button>
            </div>
          </div>
        </div>

        {/* Recipe cards grid */}
        {loading ? (
          <div className="flex justify-center my-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#97BE5A]"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const productCategories = Array.isArray(product.categories) ? product.categories : [];
              const firstImage = productImages[product.id]?.[0];

              return (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#F0F0F0]"
                >
                  <div 
                    className="h-48 overflow-hidden cursor-pointer relative group"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {firstImage ? (
                      <img 
                        src={firstImage.url} 
                        alt={firstImage.alt}
                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        {imageLoading ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#97BE5A]"></div>
                        ) : (
                          <span className="text-gray-500">No Images Available</span>
                        )}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                      <h3 className="text-white font-medium text-xl">{product.name}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {product.description || 'No description available'}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {productCategories.map(cat => (
                          <span 
                            key={cat.id} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#97BE5A]/20 text-[#97BE5A]"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => handleProductClick(product.id)}
                        className="text-[#FF8BA7] hover:text-[#97BE5A] text-sm font-medium flex items-center"
                      >
                        View Recipe
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-[#F0F0F0]">
            <span className="text-gray-500 text-lg">No recipes found.</span>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MenuPage;