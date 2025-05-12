import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data.user);
        setphoneNumber(res.data.user.phoneNumber || "");
      } catch {
        navigate("/login");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put("/users/profile", { phoneNumber, password });
      setMessage("تم تحديث البيانات بنجاح");
      setPassword(""); // clear after update
    } catch (err) {
      setMessage("حدث خطأ أثناء التحديث");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {user ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">مرحبًا، {user.email}</h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">البريد الإلكتروني</label>
              <input
                type="text"
                value={user.email}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">رقم الهاتف</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">كلمة المرور الجديدة</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2 pr-10"
                  placeholder="أدخل كلمة مرور جديدة إن أردت"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {message && (
              <p className="text-sm text-center text-green-600">{message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              تعديل المعلومات
            </button>
          </form>
        </div>
      ) : (
        <p>جار التحميل...</p>
      )}
    </div>
  );
};

export default Profile;
