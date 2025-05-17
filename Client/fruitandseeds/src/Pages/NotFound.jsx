import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-white text-white px-4"
    >
      <motion.h1 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-9xl font-extrabold text-red-600 tracking-widest mb-4"
      >
        404
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        className="text-2xl mt-4 mb-6 text-black"
      >
        Page Not Found
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6 } }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-red-600 text-black font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300"
        >
          Go Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;