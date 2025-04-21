// app/blog/page.js (or pages/blog/index.js depending on your structure)
import React from "react";
import BlogCategory from "./Blogcategoy"; // Ensure correct relative path

export const metadata = {
  title: 'Blogs',
  description:
    'Discover the latest insights, tutorials, and tips across marketing, technology, design, SEO, and more on our blog. Stay updated and grow your knowledge with our expert-written articles.',
};

const Page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    cache: "no-store", // disables caching (good for SSR)
  });
  const blogsData = await res.json();

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <BlogCategory blogsData={blogsData} />
    </>
  );
};

export default Page;
