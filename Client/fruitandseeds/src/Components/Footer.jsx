import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="relative mt-20">
      {/* الموجة */}
      <div className="absolute -top-16 left-0 w-full h-16 overflow-hidden z-0">
        {/* ... موجات SVG كما هي ... */}
      </div>

      <footer className="bg-[#FDFAF6] text-[#97BE5A]">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            {/* القسم الأيسر (الشعار) */}
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-20" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap">FruitandSeeds</span>
              </Link>
              <p className="mt-4 max-w-md text-sm">
                Your trusted partner in creating beautiful experiences. We're dedicated to quality, innovation, and customer satisfaction.
              </p>
            </div>

            {/* القسم الأيمن (بقية العناصر) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 text-right">
              {/* More Section */}
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase border-b border-[#97BE5A] pb-2">More</h2>
                <ul className="font-medium">
                  <li className="mb-4">
                    <Link to="/about" className="hover:text-[#FF8BA7] flex items-center justify-end">
                      About
                      <span className="bg-[#FDFAF6] p-1 rounded-full ml-2 flex items-center justify-center w-6 h-6">
                        <span className="text-xs">i</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-[#FF8BA7] flex items-center justify-end">
                      Contact Us
                      <span className="bg-[#FDFAF6] p-1 rounded-full ml-2 flex items-center justify-center w-6 h-6">
                        <span className="text-xs">@</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media Section */}
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase border-b border-[#97BE5A] pb-2">Follow Us</h2>
                <ul className="font-medium">
                  <li className="mb-4">
                    <a
                      href="https://www.facebook.com/Fruit.Seeds.Healthy.Bite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FF8BA7] flex items-center justify-end"
                    >
                      Facebook
                      <span className="bg-[#FDFAF6] p-1 rounded-full ml-2 flex items-center justify-center w-6 h-6">
                        <FaFacebookF className="text-xs" />
                      </span>
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://www.instagram.com/fruitandseedsjo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FF8BA7] flex items-center justify-end"
                    >
                      Instagram
                      <span className="bg-[#FDFAF6] p-1 rounded-full ml-2 flex items-center justify-center w-6 h-6">
                        <FaInstagram className="text-xs" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/962000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FF8BA7] flex items-center justify-end"
                    >
                      WhatsApp
                      <span className="bg-[#FDFAF6] p-1 rounded-full ml-2 flex items-center justify-center w-6 h-6">
                        <FaWhatsapp className="text-xs" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal Section */}
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase border-b border-[#97BE5A] pb-2">Legal</h2>
                <ul className="font-medium">
                  <li className="mb-4">
                    <a href="#privacy" className="hover:text-[#FF8BA7] flex items-center justify-end">
                      Privacy Policy
                      <span className="bg-[#FDFAF6] p-1 rounded-full ml-2 flex items-center justify-center w-6 h-6">
                        <span className="text-xs">P</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#terms" className="hover:text-[#FF8BA7] flex items-center justify-end">
                      Terms & Conditions
                      <span className="bg-[#FDFAF6] p-1 rounded-full ml-2 flex items-center justify-center w-6 h-6">
                        <span className="text-xs">T</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-6 border-[#97BE5A] opacity-30 sm:mx-auto" />

          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm sm:text-center">© 2025 FruitandSeeds. All Rights Reserved.</span>
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a
                href="https://www.facebook.com/Fruit.Seeds.Healthy.Bite"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF8BA7] bg-[#FDFAF6] p-2 rounded-full flex items-center justify-center w-8 h-8"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/fruitandseedsjo/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF8BA7] bg-[#FDFAF6] p-2 rounded-full flex items-center justify-center w-8 h-8"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/962777730914"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF8BA7] bg-[#FDFAF6] p-2 rounded-full flex items-center justify-center w-8 h-8"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;