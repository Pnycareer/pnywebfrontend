"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import SocialShare from "@/components/SocialShare/SocialShare";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import axios from "@/utils/axiosInstance";
import { generateHeadingsAndHTML } from "@/utils/htmlHeadingsParser";
import RichTextRenderer from "@/components/RichTextRenderer/RichTextRenderer";
import CourseAccordion from "@/components/CoursesAccordian/CoursesAccordion";

const Blogdetails = ({ blog }) => {
  const {
    blogName,
    blogDescription,
    shortDescription,
    publishDate,
    blogImage,
    author,
    tags,
    showtoc,
  } = blog;

  const [recentBlogs, setRecentBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = `${baseUrl}${pathname}`;

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        const data = res.data;

        const allBlogs = data.flatMap((category) =>
          category.blogs.map((blog) => ({
            ...blog,
            blogCategory: category.blogCategory,
          }))
        );

        const shuffledBlogs = allBlogs.sort(() => 0.5 - Math.random());
        const topSixBlogs = shuffledBlogs.slice(0, 6);
        setRecentBlogs(topSixBlogs);

        // Extract unique categories
        const uniqueCategories = data.map((cat) => cat.blogCategory);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  const { html: updatedHtml, headings } =
    generateHeadingsAndHTML(blogDescription);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* Blog Header */}
      <div className="container mx-auto">
        {/* Animated Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-10 p-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500"
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 text-white"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {blogName}
            </h1>
            <p className="text-lg mb-6">{shortDescription}</p>
            <p className="text-sm text-gray-400">
              Publish date: {new Date(publishDate).toLocaleDateString()}
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex-1"
          >
            <div className="rounded-lg overflow-hidden shadow-lg">
              {blogImage ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${blogImage.replace(
                    /\\/g,
                    "/"
                  )}`}
                  unoptimized={true}
                  alt="Blog Main"
                  width={800}
                  height={500}
                  className="object-cover w-full h-auto"
                />
              ) : (
                <div className="w-full h-[300px] flex items-center justify-center bg-gray-200 rounded-lg">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content and Sidebar */}
      <div className="flex flex-col lg:flex-row gap-10 mt-10 md:px-5 mb-4">
        {/* Blog Main Content */}
        <div className="flex-1">
          {/* Blog Description */}
          <RichTextRenderer html={updatedHtml} />
          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 my-5">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <SocialShare title={blogName} url={fullUrl} />

          {/* Author Section */}
          <div className="flex items-center gap-4 p-4 mt-10 bg-gray-100 rounded-lg">
            {author?.profileImage ? (
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_API_URL
                }/${author.profileImage.replace(/\\/g, "/")}`}
                unoptimized={true}
                alt="Author"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-[80px] h-[80px] rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                No Image
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">About {author?.name}</h3>
              <p className="text-gray-600 text-sm">{author?.bio}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 sticky top-32 self-start space-y-10">
          {/* toc */}
          {blog?.showtoc && headings.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-12 border border-gray-200">
              <h3 className="text-xl font-bold mb-5 text-blue-800">
                Table of Contents
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-sm text-gray-800">
                {headings.map((heading) => (
                  <li className="cursor-pointer" key={heading.id}>
                    <button
                      onClick={() => {
                        const el = document.getElementById(heading.id);

                        // Remove previous highlights
                        document
                          .querySelectorAll("h1, h2, h3")
                          .forEach((h) =>
                            h.classList.remove("text-blue-600", "underline")
                          );

                        // Scroll & apply highlight
                        if (el) {
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });

                          el.classList.add("text-blue-600", "underline");
                        }
                      }}
                      className="text-left text-blue-600 underline hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Categories Section */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-blue-800 border-b pb-2">
              Blog Categories
            </h3>
            <ul className="flex flex-col gap-4">
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link
                    href={`/blog?category=${encodeURIComponent(
                      cat.toLowerCase()
                    )}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    {cat.charAt(0).toUpperCase() +
                      cat.slice(1).replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts Section */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-blue-800 border-b pb-2">
              Recent Posts
            </h3>
            <div className="flex flex-col gap-6">
              {recentBlogs.map((recent, index) => (
                <Link
                  href={`/blog/${recent.blogCategory.toLowerCase()}/${
                    recent.url_slug
                  }`}
                  key={index}
                  className="flex gap-4 items-center hover:bg-gray-100 p-2 rounded-md transition"
                >
                  {recent.blogImage ? (
                    <Image
                      src={`${
                        process.env.NEXT_PUBLIC_API_URL
                      }/${recent.blogImage.replace(/\\/g, "/")}`}
                      unoptimized
                      alt="Post Thumbnail"
                      width={80}
                      height={60}
                      className="rounded-md object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-[80px] h-[60px] rounded-md bg-gray-300 flex items-center justify-center text-gray-600 text-xs flex-shrink-0">
                      No Image
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-400">
                      {new Date(recent.publishDate).toLocaleDateString()}
                    </p>
                    <h4 className="text-sm font-semibold leading-tight text-gray-700 hover:text-blue-700 line-clamp-2">
                      {recent.blogName}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <CourseAccordion  faqs={blog.faqs}/>
    </>
  );
};

export default Blogdetails;
