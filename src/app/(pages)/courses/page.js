import React from "react";
import AllCourses from "./AllCourses";
import axiosInstance from "@/utils/axiosInstance";

export const revalidate = 0;

async function getCategories() {
  try {
    const res = await axiosInstance.get("/courses/get-course");
    return res?.data?.data || [];
  } catch (err) {
    console.error("Error fetching categories:", err?.message || err);
    return [];
  }
}

const Page = async () => {
  const categories = await getCategories();

  return <AllCourses categories={categories} />;
};

export default Page;
