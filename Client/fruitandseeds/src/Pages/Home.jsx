import React from 'react'
import Hero from "../Components/Hero"
import pic from "../assets/Ghome.png"
import pic1 from "../assets/Khome.png"
import pic2 from "../assets/Shome.png"
import pic3 from "../assets/Phome.png"
import pic4 from "../assets/Whome.png"
import FAQ from "../Components/FAQ"
import Viedokides from "../Components/viedokides"

const Home = () => {
  return (
    <div>
      <Hero/>
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <img src={pic} alt="healthy dessert 1" className="w-full h-52 object-cover" />
          <img src={pic1} alt="healthy dessert 2" className="w-full h-52 object-cover" />
          <img src={pic2} alt="healthy dessert 3" className="w-full h-52 object-cover" />
          <img src={pic3} alt="healthy dessert 4" className="w-full h-52 object-cover" />
          <img src={pic4} alt="healthy dessert 5" className="w-full h-52 object-cover" />
        </div>
      </div>
      <FAQ/>
      <Viedokides/>
    </div>

  )
}

export default Home