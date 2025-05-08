import React from "react";
import Webbanner from "@/components/home/Webbanner";
import HeroSection from "@/components/home/Herosection";
import ProfessionalDevelopment from "@/components/home/Professionaldevelop";
import CareerSection from "@/components/home/Career";
import WhyChooseUs from "@/components/home/Whychooseus";
import TrainerCertification from "@/components/home/Trainers";
import MediaPartners from "@/components/home/Mediapartner";
import Animation from "@/components/Animation/Animation";

const Home = () => {
  return (
    <>
      <Webbanner />
      <HeroSection />
      {/* <Animation /> */}
      <CareerSection />
      <ProfessionalDevelopment />
      <WhyChooseUs />
      <TrainerCertification />
      {/* <MediaPartners/> */}
    </>
  );
};

export default Home;
