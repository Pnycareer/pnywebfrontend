import CourseAccordion from "@/components/CoursesAccordian/CoursesAccordion";
import AcademiaInstructor from "@/components/Detailpage/AcademiaInstructor";
import BenefitsSection from "@/components/Detailpage/Benefits";
import Coursedescription from "@/components/Detailpage/Coursedescription";
import CourseHero from "@/components/Detailpage/CourseSection";
import InstructorOverview from "@/components/Detailpage/Instructor";
import SubjectsList from "@/components/Detailpage/SubjectsStrip";
import React from "react";
import { Users, AppWindow, CheckCircle2 } from "lucide-react";

const AcademiaDetails = ({ course }) => {
  const brochurePath = course.Brochure
    ? `${process.env.NEXT_PUBLIC_API_URL}/${course.Brochure.replace(/\\/g, "/")}`
    : "";

  const isCorporate =
    (course?.category || "").toLowerCase() === "corporate trainings";

  // dynamic strip title/placeholder for corporate
  const subjectsTitle = isCorporate
    ? `Key Topics ${course.course_Name}`
    : `Subjects ${course.course_Name}`;

  return (
    <>
      <CourseHero course={course} brochurePath={brochurePath} />

      {/* Subjects / Key Topics */}
      <SubjectsList
        className="mb-16" // spacing to separate from next section
        title={subjectsTitle}
        subtitle={
          isCorporate ? "Core topics in this training" : "Core modules you’ll tackle"
        }
        subjects={course?.subjects || []}
        shortdesc={course.Short_Description}
        category={course?.category}
      />

      {/* Corporate-only “Audience” & “Software” */}
      {isCorporate && (course.Audience || course.software) ? (
        <section className="relative z-[1] mx-auto max-w-6xl w-full px-4 sm:px-6 mt-4 mb-4">
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Audience */}
            {course.Audience ? (
              <div className="relative overflow-hidden rounded-2xl border bg-white/90 shadow-sm transition hover:shadow-lg backdrop-blur-sm">
                <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-br from-sky-200/40 via-sky-100/30 to-emerald-100/30 blur-3xl" />
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                      <Users className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-800">
                      Who should Attend
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {/* {course.Audience} */}
                  </p>

                  {course.Audience.includes(",") && (
                    <ul className="mt-4 space-y-2">
                      {course.Audience.split(/[,|\n]/)
                        .map((x) => x.trim())
                        .filter(Boolean)
                        .map((x, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-slate-700"
                          >
                            <CheckCircle2 className="h-4 w-4 text-sky-600" />
                            <span>{x}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : null}

            {/* Software */}
            {course.software ? (
              <div className="relative overflow-hidden rounded-2xl border bg-white/90 shadow-sm transition hover:shadow-lg backdrop-blur-sm">
                <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-br from-emerald-200/40 via-teal-100/30 to-sky-100/30 blur-3xl" />
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <AppWindow className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-800">
                      Software
                    </h3>
                  </div>

                  {course.software.includes(",") ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {course.software
                        .split(/[,|\n]/)
                        .map((x) => x.trim())
                        .filter(Boolean)
                        .map((tool, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1.5 text-sm text-slate-700 shadow-sm"
                          >
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10">
                              <AppWindow className="h-3.5 w-3.5 text-emerald-600" />
                            </span>
                            {tool}
                          </span>
                        ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {course.software}
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <BenefitsSection className="bg-transparent mt-0" />
      <AcademiaInstructor />
      <Coursedescription coursedesc={course} />
      <CourseAccordion faqs={course.faqs} />
    </>
  );
};

export default AcademiaDetails;
