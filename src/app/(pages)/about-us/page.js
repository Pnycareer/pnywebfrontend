import React from "react";
import About from "./About";
import Metadata from "@/components/Meta/Metadata";

const Page = () => {
  return (
    <>
      <Metadata
        title="About PNY Trainings – A Reputable Institute in Pakistan for IT Training"
        description="PNY Trainings is a reputable institute in Pakistan offering quality IT training since 2014. Learn about our journey, vision, and commitment to student success."
        canonicalUrl="https://www.pnytrainings.com/about-us"
      />
      <About />
    </>
  );
};

export default Page;
