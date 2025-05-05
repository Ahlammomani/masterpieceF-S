import React from 'react';
import { motion } from 'framer-motion';
import heroImage from "../assets/hero-image.jpeg";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Hero Container */}
      <motion.div 
        className="relative h-screen min-h-[600px] max-h-[800px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Darker Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Homemade treats"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 "></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block mb-2">Delicious, Homemade Treats</span>
              <span className="text-2xl md:text-4xl font-normal">From Our Family to Yours</span>
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Crafted with love by a mother-daughter duo using only the finest natural ingredients
            </motion.p>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, type: 'spring' }}
            >
              <button className="px-8 py-3 bg-[#A5B68D] hover:bg-[#8FA07A] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Order Now
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Wave Divider - More Pronounced */}
      {/* <div className="relative w-full h-24 md:h-32 -mt-1">
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          className="w-full h-full"
        >
          <path 
            fill="white"
            d="M0,0 C150,95 350,25 500,80 C650,135 850,5 1000,60 C1150,115 1350,45 1440,100 L1440,120 L0,120 Z"
          ></path>
        </svg>
      </div> */}
    </div>
  )
}

export default Hero;