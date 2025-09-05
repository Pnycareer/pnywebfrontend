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
import SpinWheelModal from "@/components/SpinWheel/SpinWheelModal";

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
      {/* <SpinWheelModal
      // dev helpers:
      // forceOpen
      // storageKey="spinWheelShown_v3"
      // oncePer="local"   // 'local' | 'session' | 'none'
      // openDelayMs={300}
      /> */}
      <TawkToChatbot />
      {/* <MediaPartners/> */}
    </>
  );
};

export default Home;
