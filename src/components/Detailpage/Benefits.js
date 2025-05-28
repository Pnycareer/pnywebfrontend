"use client";
import { motion } from "framer-motion";
import { Book, Users, Briefcase, GraduationCap, Video, UserCheck } from "lucide-react";

const benefits = [
  { icon: <Book size={36} />, text: "Learning Management" },
  { icon: <UserCheck size={36} />, text: "Instructor Support" },
  { icon: <Briefcase size={36} />, text: "Internship Opportunity" },
  { icon: <GraduationCap size={36} />, text: "Job Cell" },
  { icon: <Users size={36} />, text: "NEXT Community Member" },
  { icon: <Video size={36} />, text: "Free Seminar Access" },
];

const BenefitsSection = () => {
  return (
    <section className="bg-blue-50 py-16 px-6 md:px-12 lg:px-20 text-center">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="md:text-3xl font-bold text-gray-900"
        >
          Access Complementary Benefits by Enrolling in this Course.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-700 mt-4 md:text-lg"
        >
          We discover your personal and professional growth, capitalizing on opportunities that will have a profound impact on your employment and career advancement.
        </motion.p>
      </div>

      {/* Benefits Grid */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto"
      >
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index} 
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center text-blue-600"
          >
            <div className="p-4 bg-white shadow-md rounded-lg">{benefit.icon}</div>
            <p className="text-gray-900  font-semibold mt-2">{benefit.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BenefitsSection;
