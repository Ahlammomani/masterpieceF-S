import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/users/login", user);
      // Set user cookie after successful login
      setCookie('user', response.data.user, { path: '/' });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFAF6] relative overflow-hidden">
      {/* Decorative Curves */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C1CFA1] rounded-br-full opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-80 h-64 bg-[#E7CCCC] rounded-tl-full opacity-40"></div>
      <div className="absolute top-1/2 right-0 w-32 h-64 bg-[#97BE5A] rounded-l-full opacity-30 transform -translate-y-1/2"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/3 w-10 h-10 rounded-full bg-[#C1CFA1] opacity-20"></div>
      <div className="absolute bottom-1/4 left-1/4 w-14 h-14 rounded-full bg-[#E7CCCC] opacity-30"></div>
      <div className="absolute top-2/3 left-20 w-8 h-8 rounded-full bg-[#97BE5A] opacity-20"></div>
      
      {/* Form Container */}
      <div className="relative z-10 max-w-md w-full p-8 bg-white rounded-2xl shadow-2xl">
        {/* Form Header with Accent */}
        <div className="mb-8 relative">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#E7CCCC] rounded-full opacity-20"></div>
          <h2 className="text-3xl font-bold text-[#97BE5A] relative z-10">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
          <div className="h-1 w-20 bg-[#C1CFA1] mt-4 rounded-full"></div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-[#E7CCCC] bg-opacity-30 border-l-4 border-red-500 rounded">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {/* Form Fields */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <input 
                className="w-full p-3 pl-10 bg-[#FDFAF6] bg-opacity-30 border border-[#E7CCCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] transition" 
                type="email" 
                placeholder="Enter your email" 
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="/forgot-password" className="text-xs text-[#97BE5A] hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <input 
                className="w-full p-3 pl-10 bg-[#FDFAF6] bg-opacity-30 border border-[#E7CCCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] transition" 
                type="password" 
                placeholder="Enter your password" 
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full p-3 bg-[#97BE5A] text-white font-medium rounded-lg shadow-lg hover:bg-[#C1CFA1] transform hover:-translate-y-1 transition-all duration-300"
            >
              Sign In
            </button>
          </div>
          
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg className="h-5 w-5 text-[#97BE5A]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h4.92c-.2 1.28-1.52 3.76-4.92 3.76-2.96 0-5.36-2.44-5.36-5.44s2.4-5.44 5.36-5.44c1.68 0 2.8.72 3.44 1.36l2.36-2.28c-1.52-1.4-3.48-2.24-5.8-2.24-4.8 0-8.68 3.88-8.68 8.64s3.88 8.64 8.68 8.64c5 0 8.32-3.52 8.32-8.48 0-.56-.08-1-.16-1.44h-8.16z" />
              </svg>
            </button>
            <button type="button" className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <svg className="h-5 w-5 text-[#97BE5A]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? 
            <a href="/signup" className="ml-1 text-[#97BE5A] hover:underline">
              Sign Up
            </a>
          </div>
        </form>
        
        {/* Decorative Bottom Element */}
        <div className="absolute -bottom-4 left-12 w-32 h-8 bg-[#97BE5A] rounded-t-full opacity-50"></div>
      </div>
    </div>
  );
};

export default Login;