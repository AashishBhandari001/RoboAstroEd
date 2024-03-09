import React from "react";

import Hero from "../../Components/Hero";
import Testimonials from "../../Components/Testimonials";
import LogoCarousel from "../../Components/LogoCarausel";
import Branding from "../../Components/Branding/branding";
import Card from "../../Components/Card/card";
import Detail from "../../Components/Section/ourDetail";
import Highlight from "../../Components/Section/ourHighlight";
import Projects from "../../Components/Section/studetsProject";

import MetaData from "../../Router/Metadata/metaData"; // Importing MetaData

function Home() {
  return (
    <>
      <div className=" relative">
        <MetaData title={"ROBOASTROED"} />
        <Hero />
        <Branding />
        <Card />
        <Detail />
        <Highlight />
        <Projects />
        <Testimonials />
        <LogoCarousel />
      </div>
    </>
  );
}

export default Home;
