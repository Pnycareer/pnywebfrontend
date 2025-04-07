import React from "react";
import { notFound } from "next/navigation";
import CityCoursescategory from "./CityCoursescategory";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/subCourse`, {
    cache: "no-cache",
  });

  const result = await res.json();

  if (!Array.isArray(result)) {
    console.error("API response is not an array:", result);
    return [];
  }

  return result.map((cat) => ({
    slug: cat.url_slug,
  }));
}
const page = async ({ params }) => {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/subCourse/getsubcourses/${slug}`,
    { cache: "no-cache" }
  );


  // If API response is not ok or the data is empty, redirect to the real 404 page
  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  const metadata = {
    metatitle: data.meta_title || "Course Not Found",
    metadescription: data.meta_description || "This course does not exist.",
  }
  
  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <CityCoursescategory params={{ slug }} />;
    </>
  );
};

export default page;
