import React from "react";

import Hero from "../../Components/Hero";
import Testimonials from "../../Components/Testimonials";
import LogoCarousel from "../../Components/LogoCarausel";
import Branding from "../../Components/Branding/branding";
import Card from "../../Components/Card/card";
import WhatsappWidget from "../../Elements/WhatsappWidget/whatsappWidget";

import MetaData from "../../Router/Metadata/metaData"; // Importing MetaData

function Home() {
  return (
    <>
      <div className=" relative">
        <MetaData title={"ROBOASTROED"} />
        <Hero />
        <Branding />
        <Card />
        {/* <WhatsappWidget /> */}
        {/* <Testimonials /> */}
        <LogoCarousel />
      </div>
    </>
  );
}

export default Home;
