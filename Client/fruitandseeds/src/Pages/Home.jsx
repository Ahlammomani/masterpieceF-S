import React from 'react'
import Hero from "../Components/Hero"
import pic from "../assets/Ghome.png"
import pic1 from "../assets/Khome.png"
import pic2 from "../assets/Shome.png"
import pic3 from "../assets/Phome.png"
import pic4 from "../assets/Whome.png"
import FAQ from "../Components/FAQ"
import Viedokides from "../Components/viedokides"
import  Search  from '../Components/search'
// import Pic from '../Components/pic'
import InstagramFeed from '../Components/InstagramFeed';
import InstagramFeeds from '../Components/InstagramProfile';
import ProductHome from '../Components/Producthome';

const Home = () => {
  return (
    <div>
      <Hero/>
    <Search/>
     
      <div className="max-w-screen-xl mx-auto p-2 sm:p-4 mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          <img src={pic} alt="healthy dessert 1" className="w-full h-32 sm:h-40 md:h-48 lg:h-52 " />
          <img src={pic1} alt="healthy dessert 2" className="w-full h-32 sm:h-40 md:h-48 lg:h-52 " />
          <img src={pic2} alt="healthy dessert 3" className="w-full h-32 sm:h-40 md:h-48 lg:h-52 " />
          <img src={pic3} alt="healthy dessert 4" className="w-full h-32 sm:h-40 md:h-48 lg:h-52 " />
          <img src={pic4} alt="healthy dessert 5" className="w-full h-32 sm:h-40 md:h-48 lg:h-52 " />
        </div>
      </div>
      <ProductHome/>
      <FAQ/>
      <Viedokides/>
      <InstagramFeeds/>
      <InstagramFeed/>
      {/* <Pic/> */}
    </div>

  )
}

export default Home