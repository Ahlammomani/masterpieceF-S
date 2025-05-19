import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Signup = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", phoneNumber: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    try {
      const response = await API.post("/users/signup", user, { withCredentials: true });
      navigate('/');
    } catch (err) {
  console.log("Signup Error:", err.response?.data);

  const serverErrors = err.response?.data;

  if (Array.isArray(serverErrors?.errors)) {
    // إذا كان في أخطاء مفصلة من Joi
    const errors = {};
    serverErrors.errors.forEach(msg => {
      if (msg.toLowerCase().includes("first")) errors.firstName = msg;
      else if (msg.toLowerCase().includes("last")) errors.lastName = msg;
      else if (msg.toLowerCase().includes("email")) errors.email = msg;
      else if (msg.toLowerCase().includes("password")) errors.password = msg;
      else if (msg.toLowerCase().includes("phone")) errors.phoneNumber = msg;
    });
    setFieldErrors(errors);
  } else {
    // غير هيك، اعرض أي مسج عامة إن وجدت
    setError(serverErrors?.message || "An error occurred!");
  }
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
          {[
            { label: "First Name", key: "firstName", type: "text", placeholder: "Enter your first name" },
            { label: "Last Name", key: "lastName", type: "text", placeholder: "Enter your last name" },
            { label: "Phone Number", key: "phoneNumber", type: "text", placeholder: "Enter your phone number" },
            { label: "Email Address", key: "email", type: "email", placeholder: "Enter your email" },
            { label: "Password", key: "password", type: "password", placeholder: "Create a password" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                className={`w-full p-3 bg-[#FDFAF6] bg-opacity-30 border ${fieldErrors[key] ? 'border-red-400' : 'border-[#E7CCCC]'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] transition`}
                type={type}
                placeholder={placeholder}
                onChange={(e) => setUser({ ...user, [key]: e.target.value })}
              />
              {fieldErrors[key] && (
                <p className="text-sm text-red-500">{fieldErrors[key]}</p>
              )}
            </div>
          ))}

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

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="ml-1 text-[#97BE5A] hover:underline">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
