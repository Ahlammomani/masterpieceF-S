import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ProductDetails from '../Components/ProductDetails';
import ProductReviews from '../Components/Reviews';
import SimilarProducts from '../Components/SimilarProducts';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(['user']);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Product details state
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [similarProducts, setSimilarProducts] = useState([]);

  // Fetch similar products
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}/similar`);
        setSimilarProducts(res.data);
      } catch (err) {
        console.error('Error fetching similar products:', err);
      }
    };

    if (productId) {
      fetchSimilarProducts();
    }
  }, [productId]);

  // Fetch product details and images
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Fetch product data
        const productResponse = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(productResponse.data);
        
        // Fetch product images
        const imagesResponse = await axios.get('http://localhost:5000/api/images');
        const productImages = imagesResponse.data
          .filter(img => img.productId == productId)
          .map(img => ({
            id: img.id,
            url: `http://localhost:5000/${img.image.replace(/\\/g, '/')}`,
            alt: `Product ${productId} image`
          }));
        
        setImages(productImages);
        if (productImages.length > 0) {
          setMainImage(productImages[0].url);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  // Check authentication status
  useEffect(() => {
    if (cookies.user !== undefined) {
      setIsAuthChecked(true);
    }
  }, [cookies.user]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      });
      
      if (response.status === 401) {
        navigate('/login', { 
          state: { 
            from: location.pathname,
            message: 'يجب تسجيل الدخول لإضافة منتجات للسلة'
          } 
        });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل إضافة المنتج للسلة');
      }

      alert('تمت الإضافة للسلة بنجاح!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message);
    }
  };

  if (!isAuthChecked) {
    return <div className="text-center py-4">جاري التحقق من المصادقة...</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-[#99BC85] rounded-full"></div>
          <div className="h-3 w-3 bg-[#FF8BA7] rounded-full"></div>
          <div className="h-3 w-3 bg-[#97BE5A] rounded-full"></div>
        </div>
        <div className="text-[#99BC85] text-lg font-medium ml-3">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-red-500 text-center py-8 max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-700 text-center py-8">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <ProductDetails 
          product={product} 
          images={images} 
          mainImage={mainImage} 
          setMainImage={setMainImage}
          handleAddToCart={handleAddToCart}
        />
        
        <ProductReviews 
          productId={productId} 
          user={cookies.user} 
        />
        
        {similarProducts.length > 0 && (
          <SimilarProducts 
            products={similarProducts} 
            navigate={navigate} 
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;