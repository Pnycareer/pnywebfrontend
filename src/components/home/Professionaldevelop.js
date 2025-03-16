import React from "react";
import WaveEffect from "@/components/effects/Waving";

const programs = [
  {
    title: "1 Year Professional Diploma Programs",
    description: "A 1-year diploma is ideal for students who build their careers in software, graphics, web, and marketing for potential growth.",
  },
  {
    title: "6 Months Certified Courses",
    description: "Accelerate your career with our comprehensive 6-month certified courses. Gain specialized expertise and excel in your career.",
  },
  {
    title: "3-2 Months Certified Courses",
    description: "Elevate your expertise from 3 to 2 months with our Professional Certification Courses. Unlock new career opportunities!",
  },
  {
    title: "Professional Boot Camp",
    description: "Join our Professional Bootcamp and gain valuable insights to advance your career. Don't miss out!",
  },
];

const ProfessionalDevelopment = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 text-white py-16 px-6 overflow-hidden">
    {/* Water Wave Effect */}
    <WaveEffect height={150} />

    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Professional Development Timeframe</h2>
      <p className="text-lg text-gray-200 max-w-3xl mx-auto">
        Unlock your potential with our comprehensive range of skill programs! Choose from 1-year diploma programs, 6-month certified courses, 
        3-2 month certified courses, and professional boot camps. Upgrade your skills today!
      </p>
    </div>

    {/* Card Grid */}
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {programs.map((program, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-white/20">
          <h3 className="text-xl font-semibold text-white">{program.title}</h3>
          <p className="text-gray-200 mt-2">{program.description}</p>
        </div>
      ))}
    </div>
  </section>
  );
};

export default ProfessionalDevelopment;
