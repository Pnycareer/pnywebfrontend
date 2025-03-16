'use client'
import React, { useState } from "react";
import { BadgeCheck, Atom, BrainCircuit, Laptop2, GraduationCap } from "lucide-react";

const TrainerCertification = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Our Trainers Certified From</h2>

        {/* Icons Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-6">
          <BadgeCheck size={50} className="text-red-500" />
          <Atom size={50} className="text-green-500" />
          <BrainCircuit size={50} className="text-blue-500" />
          <Laptop2 size={50} className="text-yellow-500" />
          <GraduationCap size={50} className="text-purple-500" />
        </div>

        {/* Text Content */}
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          <strong>PNY Trainings is the leading IT training Hub in Lahore</strong> that conducts different training programs 
          aimed at helping young career seekers understand the basic information technology functioning of the sector and 
          the job role they aspire to take on. Their insight and vision have assisted us in enhancing the knowledge and skills 
          of youngsters to take on modern-day corporate challenges.
        </p>

        {/* Toggle More Content */}
        {showMore && (
          <div className="mt-4 text-gray-700 text-left max-w-4xl mx-auto space-y-4">
            <p>
              However, this is easier said than done especially in today&apos;s challenging career range. To achieve this dream, 
              basic college education is rarely enough, especially in Pakistan. The highly competitive employment market 
              looks for talented professionals with strong IT expertise.
            </p>
            <p>
              PNY Trainings offers different courses in Lahore, Islamabad, Rawalpindi, Karachi, and other major cities of Pakistan. 
              Our focus is to equip students with modern skills like <strong>Technology, Business, Development, and Digital Marketing.</strong>
            </p>
            <p>
              With weekend classes in Lahore, we are the only IT training center that allows professionals and students 
              to learn new skills with flexible timings, improving their job prospects.
            </p>
          </div>
        )}

        {/* Show More / Show Less Button */}
        <button
          onClick={handleToggle}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
};

export default TrainerCertification;
