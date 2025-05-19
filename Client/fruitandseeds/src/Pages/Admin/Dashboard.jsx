import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Overview from "./overview";
import Products from "./Products";
import Users from "./Users";
import Orders from "./Orders";
import Categories from "./Categories";
import Contact from './Contact';

function Dashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      {/* Sidebar is already positioned fixed in its component */}
      <Sidebar />
      
      {/* Main content area - responsive padding */}
      <div className={`flex-1 min-h-screen ${isMobile ? 'w-full' : 'ml-64'} transition-all duration-300`}>
        <div >
          <Routes>
            <Route path="overview" element={<Overview />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="categories" element={<Categories />} />
            <Route path="contact" element={<Contact />} />
            <Route index element={<DashboardHome />} /> 
          </Routes>
        </div>
      </div>
    </div>
  );
}

const DashboardHome = () => {
  return (
    <div>
      <Overview/>
    </div>
  );
};

export default Dashboard;