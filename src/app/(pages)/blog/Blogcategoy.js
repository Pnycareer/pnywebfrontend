"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderSection from "@/components/HeaderSection/Headersection";

const BlogCategory = ({ blogsData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);

  const categories = [
    "all",
    ...new Set(blogsData.map((cat) => cat.blogCategory)),
  ];

  useEffect(() => {
    setSelectedCategory(urlCategory); // Update state when URL changes
  }, [urlCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    router.push(
      category === "all"
        ? `/blog`
        : `/blog?category=${encodeURIComponent(category)}`
    );
  };

  const allVisibleBlogs = blogsData.flatMap((category) =>
    category.blogs
      .filter((blog) => blog.inviewweb)
      .map((blog) => ({
        ...blog,
        category: category.blogCategory,
      }))
  );

  const filteredBlogs =
    selectedCategory === "all"
      ? allVisibleBlogs
      : allVisibleBlogs.filter((blog) => blog.category === selectedCategory);

  return (
    <>
      {/* Filter Buttons */}
      <HeaderSection
        pagetitle="Blogs and insights"
        shortdescription="Get knowledge with the latest blog insights."
      >
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${
          selectedCategory === category
            ? "bg-blue-600 text-white shadow-md"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
            >
              {category.charAt(0).toUpperCase() +
                category.slice(1).replace(/-/g, " ")}
            </button>
          ))}
        </div>
      </HeaderSection>
      <div className="container mx-auto p-6">
        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.category.toLowerCase()}/${blog.url_slug.toLowerCase()}`}
                className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block"
              >
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_API_URL
                  }/${blog.blogImage.replace(/\\/g, "/")}`}
                  alt={blog.blogName}
                  width={400}
                  height={250}
                  unoptimized
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {blog.blogName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.shortDescription}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Published on:{" "}
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogCategory;
