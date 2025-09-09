import React from "react";
import { notFound } from "next/navigation";
import CityCoursescategory from "./CityCoursescategory";
import axiosInstance from "@/utils/axiosInstance";
import Metadata from "@/components/Meta/Metadata";

const page = async ({ params }) => {
  const { slug } = params;

  try {
    const response = await axiosInstance.get(`/courses/getoncategory/${slug}`);

    const data = response.data;

    console.log(data)

    const metadata = {
      metatitle: data?.category_Meta_Title?.trim()
        ? data.category_Meta_Title
        : data?.category_Name || "",

      metadescription: data?.category_Meta_Description?.trim()
        ? data.category_Meta_Description
        : data?.category_Description || "",

      canonical: `https://www.pnytrainings.com/${
        data?.category_Meta_Title || data?.category_Name || ""
      }`,
    };

    return (
      <>
        <Metadata
          title={metadata.metatitle}
          description={metadata.metadescription}
          canonicalUrl={`https://www.pnytrainings.com/${metadata.metatitle}`}
          url={`https://www.pnytrainings.com/${metadata.metatitle}`}
          image={metadata.image}
          siteName="Pnytrainings"
        />

        <CityCoursescategory slug={slug} subcategory={data} />
      </>
    );
  } catch (error) {
    // Axios throws for non-2xx, so this is your fallback
    notFound();
  }
};

export default page;
