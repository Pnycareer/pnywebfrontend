import React from "react";
import { notFound } from "next/navigation";
import Blogdetails from "./Blogdetails";
import Metadata from "@/components/Meta/Metadata";
import axiosInstance from "@/utils/axiosInstance"; // adjust the path to where axiosInstance is located

const page = async ({ params }) => {
  const { slug, blogCategory } = await params;

  try {
    // Use axiosInstance for API call
    const res = await axiosInstance.get(`/api/blogs/getonslug/${slug}`, {
      // Disable caching since axios caches via browser by default sometimes
      headers: {
        "Cache-Control": "no-store",
      },
    });

    const blog = res.data;

    const metadata = {
      metatitle: blog.metaTitle || "Course Not Found",
      metadescription: blog.metaDescription || "This course does not exist.",
    };


    return (
      <>
        <Metadata
          title={metadata.metatitle}
          description={metadata.metadescription}
          url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blogCategory}/${slug}`}
        />
        <Blogdetails blog={blog}  />
      </>
    );
  } catch (error) {
    // If the request fails or returns a non-200 status, show the 404 page
    console.error("Error fetching blog:", error?.response?.data || error.message);
    notFound();
  }
};

export default page;
