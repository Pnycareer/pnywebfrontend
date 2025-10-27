import React from "react";
import BlogCategory from "./Blogcategoy";
import Metadata from "@/components/Meta/Metadata";

const Page = async () => {
  let blogsData = [];
  const apiBase =
    process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;

  if (!apiBase) {
    console.warn("Blog listing: missing API base URL.");
  } else {
    try {
      const res = await fetch(`${apiBase}/api/blogs`, {
        headers: { "x-ssr": "1" },
        next: { revalidate: 300 },
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      blogsData = await res.json();
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  return (
    <>
      <Metadata
        title="PNY Trainings Blog - Insights, Tips & Tutorials"
        description="Explore the PNY Trainings blog for helpful tutorials, technology insights, marketing tips, and design ideas to boost your learning and career growth."
        canonicalUrl="https://www.pnytrainings.com/blog"
      />
      <BlogCategory blogsData={blogsData} />
    </>
  );
};

export default Page;
