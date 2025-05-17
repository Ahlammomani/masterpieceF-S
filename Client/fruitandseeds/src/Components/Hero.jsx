import { useState } from 'react';
import heroimage from '../assets/hero-image.jpeg';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Colors from the request
  const colors = {
    green: "#99BC85",
    lightGreen: "#97BE5A",
    pink: "#FF8BA7",
    // cream: "#FDFAF6"
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Curved Background */}
      <div className="absolute inset-0 z-0" style={{ background: colors.cream }}>
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

      <div className="relative z-10 flex h-full">
        {/* Left side - Empty space or could have an image */}
        <div className="w-1/2 flex items-center justify-center">
          {/* Hero image in a circular frame */}
          <div className="w-3/4 aspect-square rounded-full bg-white shadow-xl overflow-hidden">
            <img 
              src={heroimage} 
              alt="Delicious homemade treats" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Text and CTA */}
        <div className="w-1/2 flex flex-col justify-center px-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Delicious, Homemade Treats
          </h1>
          <p className="text-xl text-white mb-8">
            From Our Family to Yours. Handcrafted with love and the finest ingredients
            for moments that matter.
          </p>
          
          {/* Call to Action Button */}
          <div>
            <button 
              className={`px-8 py-3 rounded-full text-white font-medium transition-all duration-300 ${isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow'}`}
              style={{ backgroundColor: isHovered ? colors.pink : colors.green }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}