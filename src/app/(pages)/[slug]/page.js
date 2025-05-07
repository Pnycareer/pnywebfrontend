import { notFound } from "next/navigation";
import Detailpage from "./Detailpage";
import Metadata from "@/components/Meta/Metadata";

export default async function Page({ params }) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/getonslug/${slug}`,
    { cache: "no-cache" } // SEO: no-cache ensures fresh data but still SSR
  );

  if (!response.ok) {
    notFound();
  }

  const course = await response.json();

  if (!course || typeof course !== "object") {
    notFound();
  }


  const metadata = {
    title: course.Meta_Title || "Course Not Found",
    description: course.Meta_Description || "This course does not exist.",
    noindex: course.Page_Index,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
    image: course.course_Image|| "/default-course-image.jpg",
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
  };

  return (
    <>
      <Metadata {...metadata} />
      <Detailpage course={course} />
    </>
  );
}
