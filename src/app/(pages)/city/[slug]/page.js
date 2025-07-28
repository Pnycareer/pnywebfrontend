import React from "react";
import { notFound } from "next/navigation";
import CityCoursescategory from "./CityCoursescategory";
import axiosInstance from "@/utils/axiosInstance";

const page = async ({ params }) => {
  const { slug } = params;

  try {
    const response = await axiosInstance.get(`/courses/getoncategory/${slug}`);

    const data = response.data;

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
  } catch (error) {
    // Axios throws for non-2xx, so this is your fallback
    notFound();
  }
};

export default page;
