import React from "react";
import Webbanner from "@/components/home/Webbanner";
import HeroSection from "@/components/home/Herosection";
import ProfessionalDevelopment from "@/components/home/Professionaldevelop";
import CareerSection from "@/components/home/Career";
import WhyChooseUs from "@/components/home/Whychooseus";
import TrainerCertification from "@/components/home/Trainers";
import MediaPartners from "@/components/home/Mediapartner";
import Animation from "@/components/Animation/Animation";
import Coursecategories from "@/components/home/Coursecategories";
import TawkToChatbot from "@/components/Talktobot/Chatbot";
import Affiliation from "@/components/home/Affiliation";


const Home = () => {
  return (
    <>
      {/* <Animation /> */}
      <Webbanner />
      <HeroSection />
      <ProfessionalDevelopment />
      <Coursecategories />
      <CareerSection />
      <WhyChooseUs />
      <TrainerCertification />
      <Affiliation />
      <TawkToChatbot />
      {/* <MediaPartners/> */}
    </>
  );
};

export default Home;
