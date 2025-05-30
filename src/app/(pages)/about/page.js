import React from "react";
import About from "./About";
import Metadata from "@/components/Meta/Metadata";

const Page = () => {
  return (
    <>
      <Metadata
        title="About Us | NextCMS"
        description="Learn more about our mission, team, and what makes NextCMS stand out."
        url="https://nextcms.shop/about"
        // image="images/about-banner.jpg" // Optional: relative to your base URL
        canonicalUrl="https://nextcms.shop/about"
      />
      <About />
    </>
  );
};

export default Page;
