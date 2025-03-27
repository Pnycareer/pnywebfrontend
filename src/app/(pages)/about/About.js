"use client";
import { motion } from "framer-motion";
import Whoweare from "./Whoweare";
import OurWorth from "./Ourworth";
import CeoMessage from "./Ceo";
import GrowTogether from "./Grow";
import Mission from "./Mission";

const About = () => {
  return (
    <>
      <motion.div
        initial={{ x: "100%", opacity: 0, filter: "blur(10px)" }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ x: "-100%", opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="h-52 flex flex-col items-center justify-center bg-gray-900 text-white p-8"
      >
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl">
          Welcome to our platform! We are dedicated to providing high-quality
          education and professional training to help learners excel in their
          careers.
        </p>
      </motion.div>
      <Whoweare/>
      <OurWorth/>
      <Mission/>
      <CeoMessage/>
      <GrowTogether/>
    </>
  );
};

export default About;
