"use client";
import { motion } from "framer-motion";
import Whoweare from "./Whoweare";
import OurWorth from "./Ourworth";
import CeoMessage from "./Ceo";
import GrowTogether from "./Grow";
import Mission from "./Mission";
import HeaderSection from "@/components/HeaderSection/Headersection";

const About = () => {
  return (
    <>
     <HeaderSection
          pagetitle="About Us"
          shortdescription="Welcome to our platform! We are dedicated to providing high-quality
          education and professional training to help learners excel in their
          careers."
        />
      <Whoweare />
      <OurWorth />
      <Mission />
      <CeoMessage />
      <GrowTogether />
    </>
  );
};

export default About;
