import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import heroBg from '../assets/contactus.jpeg';
import { FaMapMarkerAlt, FaClock, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // الألوان المعدلة
  const colors = {
    primary: "#97BE5A",
    secondary: "#99BC85",
    accent: "#FF8BA7",
    background: "#FFFFFF",
    card: "#FDFAF6",
    dark: "#333333",
    light: "#F8F9FA"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('https://your-api-endpoint.com/contact', formData);
      
      if(response.data.success) {
        setSubmitMessage('Your message has been sent successfully! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      setSubmitMessage('An error occurred while sending the message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // تأثيرات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  return (
    <div className="min-h-screen bg-gray-50 " style={{ backgroundColor: colors.background }}>
      {/* Hero Section */}
      <motion.div 
        className="relative h-96 flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundImage: ` url(${heroBg})`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-center px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* Contact Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div 
              className="p-8 md:p-12"
              style={{ backgroundColor: colors.card }}
              variants={itemVariants}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: colors.secondary }}
                variants={itemVariants}
              >
                Contact Information
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 mb-8"
                variants={itemVariants}
              >
                Have questions or need assistance? Feel free to reach out to us.
              </motion.p>

              <motion.div 
                className="space-y-6"
                variants={containerVariants}
              >
                {/* Address */}
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
                      <FaMapMarkerAlt className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">ADDRESS</h3>
                    <p className="text-gray-700">Rainbow Street, Amman</p>
                    <p className="text-gray-700">Jordan, 11183</p>
                  </div>
                </motion.div>

                {/* Opening Hours */}
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
                      <FaClock className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">OPENING HOURS</h3>
                    <p className="text-gray-700">Monday to Friday: 9am to 5pm</p>
                    <p className="text-gray-700">Saturday: 10am to 2pm</p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
                      <FaEnvelope className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">EMAIL</h3>
                    <p className="text-gray-700">info@example.com</p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
                      <FaPhoneAlt className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">PHONE</h3>
                    <p className="text-gray-700">Call customer service on</p>
                    <p className="text-gray-700">+962 6 400 0000</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Form Section */}
            <motion.div 
              className="p-8 md:p-12 bg-white"
              variants={itemVariants}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: colors.primary }}
                variants={itemVariants}
              >
                Drop us a line
              </motion.h2>
              
              <motion.p 
                className="text-gray-600 mb-8"
                variants={itemVariants}
              >
                Fill out the form below and we'll get back to you soon.
              </motion.p>

              {submitMessage && (
                <motion.div 
                  className={`mb-6 p-4 rounded-lg ${submitMessage.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {submitMessage}
                </motion.div>
              )}

              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                    style={{ 
                      focusRingColor: colors.primary,
                      backgroundColor: colors.light
                    }}
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                    style={{ 
                      focusRingColor: colors.primary,
                      backgroundColor: colors.light
                    }}
                    placeholder="your@email.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                    style={{ 
                      focusRingColor: colors.primary,
                      backgroundColor: colors.light
                    }}
                    placeholder="How can we help you?"
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: colors.dark }}>
            Find Us on Map
          </h3>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108513.77057825261!2d35.82439371954656!3d31.94968252135298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5fb85d7981af%3A0x631c30c0f8dc65e8!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sus!4v1650450766045!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Our location on map"
            ></iframe>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div 
          className="text-center mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-xl md:text-2xl font-medium italic" style={{ color: colors.dark }}>
            "Nurture your mind with great thoughts. To believe in the heroic makes heroes."
          </blockquote>
          <cite className="block mt-4 text-lg" style={{ color: colors.primary }}>— Benjamin Disraeli</cite>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;