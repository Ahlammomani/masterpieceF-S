
import { useState } from 'react';

export default function FAQ() {
  const [activePopup, setActivePopup] = useState(null);
  
  // Colors from the request
  const colors = {
    green: "#99BC85",
    lightGreen: "#97BE5A",
    pink: "#FF8BA7",
    cream: "#FDFAF6"
  };

  // FAQ data
  const faqItems = [
    {
      question: "Do I need to choose a delivery date?",
      answer: "Yes, it’s important to select a delivery date when placing your order to confirm your reservation.",
      color: colors.green
    },
    {
      question: "Do I need to select the product I want?",
      answer: "Absolutely! Please make sure to choose the product or box you’d like before proceeding.",
      color: colors.pink
    },
    {
      question: "When should I place my order?",
      answer: "Kindly place your order at least two days before the delivery date to ensure everything is ready on time.",
      color: colors.lightGreen
    }
  ];

  // Open a popup
  const openPopup = (index) => {
    setActivePopup(index);
    // Add body class to prevent scrolling when popup is open
    document.body.style.overflow = 'hidden';
  };

  // Close the popup
  const closePopup = () => {
    setActivePopup(null);
    // Remove body class to re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="w-full h-100 bg-cream p-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.lightGreen }}>
          How to Order from Us – Simple & Easy Steps
        </h2>
        
        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => openPopup(index)}
            >
              <div 
                className="h-40 flex items-center justify-center p-6"
                style={{ backgroundColor: item.color }}
              >
                <h3 className="text-xl font-medium text-white text-center">{item.question}</h3>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {activePopup !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-green bg-opacity-50"
            onClick={closePopup}
          ></div>
          
          {/* Modal Content - circular shape with dynamic background color */}
          <div 
            className="relative rounded-full shadow-xl overflow-hidden flex items-center justify-center  " 
            
            style={{ 
              width: '500px', 
              height: '500px',
              backgroundColor: faqItems[activePopup].color
            }}
          >
            <div className="w-4/5 p-6 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-6 text-white">
                {faqItems[activePopup].question}
              </h3>
              <p className="text-white text-lg mb-8">
                {faqItems[activePopup].answer}
              </p>
              <div>
                <button 
                  className="px-6 py-2 rounded-full bg-white font-medium"
                  style={{ color: faqItems[activePopup].color }}
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}