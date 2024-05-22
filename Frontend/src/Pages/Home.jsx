import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Comp from "../Components/Comp";
import Slider from "../Components/Slider";
import NsHome from "../Components/NsHome";

const Home = () => {
  return (
    <div>
      <Hero />
      <Comp />
      <NsHome />
      <Slider />
      <Footer />
    </div>
  );
};

export default Home;
