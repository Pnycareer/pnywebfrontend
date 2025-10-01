import CourseAccordion from "@/components/CoursesAccordian/CoursesAccordion";
import BenefitsSection from "@/components/Detailpage/Benefits";
import Coursedescription from "@/components/Detailpage/Coursedescription";
import CourseHero from "@/components/Detailpage/CourseSection";
import InstructorOverview from "@/components/Detailpage/Instructor";
import SubjectsList from "@/components/Detailpage/SubjectsStrip";
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
      <SubjectsList
        introductionTitle="INTRODUCTION"
        title={`Subjects ${course.course_Name}`}
        subtitle="Core modules you’ll tackle"
        subjects={course?.subjects || []}
        shortdesc={course.Short_Description}
      />
      <BenefitsSection className="bg-transparent -mt-px" />
      {course.Instructor && (
        <InstructorOverview Instructor={course.Instructor} />
      )}
      {/* <Coursedescription coursedesc={course} /> */}
      <CourseAccordion faqs={course.faqs} />
    </>
  );
};

export default AcademiaDetails;
