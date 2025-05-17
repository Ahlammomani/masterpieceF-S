import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserEdit, FaPhone, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isFocused, setIsFocused] = useState({
    phone: false,
    password: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data.user);
        setPhoneNumber(res.data.user.phoneNumber || "");
      } catch {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put("/users/profile", { phoneNumber, password });
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setPassword("");
    } catch (err) {
      setMessage({ text: "Error updating profile", type: "error" });
    }
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {user ? (
        <div className="w-full max-w-lg">
          {/* Profile Header */}
          <div className="bg-[#99BC85] text-white rounded-t-xl p-6 text-center shadow-lg">
            <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center mb-4 border-4 border-[#FF8BA7]">
              <FaUserEdit className="text-[#99BC85] text-3xl" />
            </div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name || user.email.split('@')[0]}</h2>
            <p className="text-white opacity-90">Update your personal information here</p>
          </div>

          {/* Profile Form */}
          <div className="bg-[#FDFAF6] rounded-b-xl shadow-lg p-6">
            <form onSubmit={handleUpdate} className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#97BE5A]">
                  <MdEmail className="text-xl" />
                </div>
                <input
                  type="text"
                  value={user.email}
                  disabled
                  className="w-full border-b-2 border-[#99BC85]/30 py-3 pl-10 text-gray-700 bg-gray-100 rounded-t"
                />
                {/* <label className="absolute left-10 top-3 text-gray-500">
                  Email Address
                </label> */}
              </div>

              {/* Phone Number Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#97BE5A]">
                  <FaPhone className="text-lg" />
                </div>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  className="w-full border-b-2 border-[#99BC85]/30 focus:border-[#97BE5A] py-3 pl-10 text-gray-700 bg-transparent outline-none transition-all"
                />
                <label className={`absolute left-10 transition-all duration-200 ${(isFocused.phone || phoneNumber) ? "text-xs -top-2 text-[#97BE5A]" : "top-3 text-gray-500"}`}>
                  Phone Number
                </label>
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#97BE5A]">
                  <FaLock className="text-lg" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  className="w-full border-b-2 border-[#99BC85]/30 focus:border-[#97BE5A] py-3 pl-10 text-gray-700 bg-transparent outline-none transition-all"
                />
                <label className={`absolute left-10 transition-all duration-200 ${(isFocused.password || password) ? "text-xs -top-2 text-[#97BE5A]" : "top-3 text-gray-500"}`}>
                  New Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FF8BA7] hover:text-[#e67a92]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Message Alert */}
              {message.text && (
                <div className={`p-3 rounded-lg ${message.type === "success" ? "bg-[#99BC85]/20 text-[#2C5F2D]" : "bg-[#FF8BA7]/20 text-[#cc3d6a]"}`}>
                  {message.text}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#97BE5A] to-[#99BC85] text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaUserEdit />
                <span>Update Profile</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#99BC85]"></div>
          <p className="mt-4 text-[#2C5F2D]">Loading your profile...</p>
        </div>
      )}
    </div>
  );
};

export default Profile;