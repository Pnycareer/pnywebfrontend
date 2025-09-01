import React from "react";
import AllCourses from "./AllCourses";
import axiosInstance from "@/utils/axiosInstance";

// Disable caching
export const revalidate = 0;

// ✅ Minimal metadata export (only title and description)
export const metadata = {
  title: "Courses",
  description:
    "",
};

// ✅ API Call
async function getCategories() {
  try {
    const res = await axiosInstance.get("/courses/get-course");
    return res?.data?.data || [];
  } catch (err) {
    console.error("Error fetching categories:", err?.message || err);
    return [];
  }
}

// ✅ Page Component
const Page = async () => {
  const categories = await getCategories();
  return <AllCourses categories={categories} />;
};

export default Page;
