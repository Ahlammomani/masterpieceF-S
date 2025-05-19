import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBox, FaUsers, FaShoppingCart, FaTags, FaChartBar, FaSignOutAlt, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("Overview");
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // Set active menu based on current path
  useEffect(() => {
    const path = location.pathname;
    // Find which menu item matches the current path
    const currentMenu = menuItems.find(item => 
      path.includes(item.path.split('/').pop())
    );
    if (currentMenu) {
      setActive(currentMenu.name);
    } else {
      setActive("Overview"); // Default
    }
  }, [location]);

  // Track window size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto-show sidebar on desktop
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    // Set initial state based on screen size
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    { name: "Overview", label: "Overview", icon: FaChartBar, path: "/admin/overview" },
    { name: "Products", label: "Manage Products", icon: FaBox, path: "/admin/products" },
    { name: "Users", label: "Manage Users", icon: FaUsers, path: "/admin/users" },
    { name: "Orders", label: "Manage Orders", icon: FaShoppingCart, path: "/admin/orders" },
    { name: "Categories", label: "Manage Categories", icon: FaTags, path: "/admin/categories" },
    { name: "Contact", label: "Manage Contact message", icon: FaEnvelope, path: "/admin/contact" },
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

  // Render hamburger menu for mobile
  const renderMobileToggle = () => {
    return (
      <button 
        className="lg:hidden fixed z-50 top-4 left-4 bg-[#97BE5A] text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    );
  };

  const handleMenuClick = (itemName, itemPath) => {
    setActive(itemName);
    navigate(itemPath);
    // Close sidebar automatically on mobile after navigation
    if (windowWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {renderMobileToggle()}
      
      {/* Backdrop for mobile */}
      {isOpen && windowWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-opacity-30 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
          fixed top-0 left-0 z-40
          w-64 h-screen overflow-y-auto bg-[#FDFAF6] text-gray-800 
          flex flex-col p-4 shadow-md transition-transform duration-300 ease-in-out
        `}
        dir="ltr"
      >
        <div className="mb-6 flex flex-col items-center border-b border-[#97BE5A] pb-4 pt-2">
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
                  onClick={() => handleMenuClick(item.name, item.path)}
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
    </>
  );
};

export default Sidebar;