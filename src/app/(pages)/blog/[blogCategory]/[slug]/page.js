import React from "react";
import Blogdetails from "./Blogdetails";

export async function generateStaticParams() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,
    {
      cache: "no-cache",
    }
  );
  const result = await res.json();

  if (!Array.isArray(result)) {
    console.error("API response is not an array:", result);
    return [];
  }

  return result.map((course) => ({
    slug: course.url_slug,
  }));
}

const page = async ({ params }) => {
  const { slug } = await params;

  // 🛜 Fetch blog data from your API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/getonslug/${slug}`, { cache: "no-store" });
  
  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  

  const blog = await res.json();

  const metadata = {
    metatitle: blog.metaTitle || "Course Not Found",
    metadescription: blog.metaDescription || "This course does not exist.",
  };


  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <Blogdetails blog={blog} />
    </>
  );
};

export default page;
