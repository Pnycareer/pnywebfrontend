import BenefitsSection from "@/components/Detailpage/Benefits";
import Coursedescription from "@/components/Detailpage/Coursedescription";
import CourseHero from "@/components/Detailpage/CourseSection";
import InstructorOverview from "@/components/Detailpage/Instructor";
import React from "react";

const AcademiaDetails = ({ course }) => {
  const brochurePath = course.Brochure
    ? `${process.env.NEXT_PUBLIC_API_URL}/${course.Brochure.replace(
        /\\/g,
        "/"
      )}`
    : "";

  return (
    <>
      <CourseHero course={course} brochurePath={brochurePath} />
      <BenefitsSection className="bg-transparent -mt-px" />
      {course.Instructor && (
        <InstructorOverview Instructor={course.Instructor} />
      )}
      <Coursedescription coursedesc={course} />
    </>
  );
};

export default AcademiaDetails;
