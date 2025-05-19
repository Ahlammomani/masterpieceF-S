import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const OverviewPage = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    revenue: 0,
    lastUpdated: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Check cache first
        const cachedStats = localStorage.getItem('dashboardStats');
        if (cachedStats) {
          const parsedStats = JSON.parse(cachedStats);
          // Refresh if data is older than 5 minutes
          if (Date.now() - parsedStats.lastUpdated < 300000) {
            setStats(parsedStats);
            setLoading(false);
            return;
          }
        }

        const response = await axios.get('http://localhost:5000/api/overview/stats');
        const newStats = {
          users: response.data.users || 0,
          orders: response.data.orders || 0,
          products: response.data.products || 0,
          revenue: response.data.revenue || 0,
          lastUpdated: Date.now()
        };
        
        setStats(newStats);
        localStorage.setItem('dashboardStats', JSON.stringify(newStats));
        
      } catch (err) {
        console.error('Failed to load stats:', err);
        setError('Failed to load dashboard data. Using cached data if available.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Refresh every 5 minutes
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  // Chart data
  const chartData = [
    { name: 'Users', value: stats.users },
    { name: 'Orders', value: stats.orders },
    { name: 'Products', value: stats.products },
  ];

  if (loading && !stats.lastUpdated) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FDFAF6]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#97BE5A]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFAF6] p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#97BE5A]">Dashboard Overview</h1>
        {stats.lastUpdated && (
          <span className="text-sm text-[#97BE5A]">
            Last updated: {new Date(stats.lastUpdated).toLocaleTimeString()}
          </span>
        )}
      </div>
      
      {error && (
        <div className="bg-[#FF8BA7] bg-opacity-20 text-[#99BC85] p-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats.users.toLocaleString()} 
          trend="↑ 12%"
          color="bg-[#99BC85]"
        />
        <StatCard 
          title="Total Orders" 
          value={stats.orders.toLocaleString()} 
          trend="↑ 5%"
          color="bg-[#97BE5A]"
        />
        <StatCard 
          title="Products" 
          value={stats.products.toLocaleString()} 
          trend="→"
          color="bg-[#99BC85]"
        />
        <StatCard 
          title="Revenue" 
          value={`$${stats.revenue.toLocaleString()}`} 
          trend="↑ 18%"
          color="bg-[#97BE5A]"
        />
      </div>
      
      {/* Chart Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#FDFAF6]">
        <h2 className="text-xl font-semibold text-[#99BC85] mb-4">Performance Summary</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#99BC85' }} />
              <YAxis tick={{ fill: '#99BC85' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FDFAF6',
                  borderColor: '#FF8BA7',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#FF8BA7" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Enhanced Stat Card Component
const StatCard = ({ title, value, trend, color }) => (
  <div className={`${color} bg-opacity-20 rounded-lg p-5 shadow-sm transition-all hover:shadow-md`}>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm font-medium text-[#99BC85] mb-1">{title}</h3>
        <p className="text-2xl font-bold text-[#97BE5A]">{value}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${
        trend.includes('↑') ? 'bg-green-100 text-green-800' :
        trend.includes('↓') ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {trend}
      </span>
    </div>
  </div>
);

export default OverviewPage;