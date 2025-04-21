"use client";
import CourseCard from "@/components/cards/CourseCard";

const CityCoursescategory = ({ subcategory }) => {
  

  const toURL = (path) =>
    `${process.env.NEXT_PUBLIC_API_URL}/${path?.replace(/\\/g, "/")}`;

  return (
    <>
      <section className="relative flex items-center justify-center h-[300px] md:h-[400px] lg:h-[500px] xl:h-[300px] w-full bg-gradient-to-r from-[#1B263B] via-[#475e5e] to-[#006d5f] -z-50">
        <div className="absolute inset-0 backdrop-blur-md rounded-xl w-11/12 md:w-10/12 lg:w-8/12 mx-auto flex flex-col items-center justify-center p-6 md:p-10">
          <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold text-white text-center">
            Courses Offered in{" "}
            {subcategory?.category_Name
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>
          <p className="text-lg md:text-xl lg:text-xl text-gray-200 text-center mt-4 max-w-4xl">
            {subcategory?.category_Description || "No Description Found"}
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center p-6 md:p-10 bg-gray-100">
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subcategory?.courses?.length > 0 ? (
            subcategory.courses.map((course) => (
              <CourseCard
                key={course._id}
                name={course.course_Name || "No Name"}
                image={toURL(course.course_Image)}
                description={`Instructor: ${
                  course.Instructor?.name || "N/A"
                }, Fee: $${course.Monthly_Fee || "N/A"}`}
                urlslug={course.url_Slug}
              />
            ))
          ) : (
            <p className="text-xl text-gray-600">No courses available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default CityCoursescategory;
