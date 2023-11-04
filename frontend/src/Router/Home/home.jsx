import React from "react";

import Hero from "../../Components/Hero";
import Testimonials from "../../Components/Testimonials";
import LogoCarousel from "../../Components/LogoCarausel";
import Branding from "../../Components/Branding/branding";
import Card from "../../Components/Card/card";

import MetaData from "../../Router/Metadata/metaData"; // Importing MetaData

function Home() {
  return (
    <>
      <MetaData title={"Beyond Apogee"} />
      <Hero />
      <Branding />
      <Card />
      <Testimonials />
      <LogoCarousel />
    </>
  );
}

export default Home;
