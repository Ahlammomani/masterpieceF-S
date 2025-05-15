import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProductReviews = ({ productId }) => {
  const [userId, setUserId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');


  useEffect(() => {
  const storedUserId = Cookies.get('userId'); // 👈 تأكد أنه نفس الاسم
  if (storedUserId) {
    setUserId(storedUserId);
    console.log("User ID from cookie:", storedUserId);
  }
}, []);
  //Fetch reviews
 useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}/reviews`);
        
        // Assuming the response contains the reviews in `data.data`
        if (response.data.success) {
          setReviews(response.data.data); // Update reviews state
        } else {
          setError('Failed to fetch reviews'); // Handle case where no reviews are fetched
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch reviews'); // Set error state if something goes wrong
      } finally {
        // setLoading(false); // Stop loading once the request completes
      }
    };

    fetchReviews();
  }, [productId]);
  // Submit new review
  const submitReview = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setReviewError('يجب تسجيل الدخول أولاً لإضافة تقييم');
      return;
    }

    if (rating < 1 || rating > 5) {
      setReviewError('الرجاء اختيار تقييم صحيح بين 1 و 5');
      return;
    }

    try {
      setReviewLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/products/${productId}/reviews`,
        { rating, content: reviewContent },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId?.token || ''}`
          }
        }
      );
      
      setReviews([response.data, ...reviews]);
      setRating(0);
      setReviewContent('');
      setReviewError('');
    } catch (err) {
      console.error('فشل في إرسال التقييم:', err);
      setReviewError(err.response?.data?.message || 'حدث خطأ أثناء إرسال التقييم');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="mt-16 border-t pt-12">
      <h2 className="text-2xl font-bold text-[#97BE5A] mb-8">Product Reviews</h2>
      
      {/* Add Review Form */}
      {userId ? (
        <form onSubmit={submitReview} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-lg font-medium text-[#99BC85] mb-2">Your Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full p-3 border-2 border-[#99BC85] rounded-lg focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent"
              rows="4"
              required
            />
          </div>
          
          {reviewError && <div className="text-red-500 mb-4">{reviewError}</div>}
          
          <button
            type="submit"
            disabled={reviewLoading || rating === 0}
            className="bg-[#99BC85] text-white px-6 py-3 rounded-lg hover:bg-[#97BE5A] transition-all duration-300 disabled:bg-gray-400"
          >
            {reviewLoading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-blue-50 text-[#97BE5A] rounded-lg text-center border border-[#99BC85]/30">
          <p className="text-lg">To add a review, please <a href="/login" className="font-semibold underline text-[#FF8BA7] hover:text-[#ff6c91]">log in</a> first</p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review) => (
            <div 
              key={review.id} 
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-[#99BC85] flex items-center justify-center mr-4 overflow-hidden text-[#FDFAF6]">
                  {review.userId?.avatar ? (
                    <img 
                      src={review.userId.avatar} 
                      alt={review.userId.name || 'userId'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl">
                      {(review.userId?.name || 'U').charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-[#97BE5A]">{review.userId?.name || 'userId'}</h4>
                    <div className="flex">
                    {[...Array(5)].map((_, i) => (
  <span key={`${review.id}-${i}`} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
    ★
  </span>
))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <p className="text-gray-700 mt-2">{review.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;