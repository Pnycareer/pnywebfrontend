import React from "react";
import { notFound } from "next/navigation";
import Blogdetails from "./Blogdetails";
import Metadata from "@/components/Meta/Metadata";
import axiosInstance from "@/utils/axiosInstance";

const Page = async ({ params }) => {
  const { slug, blogCategory } = await params;

  try {
    // ✅ Use axios for API call
    // ✅ No 'no-store' header (enables caching)
    // ✅ Next will still cache this route statically and revalidate every 5 mins
    const res = await axiosInstance.get(`/api/blogs/getonslug/${slug}`);

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
        <Blogdetails blog={blog} />
      </>
    );
  } catch (error) {
    console.error("Error fetching blog:", error?.response?.data || error.message);
    notFound();
  }
};

// ✅ Tell Next.js to regenerate the page every 5 minutes (ISR)
export const revalidate = 300;

export default Page;
