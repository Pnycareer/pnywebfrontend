"use client";
import React, { useState } from "react";
import {
  BadgeCheck,
  Atom,
  BrainCircuit,
  Laptop2,
  GraduationCap,
} from "lucide-react";

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
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed text-justify">
          <strong>Next cms is the leading IT training Hub in Lahore</strong>{" "}
          that conducts different training programs aimed at helping young
          career seekers understand the basic information technology functioning
          of the sector and the job role they aspire to take on. Their insight
          and vision have assisted us in enhancing the knowledge and skills of
          youngsters to take on modern-day corporate challenges. Getting a good
          start in a career is a cherished dream for every career candidate.
        </p>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed text-justify mt-3">
          However, this is easier said than done especially in todays
          challenging career range. To achieve this dream basic college
          education is rarely enough, especially in Pakistan. Todays highly
          competitive and demanding employment market is looking for only
          talented and skilled manpower with enough command of the essentials of
          the information technology industry. To make a mark you must have the
          necessary knowledge, skills, and capability to provide to the specific
          industry you aspire to enter into an increase. This is equally true
          across domains of Technology, Business, Development, and Designing, IT
          Software Development, Digital Marketing Courses, and many more.
        </p>

        {/* Toggle More Content */}
        {showMore && (
          <div className="text-lg mt-4 text-gray-700 text-justify max-w-4xl mx-auto space-y-4">
            <p>
              One of the ways that you can gain an advantage over your
              contemporaries is to undergo courses offered by the reputable IT
              Hub in Lahore. There are so many seats available in Arfa Tower
              short courses and all you have to do is to enroll yourself in your
              desired course. Next cms offers different courses in Lahore,
              Islamabad, Rawalpindi, Karachi, and other major cities of
              Pakistan.
            </p>
            <p>
              Next cms is one of the promising and Best IT Training institutes
              in Lahore that comes up with amazing courses, training, and almost
              all short courses in Lahore. We are the introducers to numerous IT
              trends, courses, and certifications in Lahore. The motive of the
              next Arfa Tower short courses is to provide the best courses with
              guaranteed results for everyone.
              <strong>
                Technology, Business, Development, and Digital Marketing.
              </strong>
            </p>
            <p>
              With our weekend classes in Lahore, we are the only IT training
              center in Lahore that allows all professionals and students to
              learn new skills for online earning. The flexible timings let them
              be part of new industry trends and improve their skills to get
              better-paid jobs in our next Arfa Karim tower courses, For every
              single course we pay attention to the student ease and feasibility
              when it comes to class schedule, timings, course duration,
              content, and teaching method.
            </p>
            <p>
              Next cms is one of the best online IT training institutes in Arfa
              Tower Lahore Pakistan that offers you the opportunity to learn new
              skills online. By accessing the online repository, you will be
              able to get the course and training from our qualified trainers
              and mentors. We have an organized system of teaching,
              coordination, follow-up, and course completion to let you have the
              ultimate outcomes.
            </p>
            <p>
              We are here when you are looking for the best IT training
              institute in Lahore that Next cms all the next-level skill-based
              IT training centers. Everything is designed precisely from our
              graphic designing courses to SEO training courses, their content,
              and even the training sessions. We pay attention to market need,
              demand, and future scope of the skills while offering a course.
              Every single course is an addition to your skillset that will
              repay you in the future.
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
