"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop/Scrolltotop";
import Loader from "@/components/loader/Loader";
import SocialShare from "@/components/SocialShare/SocialShare";
import { usePathname } from "next/navigation";

const Blogdetails = ({ blog }) => {
  const {
    blogName,
    blogDescription,
    shortDescription,
    publishDate,
    blogImage,
    author,
    tags,
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
        const data = await res.json();

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="container mx-auto p-4">
        {/* Blog Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 rounded-lg">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {blogName}
            </h1>
            <p className="text-lg mb-6">{shortDescription}</p>
            <p className="text-sm text-gray-400">
              Publish date: {new Date(publishDate).toLocaleDateString()}
            </p>
          </div>

          {/* Right Image */}
          <div className="flex-1">
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
          </div>
        </div>

        {/* Main Content and Sidebar */}
        <div className="flex flex-col lg:flex-row gap-10 mt-10 md:px-5">
          {/* Blog Main Content */}
          <div className="flex-1">
            {/* Blog Description */}
            <div
              className="prose prose-lg max-w-full mb-10 text-justify
              [&>h1]:text-[34px] [&>h1]:font-semibold
              [&>h2]:text-[30px] [&>h2]:font-medium
              [&>h3]:text-[24px] [&>h3]:font-medium
              [&>a]:cursor-pointer
              [&>p]:mt-5 
              [&>ul]:list-disc [&>ul]:pl-6
              [&>ol]:list-decimal [&>ol]:pl-6
              [&>ul>li]:mt-2
              [&>ol>li]:mt-2"
              dangerouslySetInnerHTML={{ __html: blogDescription }}
            ></div>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2 mb-6">
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
          <aside className="w-full lg:w-1/3 sticky top-24 self-start space-y-10">
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
      </div>
    </>
  );
};

export default Blogdetails;
