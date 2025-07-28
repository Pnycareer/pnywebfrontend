import React from "react";
import { notFound } from "next/navigation";
import Blogdetails from "./Blogdetails";
import Metadata from "@/components/Meta/Metadata";

const page = async ({ params }) => {
  const { slug, blogCategory } = await params;

  // 🛜 Fetch blog data from your API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/getonslug/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const blog = await res.json();

  console.log(blog.blogDescription)


  const metadata = {
    metatitle: blog.metaTitle || "Course Not Found",
    metadescription: blog.metaDescription || "This course does not exist.",
  };

  return (
    <>
      {/* <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} /> */}
      <Metadata
        title={metadata.metatitle}
        description={metadata.metadescription}
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blogCategory}/${slug}`}
      />
      <Blogdetails blog={blog} />
    </>
  );
};

export default page;
