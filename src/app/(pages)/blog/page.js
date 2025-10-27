import React from "react";
import BlogCategory from "./Blogcategoy";
import axios from "@/utils/axiosInstance";
import Metadata from "@/components/Meta/Metadata";

const Page = async () => {
  let blogsData = [];

  try {
    // ✅ Removed "Cache-Control": "no-store"
    const res = await axios.get("/api/blogs");
    blogsData = res.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <>
      <Metadata
        title="PNY Trainings Blog – Insights, Tips & Tutorials"
        description="Explore the PNY Trainings blog for helpful tutorials, technology insights, marketing tips, and design ideas to boost your learning and career growth."
        canonicalUrl="https://www.pnytrainings.com/blog"
      />
      <BlogCategory blogsData={blogsData} />
    </>
  );
};

export default Page;
