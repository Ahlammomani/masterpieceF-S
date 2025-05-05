import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CreativeSection = () => {
  const [videoStarted, setVideoStarted] = useState(false);

  // تأثيرات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const startVideo = () => {
    setVideoStarted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-28 px-4 overflow-hidden">
        {/* خلفية عضوية */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#97BE5A]/10 to-[#FDFAF6]"></div>
        </div>

        {/* عناصر نباتية ديكورية */}
        <div className="hidden md:block absolute -left-20 -top-20 z-0">
          <svg width="300" height="300" viewBox="0 0 200 200" className="text-[#97BE5A]/20">
            <path fill="currentColor" d="M40,-57C53.7,-49.1,68.2,-41.3,73.8,-29.1C79.4,-16.8,76.2,-0.1,70.9,13.9C65.6,27.9,58.3,39.3,47.3,49.5C36.3,59.7,21.7,68.8,5.4,72.4C-10.8,76,-27.7,74.1,-39.9,65.3C-52.1,56.5,-59.6,40.8,-65.1,25.2C-70.6,9.6,-74.1,-5.9,-68.3,-17.9C-62.5,-29.9,-47.4,-38.4,-34.1,-46.5C-20.8,-54.6,-9.4,-62.3,2.3,-65.8C13.9,-69.3,27.9,-68.6,40,-57Z"></path>
          </svg>
        </div>

        <div className="hidden md:block absolute -right-20 -bottom-20 z-0">
          <svg width="350" height="350" viewBox="0 0 200 200" className="text-[#FF8BA7]/20">
            <path fill="currentColor" d="M49.3,-59.7C62.2,-50.7,70.1,-34.8,72.7,-18.9C75.3,-3,72.6,12.9,64.3,26.1C56,39.3,42.1,49.8,26.8,58.2C11.5,66.6,-5.2,72.9,-20.3,68.8C-35.4,64.7,-48.9,50.2,-58.8,33.4C-68.7,16.6,-75.1,-2.5,-70.3,-18.3C-65.5,-34.1,-49.6,-46.6,-33.9,-55C-18.2,-63.4,-2.7,-67.7,12.3,-63.9C27.3,-60.1,54.6,-48.2,49.3,-59.7Z"></path>
          </svg>
        </div>

        {/* المحتوى الرئيسي */}
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-3 h-3 rounded-full bg-[#97BE5A] mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-[#FF8BA7] mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-[#97BE5A]"></div>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
            variants={itemVariants}
          >
            Welcome to <span className="text-[#97BE5A]">Fruit & Seeds</span>!
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 relative"
            variants={itemVariants}
          >
            <span className="absolute -left-6 top-0 text-4xl text-[#97BE5A] font-serif">“</span>
            Since 2015, we've been crafting wholesome desserts with love and care, using only natural, local, and organic ingredients. Our journey began with a simple passion for health and authenticity, and today we proudly serve treats that nourish both body and soul.
            <span className="absolute -right-6 bottom-0 text-4xl text-[#97BE5A] font-serif">”</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <button className="px-8 py-3 bg-[#97BE5A] text-white rounded-full font-medium hover:bg-[#7fa34a] transition-colors shadow-lg hover:shadow-[#97BE5A]/30">
              Our Products
            </button>
          </motion.div>

          {/* عنصر تفاعلي */}
          <motion.div 
            className="mt-16 flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
          
          </motion.div>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-b from-gray-50 to-[#97BE5A]/10">
        {/* عناصر ديكورية */}
        <div className="absolute -left-20 top-1/3 z-0 opacity-20">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-[#97BE5A]">
            <path fill="currentColor" d="M49.3,-59.7C62.2,-50.7,70.1,-34.8,72.7,-18.9C75.3,-3,72.6,12.9,64.3,26.1C56,39.3,42.1,49.8,26.8,58.2C11.5,66.6,-5.2,72.9,-20.3,68.8C-35.4,64.7,-48.9,50.2,-58.8,33.4C-68.7,16.6,-75.1,-2.5,-70.3,-18.3C-65.5,-34.1,-49.6,-46.6,-33.9,-55C-18.2,-63.4,-2.7,-67.7,12.3,-63.9C27.3,-60.1,54.6,-48.2,49.3,-59.7Z"></path>
          </svg>
        </div>

        <div className="absolute -right-20 bottom-1/4 z-0 opacity-20">
          <svg width="250" height="250" viewBox="0 0 200 200" className="text-[#FF8BA7]">
            <path fill="currentColor" d="M40,-57C53.7,-49.1,68.2,-41.3,73.8,-29.1C79.4,-16.8,76.2,-0.1,70.9,13.9C65.6,27.9,58.3,39.3,47.3,49.5C36.3,59.7,21.7,68.8,5.4,72.4C-10.8,76,-27.7,74.1,-39.9,65.3C-52.1,56.5,-59.6,40.8,-65.1,25.2C-70.6,9.6,-74.1,-5.9,-68.3,-17.9C-62.5,-29.9,-47.4,-38.4,-34.1,-46.5C-20.8,-54.6,-9.4,-62.3,2.3,-65.8C13.9,-69.3,27.9,-68.6,40,-57Z"></path>
          </svg>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-2 h-2 rounded-full bg-[#97BE5A] mr-1"></div>
              <div className="w-2 h-2 rounded-full bg-[#FF8BA7] mr-1"></div>
              <div className="w-2 h-2 rounded-full bg-[#97BE5A]"></div>
            </div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Who We <span className="text-[#97BE5A]">Are</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Discover our story, values, and the passion that drives us to create exceptional experiences.
            </motion.p>
          </motion.div>

          {/* حاوية الفيديو المعدلة */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
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
                ? "https://www.youtube.com/embed/iyy7xu1MjMA?autoplay=1&mute=1" 
                : "https://www.youtube.com/embed/iyy7xu1MjMA"
              }
              title="Our Story Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center text-gray-900 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our World
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Activity 1 */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-[#97BE5A] text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">
              We constantly research and develop new technologies to stay ahead of industry trends.
            </p>
          </motion.div>
          
          {/* Activity 2 */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-[#97BE5A] text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-600">
              We actively participate in local communities and support various charitable initiatives.
            </p>
          </motion.div>
          
          {/* Activity 3 */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-[#97BE5A] text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p className="text-gray-600">
              Environmental responsibility is at the core of all our business activities and decisions.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default CreativeSection;