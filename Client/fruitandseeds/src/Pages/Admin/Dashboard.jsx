import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Overview from "./overview";
import Products from "./Products";
import Users from "./Users";
import Orders from "./Orders";
import Categories from "./Categories";

function Dashboard() {
  return (
   
   <>

        
<div className="flex h-screen w-full overflow-hidden">
      
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
              
              <div className="flex-1 p-6 bg-[#F8F8F8] min-h-screen">
                <Routes>
                  <Route path="overview" element={<Overview />} />
                  <Route path="products" element={<Products />} />
                  <Route path="users" element={<Users />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="categories" element={<Categories />} />
                  <Route index element={<DashboardHome />} /> 
                </Routes>
              </div>
            
         </div>
    
        </>
  );
};
const DashboardHome = () => {
  return (
    <div>
    <Overview/>
    </div>
  );
};

export default Dashboard;
