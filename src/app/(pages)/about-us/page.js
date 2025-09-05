import React from "react";
import About from "./About";
import Metadata from "@/components/Meta/Metadata";

const Page = () => {
  return (
    <>
      <Metadata
        title="About Us | PNY"
        description="Learn more about our mission, team, and what makes PNY stand out."
        // url="https://www.pnytrainings.com/about-us"
        // image="images/about-banner.jpg" // Optional: relative to your base URL
        canonicalUrl="https://www.pnytrainings.com/about-us"
      />
      <About />
    </>
  );
};

export default Page;
