import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaUsers, FaShoppingCart, FaTags, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const [active, setActive] = useState("Overview");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Overview", label: "Overview", icon: FaChartBar, path: "/admin/overview" },
    { name: "Products", label: "Manage Products", icon: FaBox, path: "/admin/products" },
    { name: "Users", label: "Manage Users", icon: FaUsers, path: "/admin/users" },
    { name: "Orders", label: "Manage Orders", icon: FaShoppingCart, path: "/admin/orders" },
    { name: "Categories", label: "Manage Categories", icon: FaTags, path: "/admin/categories" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/auth";
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="w-64 h-screen bg-[#FDFAF6] text-gray-800 flex flex-col p-4 shadow-md" dir="ltr">
      <div className="mb-6 flex flex-col items-center border-b border-[#97BE5A] pb-4">
        <span className="text-2xl font-bold text-[#97BE5A]">Fruit & Seeds</span>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 border-l-4 ${
                  active === item.name
                    ? "bg-white text-[#97BE5A] border-l-[#FF8BA7] shadow"
                    : "border-l-transparent hover:bg-[#FFF] hover:text-[#99BC85] hover:shadow"
                }`}
                onClick={() => {
                  setActive(item.name);
                  navigate(item.path);
                }}
              >
                <item.icon className={`w-5 h-5 ${active === item.name ? "text-[#97BE5A]" : "text-gray-600"}`} />
                <span className="flex-1">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-[#97BE5A]">
        <div className="flex items-center gap-3 p-3">
          <FaSignOutAlt className="text-gray-600 w-5 h-5" />
          <button
            onClick={handleLogout}
            className="bg-[#FF8BA7] hover:bg-[#f76b8a] text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;