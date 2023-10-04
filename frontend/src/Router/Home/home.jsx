import React from "react";

import Hero from "../../Components/Hero";
import Testimonials from "../../Components/Testimonials";
import LogoCarousel from "../../Components/LogoCarausel";
import Branding from "../../Components/Branding/branding";
import Card from "../../Components/Card/card";

function Home() {
  return (
    <>
      <Hero />
      <Branding />
      <Card />
      <Testimonials />
      <LogoCarousel />
    </>
  );
}

export default Home;
