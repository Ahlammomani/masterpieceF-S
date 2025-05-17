import React from 'react';
import { useNavigate } from 'react-router-dom';

const HealthySweetsQuote = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup'); // Adjust the route as needed
  };

  return (
    <div className="relative max-w-4xl mx-auto my-16 px-6 py-12 rounded-xl" 
        >
      
      {/* Decorative corner elements */}
      {/* <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4" 
           style={{ borderColor: '#99BC85' }}></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4" 
           style={{ borderColor: '#FF8BA7' }}></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4" 
           style={{ borderColor: '#97BE5A' }}></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4" 
           style={{ borderColor: '#FF8BA7' }}></div> */}
      
      {/* Main quote container */}
      <div className="relative text-center">
        {/* Opening quote mark */}
        <span className="absolute -top-8 -left-4 text-8xl font-serif opacity-30" 
              style={{ color: '#97BE5A' }}>“</span>
        
        {/* Main quote text */}
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 px-8" 
            style={{ color: '#99BC85' }}>
          Why don't you be healthy <span className="whitespace-nowrap">even when</span> you're eating sweets?
        </h2>
        
        {/* Closing quote mark */}
        <span className="absolute -bottom-12 -right-4 text-8xl font-serif opacity-30" 
              style={{ color: '#FF8BA7' }}>”</span>
      </div>
      
      {/* Join Us Now Button */}
      <div className="flex justify-center mt-10">
        <button 
          onClick={handleSignUpClick}
          className="px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          style={{
            backgroundColor: '#FF8BA7',
            color: '#FDFAF6'
          }}
        >
          Join Us Now
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 inline-block ml-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-6 left-1/4 transform -translate-x-1/2 w-12 h-12 rounded-full opacity-20" 
           style={{ backgroundColor: '#97BE5A' }}></div>
      <div className="absolute -top-6 right-1/4 transform translate-x-1/2 w-8 h-8 rounded-full opacity-20" 
           style={{ backgroundColor: '#FF8BA7' }}></div>
      
      {/* Small decorative dots */}
      <div className="flex justify-center space-x-4 mt-12">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="w-3 h-3 rounded-full opacity-60"
            style={{ 
              backgroundColor: i % 2 === 0 ? '#99BC85' : '#FF8BA7' 
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HealthySweetsQuote;