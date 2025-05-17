// src/components/InstagramProfile.js

import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import logo from '../assets/logo.png';

const InstagramProfile = () => {
  return (
    <section className="py-10 bg-white text-center">
      <h2 className="text-3xl font-serif font-semibold mb-6 text-gray-800">Our Sweetest Moments</h2>

      <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-6">
        {/* Profile Image */}
        <a
          href="https://www.instagram.com/fruitandseedsjo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logo} // استبدليه بشعاركم إذا توفر
            alt="Fruit & Seeds Logo"
            className="w-16 h-16 rounded-full border"
          />
        </a>

        {/* Profile Info */}
        <div className="text-center md:text-left">
          <a
            href="https://www.instagram.com/fruitandseedsjo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold text-black hover:underline"
          >
            Fruit &amp; Seeds | Healthy Desserts
          </a>
          <p className="text-gray-500">@fruitandseedsjo</p>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <div>
            <span className="block font-bold text-lg">33</span>
            <span className="text-sm text-gray-500">Posts</span>
          </div>
          <div>
            <span className="block font-bold text-lg">2,854K</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
          <div>
            <span className="block font-bold text-lg">10</span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </div>

        {/* Follow Button */}
        <a
          href="https://www.instagram.com/fruitandseedsjo/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all"
        >
          <FaInstagram />
          Follow
        </a>
      </div>
    </section>
  );
};

export default InstagramProfile;
