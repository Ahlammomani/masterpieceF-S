import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Menu from "./pages/Menu";
import ContactUs from "./pages/ContactUs";
import Details from "./pages/Details";
// import Cart from "./pages/Cart";
import Navbar from "./Components/Navbar";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin/Dashboard";
import Footer from "./Components/Footer";
import NotFound from './Pages/NotFound';
import Checkout from "./Pages/Checkout";
import OrderConfirmation from './Pages/OrderConfirmation';
import WhatsApp from "./Components/WhatsApp";
import logo from './assets/logo.png';
import { CookiesProvider } from 'react-cookie';

const ConditionalLayout = ({ children }) => {
  const location = useLocation();
  const noNavbarFooterPaths = ["/admin", "/login" ,"/signup","/Admin"];
  const shouldShowNavbarAndFooter = !noNavbarFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  return (
    <div className="App font-cairo">
      {shouldShowNavbarAndFooter && (
        <Suspense fallback={<div>Loading Navbar...</div>}>
          <Navbar />
        </Suspense>
      )}
      {children}
      {shouldShowNavbarAndFooter && (
        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

function App() {
  return (
    <CookiesProvider>
    <Router>
      <ConditionalLayout>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/Checkout" element ={<Checkout/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/Admin/*" element={<Admin />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/Details/:productId" element={<Details />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      </ConditionalLayout>
      <WhatsApp
          position={{ bottom: "20px", right: "100px" }} // Offset to avoid overlap with chatbot
          phoneNumber="+962777730914" // Replace with your actual WhatsApp number
          profileName="Fruit and seeds"
          profileImage={logo} // Replace with your actual profile image URL
          welcomeText="Hello and welcome to Fruit and Seeds — your healthy sweet spot! We're here if you need any help"
        />
    </Router>
    </CookiesProvider>
  );
}

export default App;