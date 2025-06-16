import React from "react";
import BlogCategory from "./Blogcategoy"; // ✅ double-check spelling
import axios from "@/utils/axiosInstance"; // ✅ uses your custom axios instance

export const metadata = {
  title: 'Blogs',
  description:
    'Discover the latest insights, tutorials, and tips across marketing, technology, design, SEO, and more on our blog. Stay updated and grow your knowledge with our expert-written articles.',
};

const Page = async () => {
  let blogsData = [];

  try {
    const res = await axios.get("/api/blogs", {
      headers: { "Cache-Control": "no-store" }, // disables caching
    });

    blogsData = res.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    // Optionally you could redirect to a fallback page, show a custom error component, etc.
  }

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <BlogCategory blogsData={blogsData} />
    </>
  );
};

export default Page;
