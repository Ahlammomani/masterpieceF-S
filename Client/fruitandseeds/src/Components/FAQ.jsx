import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Using direct image URLs from the web
  const faqItems = [
    {
      question: "How can I create a new account?",
      answer: "You can create a new account by going to the registration page and filling out the required information.",
      image: "https://i.pinimg.com/736x/a0/ba/29/a0ba294c6671a48c3dd8abf7fb81077f.jpg"
    },
    {
      question: "What payment methods are available?",
      answer: "We accept payments via credit cards, PayPal, and cash on delivery.",
      image: "https://i.pinimg.com/736x/9d/96/ec/9d96ec19171723697179c4b2d086ecdc.jpg"
    },
    {
      question: "How can I return a product?",
      answer: "You can return the product within 14 days of receipt by contacting customer service.",
      image: "https://i.pinimg.com/736x/32/63/6d/32636de783d184f1ebe14e5f2b249f54.jpg"
    }
  ];

  // Color scheme from the requirements
  const colors = {
    primary: "#97BE5A",
    secondary: "#99BC85",
    background: "#FDFAF6",
    accent: "#FF8BA7"
  };

  return (
    <div className="w-full bg-[#FDFAF6] p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#97BE5A]">Frequently Asked Questions</h2>
      
      <div className="flex flex-wrap justify-center gap-6">
        {faqItems.map((item, index) => (
          <div key={index} className="w-full md:w-64 mb-6">
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full p-4 text-left rounded-t-lg font-medium transition-all duration-300 ${
                activeIndex === index 
                  ? "bg-[#97BE5A] text-white" 
                  : "bg-[#99BC85] text-white hover:bg-opacity-90"
              }`}
            >
              {item.question}
            </button>

            {activeIndex === index && (
              <div className="relative">
                <img 
                  src={item.image} 
                  alt="FAQ illustration" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <p className="text-white text-center">{item.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;