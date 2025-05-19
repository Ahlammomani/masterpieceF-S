import { useState } from 'react';
import back from '../assets/back.png';

export default function VideoLesson() {
  const [videoActivated, setVideoActivated] = useState(false);
  const videoId = "OaliHe5nKo0";

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* 3D Background Pattern */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -left-10 w-64 h-64 opacity-20">
          <img src={back} alt="background pattern" className="w-full h-full object-contain rotate-45" />
        </div>
        <div className="absolute -bottom-20 -right-10 w-64 h-64 opacity-20">
          <img src={back} alt="background pattern" className="w-full h-full object-contain -rotate-45" />
        </div>
        <div className="absolute top-1/4 -right-10 w-48 h-48 opacity-15">
          <img src={back} alt="background pattern" className="w-full h-full object-contain rotate-12" />
        </div>
        <div className="absolute bottom-1/4 -left-10 w-48 h-48 opacity-15">
          <img src={back} alt="background pattern" className="w-full h-full object-contain -rotate-12" />
        </div>
        <div className="absolute top-0 right-1/5 w-42 h-42 opacity-10">
          <img src={back} alt="background pattern" className="w-full h-full object-contain rotate-30" />
        </div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 opacity-10">
          <img src={back} alt="background pattern" className="w-full h-full object-contain -rotate-30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl relative z-10">
        {/* Top Text Section */}
        <div className="text-center mb-8">
          <h2 className="text-5xl text-[#FF8BA7] font-bold mb-2">Quick & Healthy Desserts for Kids</h2>
           <p className="text-3xl text-[#FF8BA7] italic">from fruit & seeds....</p>
          <p className="text-3xl text-[#FF8BA7] italic">Tastes They'll Love, and Moms Can Trust!</p>
        </div>
        
        {/* Video Card Container */}
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
          {/* Video Player */}
          <div className="relative aspect-video">
            {!videoActivated ? (
              <>
                {/* Thumbnail with play overlay */}
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => setVideoActivated(true)}
                >
                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}