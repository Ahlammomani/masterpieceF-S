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
      answer: "Yes, it's important to select a delivery date when placing your order to confirm your reservation.",
      color: colors.green
    },
    {
      question: "Do I need to select the product I want?",
      answer: "Absolutely! Please make sure to choose the product or box you'd like before proceeding.",
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

  // Navigate to previous FAQ
  const goToPrevious = (e) => {
    e.stopPropagation(); // Prevent the click from closing the modal
    const prevIndex = activePopup - 1 < 0 ? faqItems.length - 1 : activePopup - 1;
    setActivePopup(prevIndex);
  };

  // Navigate to next FAQ
  const goToNext = (e) => {
    e.stopPropagation(); // Prevent the click from closing the modal
    const nextIndex = (activePopup + 1) % faqItems.length;
    setActivePopup(nextIndex);
  };
  
  return (
    <div className="w-full py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12" style={{ color: colors.lightGreen }}>
          How to Order from Us – Simple & Easy Steps
        </h2>
       
        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => openPopup(index)}
            >
              <div
                className="h-32 md:h-40 flex items-center justify-center p-4 md:p-6"
                style={{ backgroundColor: item.color }}
              >
                <h3 className="text-lg md:text-xl font-medium text-white text-center">{item.question}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Popup Modal */}
      {activePopup !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Overlay */}
          <div
            className="absolute inset-0  bg-opacity-50 backdrop-blur-md"
            onClick={closePopup}
          ></div>
         
          {/* Modal Content */}
          <div
            className="relative rounded-full shadow-xl overflow-hidden flex items-center justify-center"
            style={{
              width: '90vw',
              maxWidth: '500px',
              height: '90vw',
              maxHeight: '500px',
              backgroundColor: faqItems[activePopup].color
            }}
          >
            {/* Left arrow */}
            {/* <button 
              onClick={goToPrevious}
              className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-lg z-10 transition-transform hover:scale-110"
              aria-label="Previous FAQ"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: faqItems[activePopup].color }}>
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button> */}

            {/* Right arrow */}
            {/* <button 
              onClick={goToNext}
              className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-lg z-10 transition-transform hover:scale-110"
              aria-label="Next FAQ"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: faqItems[activePopup].color }}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button> */}

            <div className="w-4/5 p-4 md:p-6 flex flex-col items-center text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">
                {faqItems[activePopup].question}
              </h3>
              <p className="text-white text-base md:text-lg mb-6 md:mb-8">
                {faqItems[activePopup].answer}
              </p>
              <div>
                <button
                  className="px-5 py-2 rounded-full bg-white font-medium"
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