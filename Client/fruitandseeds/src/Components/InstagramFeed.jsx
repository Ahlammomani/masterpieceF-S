// src/components/InstagramFeed.js

import React, { useEffect } from 'react';

const InstagramFeed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="instagram-feed py-10 text-center bg-white">
      {/* <h2 className="text-2xl font-bold mb-4">تابعونا على إنستغرام</h2> */}
      <div className="flex justify-center">
        <iframe
          src="//lightwidget.com/widgets/83aa783c2bfe59cc9cc4956c95c0f5db.html"
          className="lightwidget-widget w-full max-w-5xl h-[400px]"
          scrolling="no"
          allowTransparency="true"
          style={{
            border: '0',
            overflow: 'hidden',
          }}
          title="Instagram Feed"
        ></iframe>
      </div>
    </section>
  );
};

export default InstagramFeed;
