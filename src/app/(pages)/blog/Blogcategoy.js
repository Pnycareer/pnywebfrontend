"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const BlogCategory = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`
        );
        setBlogsData(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading blogs...</div>;
  }

  const categories = ["all", ...blogsData.map((cat) => cat.blogCategory)];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Flatten all blogs into one array
  const allVisibleBlogs = blogsData.flatMap((category) =>
    category.blogs
      .filter((blog) => blog.inviewweb) // Only blogs with inviewweb true
      .map((blog) => ({
        ...blog,
        category: category.blogCategory, // Attach category info to blog
      }))
  );

  const filteredBlogs =
    selectedCategory === "all"
      ? allVisibleBlogs
      : allVisibleBlogs.filter(
          (blog) => blog.category === selectedCategory
        );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-800">
        Explore Our Blogs
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 
            ${
              selectedCategory === category
                ? "bg-blue-700 text-white shadow-lg scale-105"
                : "bg-white text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

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
              <div>
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCategory;
