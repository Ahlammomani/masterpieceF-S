import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", phoneNumber: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/users/signup", user);
      setCookie('user', response.data.user, { path: '/' });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred!");
    }
  };

  const handleFacebookSignup = () => {
    window.location.href = `${API.defaults.baseURL}/auth/facebook`;
  };

  const handleGoogleLogin = async (response) => {
    if (response.error) {
      setError("Google Sign-In failed");
      return;
    }

    try {
      const res = await API.post("/auth/google", { credential: response.credential });
      setCookie('user', res.data.user, { path: '/' });
      navigate("/");
    } catch (error) {
      setError("Google login failed. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFAF6] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E7CCCC] rounded-bl-full opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-72 bg-[#C1CFA1] rounded-tr-full opacity-40"></div>
      <div className="absolute top-1/2 left-0 w-32 h-64 bg-[#97BE5A] rounded-r-full opacity-30 transform -translate-y-1/2"></div>
      <div className="absolute top-20 left-1/4 w-12 h-12 rounded-full bg-[#C1CFA1] opacity-20"></div>
      <div className="absolute bottom-20 right-1/4 w-16 h-16 rounded-full bg-[#E7CCCC] opacity-30"></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 rounded-full bg-[#97BE5A] opacity-20"></div>

      <div className="relative z-10 max-w-md w-full p-8 bg-white rounded-2xl shadow-2xl">
        <div className="mb-8 relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#97BE5A] rounded-full opacity-20"></div>
          <h2 className="text-3xl font-bold text-[#97BE5A] relative z-10">Create Account</h2>
          <p className="text-gray-600 mt-2">Join our community today</p>
          <div className="h-1 w-20 bg-[#C1CFA1] mt-4 rounded-full"></div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#E7CCCC] bg-opacity-30 border-l-4 border-red-500 rounded">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              className="w-full p-3 bg-[#FDFAF6] bg-opacity-30 border border-[#E7CCCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] transition"
              type="text"
              placeholder="Enter your first name"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              className="w-full p-3 bg-[#FDFAF6] bg-opacity-30 border border-[#E7CCCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] transition"
              type="text"
              placeholder="Enter your last name"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              className="w-full p-3 bg-[#FDFAF6] bg-opacity-30 border border-[#E7CCCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] transition"
              type="text"
              placeholder="Enter your phone number"
              onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              className="w-full p-3 bg-[#FDFAF6] bg-opacity-30 border border-[#E7CCCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] transition"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              className="w-full p-3 bg-[#FDFAF6] bg-opacity-30 border border-[#E7CCCC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] transition"
              type="password"
              placeholder="Create a password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full p-3 bg-[#97BE5A] text-white font-medium rounded-lg shadow-lg hover:bg-[#C1CFA1] transform hover:-translate-y-1 transition-all duration-300"
            >
              Sign Up
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
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError("Google login failed")}
              useOneTap
            />

            <button
              type="button"
              onClick={handleFacebookSignup}
              className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <svg className="h-5 w-5 text-[#97BE5A]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="ml-1 text-[#97BE5A] hover:underline">
              Sign In
            </a>
          </div>
        </form>

        <div className="absolute -bottom-4 right-12 w-32 h-8 bg-[#C1CFA1] rounded-t-full opacity-50"></div>
      </div>
    </div>
  );
};

export default Signup;
