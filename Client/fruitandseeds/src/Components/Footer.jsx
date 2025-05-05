import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="relative mt-20"> {/* Increased margin-top to make space for the wave */}
    {/* الموجة الخارجية (تخرج من الفوتر) */}
    <div className="absolute -top-16 left-0 w-full h-16 overflow-hidden z-0">
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="w-full h-full"
        style={{ transform: 'rotate(180deg)' }} // قلب الموجة لتصبح للأعلى
      >
        <path 
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
          opacity=".25" 
          style={{ fill: '#97BE5A' }}
        ></path>
        <path 
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
          opacity=".5" 
          style={{ fill: '#97BE5A' }}
        ></path>
        <path 
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
          style={{ fill: '#97BE5A' }}
        ></path>
      </svg>
    </div>

      {/* Footer Content (بدون تغيير) */}
      <footer className="bg-[#FDFAF6] text-[#97BE5A]">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src={logo} className="h-20" alt="Logo" />
                </Link>
                <span className="self-center text-2xl font-semibold whitespace-nowrap">FruitandSeeds</span>
              </a>
              <p className="mt-4 max-w-md text-sm">
                Your trusted partner in creating beautiful experiences. We're dedicated to quality, innovation, and customer satisfaction.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase border-b border-[#97BE5A] pb-2">More</h2>
                <ul className="font-medium">
                  <li className="mb-4">
                    <a href="#about" className="hover:text-[#FF8BA7] flex items-center">
                      <span className="bg-[#FDFAF6] p-1 rounded-full mr-2 flex items-center justify-center w-6 h-6">
                        <span className="text-xs">i</span>
                      </span>
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-[#FF8BA7] flex items-center">
                      <span className="bg-[#FDFAF6] p-1 rounded-full mr-2 flex items-center justify-center w-6 h-6">
                        <span className="text-xs">@</span>
                      </span>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase border-b border-[#97BE5A] pb-2">Follow Us</h2>
                <ul className="font-medium">
                  <li className="mb-4">
                    <a href="#facebook" className="hover:text-[#FF8BA7] flex items-center">
                      <span className="bg-[#FDFAF6] p-1 rounded-full mr-2 flex items-center justify-center w-6 h-6">
                        <FaFacebookF className="text-xs" />
                      </span>
                      Facebook
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#instagram" className="hover:text-[#FF8BA7] flex items-center">
                      <span className="bg-[#FDFAF6] p-1 rounded-full mr-2 flex items-center justify-center w-6 h-6">
                        <FaInstagram className="text-xs" />
                      </span>
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#whatsapp" className="hover:text-[#FF8BA7] flex items-center">
                      <span className="bg-[#FDFAF6] p-1 rounded-full mr-2 flex items-center justify-center w-6 h-6">
                        <FaWhatsapp className="text-xs" />
                      </span>
                      WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase border-b border-[#97BE5A] pb-2">Legal</h2>
                <ul className="font-medium">
                  <li className="mb-4">
                    <a href="#privacy" className="hover:text-[#FF8BA7] flex items-center">
                      <span className="bg-[#FDFAF6] p-1 rounded-full mr-2 flex items-center justify-center w-6 h-6">
                        <span className="text-xs">P</span>
                      </span>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#terms" className="hover:text-[#FF8BA7] flex items-center">
                      <span className="bg-[#FDFAF6] p-1 rounded-full mr-2 flex items-center justify-center w-6 h-6">
                        <span className="text-xs">T</span>
                      </span>
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-[#97BE5A] opacity-30 sm:mx-auto" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm sm:text-center">© 2025 YourBrand. All Rights Reserved.</span>
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a href="#facebook" className="hover:text-[#FF8BA7] bg-[#FDFAF6] p-2 rounded-full flex items-center justify-center w-8 h-8">
                <FaFacebookF />
              </a>
              <a href="#instagram" className="hover:text-[#FF8BA7] bg-[#FDFAF6] p-2 rounded-full flex items-center justify-center w-8 h-8">
                <FaInstagram />
              </a>
              <a href="#whatsapp" className="hover:text-[#FF8BA7] bg-[#FDFAF6] p-2 rounded-full flex items-center justify-center w-8 h-8">
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