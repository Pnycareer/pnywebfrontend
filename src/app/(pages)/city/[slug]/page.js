import React from "react";
import { notFound } from "next/navigation";
import CityCoursescategory from "./CityCoursescategory";

const page = async ({ params }) => {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/getoncategory/${slug}`,
    { cache: "no-cache" }
  );

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  const metadata = {
    metatitle: data?.category_Name || "Course Not Found",
    metadescription:
      data?.category_Description || "This course does not exist.",
  };

  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <CityCoursescategory slug={slug} subcategory={data} />
    </>
  );
};

export default page;
