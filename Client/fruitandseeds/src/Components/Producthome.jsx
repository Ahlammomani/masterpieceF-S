import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await fetch('http://localhost:5000/api/products');
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        const productsData = await productsRes.json();
        
        // Fetch images
        const imagesRes = await fetch('http://localhost:5000/api/images');
        if (!imagesRes.ok) throw new Error('Failed to fetch images');
        const imagesData = await imagesRes.json();

        // Combine products with their images
        const combinedData = productsData.slice(0, 4).map(product => ({
          ...product,
          images: imagesData
            .filter(img => img.productId === product.id)
            .map(img => ({
              ...img,
              url: `http://localhost:5000/${img.image.replace(/\\/g, '/')}`
            }))
        }));

        setProducts(combinedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const responsiveSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleProductClick = (productId) => {
    navigate(`/Details/${productId}`);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#99BC85]"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-12 text-red-500 bg-[#FDFAF6]">
      Error: {error}
    </div>
  );

  if (!products.length) return (
    <div className="text-center py-12 bg-[#FDFAF6]">
      No products found
    </div>
  );

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-[#99BC85]/10"
      onClick={() => handleProductClick(product.id)}
    >
      <div className="relative h-56 overflow-hidden">
        {product.images?.length > 0 ? (
          <Slider {...productSliderSettings} className="h-full">
            {product.images.map((image) => (
              <div key={image.id} className="h-56">
                <img
                  src={image.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        {/* Decorative element */}
        {/* <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF8BA7] rounded-bl-2xl flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="white"/>
          </svg>
        </div> */}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.categories?.map(category => (
            <span
              key={category.id}
              className="px-3 py-1 bg-[#97BE5A]/90 text-white text-xs rounded-full"
            >
              {category.name}
            </span>
          ))}
        </div>
        <button
          className="w-full py-3 bg-[#FF8BA7] hover:bg-[#e67a95] text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          onClick={(e) => {
            e.stopPropagation();
            handleProductClick(product.id);
          }}
        >
          <span>View Details</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Creative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#99BC85]/10 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-[#FF8BA7]/10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-[#97BE5A]/10 animate-pulse"></div>
        
        {/* Wavy Decorative Elements */}
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute top-0 left-0 w-full h-32 md:h-48"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".1" 
            className="fill-[#99BC85]"
          ></path>
        </svg>
        
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 left-0 w-full h-32 md:h-48 rotate-180"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".1" 
            className="fill-[#FF8BA7]"
          ></path>
        </svg>
      </div>

      {/* Product Section */}
      <div className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-5xl font-bold text-[#FF8BA7] mb-2 relative inline-block">
              Eid is Sweeter with Our Treats
              {/* <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF8BA7] rounded-full"></span> */}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              "Each piece is lovingly made with natural ingredients and authentic flavors — perfect for your most joyful Eid moments"
            </p>
          </div>
          
          {isMobile ? (
            <div className="px-4">
              <Slider {...responsiveSliderSettings}>
                {products.map((product) => (
                  <div key={product.id} className="px-2">
                    <ProductCard product={product} />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductHome;