import React from "react";
import BlogCategory from "./Blogcategoy"; // ✅ double-check spelling
import axios from "@/utils/axiosInstance"; // ✅ uses your custom axios instance
import Metadata from "@/components/Meta/Metadata";

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
      <Metadata
        title="PNY Trainings Blog – Insights, Tips & Tutorials"
        description="Explore the PNY Trainings blog for helpful tutorials, technology insights, marketing tips, and design ideas to boost your learning and career growth.
"
        canonicalUrl="https://www.pnytrainings.com/blog"
      />
      <BlogCategory blogsData={blogsData} />
    </>
  );
};

export default Page;
