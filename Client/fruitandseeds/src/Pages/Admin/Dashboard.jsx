import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Overview from "./overview";
import Products from "./Products";
import Users from "./Users";
import Orders from "./Orders";
import Categories from "./Categories";
import Contact from './Contact';

function Dashboard() {
  return (
   
   <>

        
<div className="flex min-h-screen overflow-y-auto">
      
      <div className="flex">
        <Sidebar />
      </div>
              
              <div className="flex-1 bg-[#F8F8F8] min-h-screen ml-64 overflow-y-auto">
                <Routes>
                  <Route path="overview" element={<Overview />} />
                  <Route path="products" element={<Products />} />
                  <Route path="users" element={<Users />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="categories" element={<Categories />} />
                  <Route index element={<DashboardHome />} /> 
                  <Route path='contact' element={<Contact/>}/>
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
