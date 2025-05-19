import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroimage from '../assets/hero-image.jpeg';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Colors from the request
  const colors = {
    green: "#99BC85",
    lightGreen: "#97BE5A",
    pink: "#F9C1CF",
    pink2:'#FF8BA7',
    cream: "#FDFAF6"
  };

  const handleOrderClick = () => {
    navigate('/menu'); // Navigate to menu page when button is clicked
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Curved Background */}
      <div className="absolute inset-0 z-0">
        {/* Main curved shape - flipped to point downward */}
        <svg 
          viewBox="0 0 1440 800" 
          className="absolute top-0 left-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 L0,500 Q720,800 1440,500 L1440,0 Z" 
            fill={colors.green} 
          />
          <path 
            d="M0,0 L0,400 Q720,600 1440,400 L1440,0 Z" 
            fill={colors.lightGreen} 
            fillOpacity="0.6" 
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-full py-16 px-4">
        {/* Image container - full width on mobile, half on larger screens */}
        <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
          {/* Hero image in a circular frame with pink shadow */}
          <div 
            className="w-4/5 md:w-3/4 aspect-square rounded-full bg-white overflow-hidden"
            style={{ boxShadow: `0 0 30px 10px ${colors.pink}` }}
          >
            <img 
              src={heroimage} 
              alt="Delicious homemade treats" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content container - full width on mobile, half on larger screens */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Delicious, Homemade Sweets
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 md:mb-8">
            From Our Family to Yours. Made with love, natural ingredients, and a passion for wholesome sweetness.
          </p>
          
          {/* Call to Action Button */}
          <div className="flex justify-center md:justify-start">
            <button 
              className={`px-6 md:px-8 py-3 rounded-full text-white font-medium transition-all duration-300 ${isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow'}`}
              style={{ backgroundColor: isHovered ? colors.pink2 : colors.green }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleOrderClick}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}