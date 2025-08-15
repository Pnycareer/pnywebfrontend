import { notFound } from "next/navigation";
import Detailpage from "./Detailpage";
import Metadata from "@/components/Meta/Metadata";
import CourseFeature from "@/components/Detailpage/Module";
import axios from "@/utils/axiosInstance";

export default async function Page({ params }) {
  const { slug } = await params;

  let course;

  try {
    const response = await axios.get(
      `/courses/getonslug/${slug}`,
      { headers: { "Cache-Control": "no-cache" } }
    );

    course = response.data;

    if (!course || typeof course !== "object") {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    notFound();
  }


 

  const metadata = {
    title: course.Meta_Title || "Course Not Found",
    description: course.Meta_Description || "This course does not exist.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
    image: course.course_Image,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
  };

  return (
    <>
      <Metadata {...metadata} />
      <Detailpage course={course} />
      {course.script && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              typeof course.script === "string"
                ? course.script
                : JSON.stringify(course.script),
          }}
        />
      )}
      {/* <CourseFeature Modules={course.courseModule} /> */}
    </>
  );
}
