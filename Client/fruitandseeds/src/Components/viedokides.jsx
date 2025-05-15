import React, { useState } from 'react';
import { motion } from 'framer-motion';

const KidsRecipeVideo = () => {
  const [videoStarted, setVideoStarted] = useState(false);

  const startVideo = () => {
    setVideoStarted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4">
      <motion.div
        className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: true }}
      >
        {!videoStarted && (
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-10 flex items-center justify-center">
            <motion.button
              className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer shadow-lg focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startVideo}
              aria-label="Play video"
            >
              <svg className="w-10 h-10 text-[#97BE5A]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
              </svg>
            </motion.button>
          </div>
        )}
        
        <iframe 
          className="w-full aspect-video"
          src={videoStarted 
            ? "https://www.youtube.com/embed/OaliHe5nKo0?autoplay=1&mute=1" 
            : "https://www.youtube.com/embed/OaliHe5nKo0"
          }
          title="Quick & Easy Kids Recipe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div>
    </div>
  );
};

export default KidsRecipeVideo;