import Feature from "@/components/MainLandingPage/Feature";
import Footer from "@/components/MainLandingPage/Footer";
import Hero from "@/components/MainLandingPage/Hero";
import Navbar from "@/components/MainLandingPage/Navbar";
import React from "react";



const MainPage = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar />
      {/* hero */}
      <Hero />
      {/* feature */}
      <Feature />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
