"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop/Scrolltotop";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Loader from "@/components/loader/Loader";

const Blogdetails = ({ blog }) => {
  const {
    blogName,
    blogDescription,
    shortDescription,
    publishDate,
    socialLinks,
    blogImage,
    author,
    tags,
  } = blog;

  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
        const data = await res.json();

        // Flatten blogs with their category
        const allBlogs = data.flatMap((category) =>
          category.blogs.map((blog) => ({
            ...blog,
            blogCategory: category.blogCategory, // 🛑 Attach blogCategory here
          }))
        );

        const shuffledBlogs = allBlogs.sort(() => 0.5 - Math.random());
        const topSixBlogs = shuffledBlogs.slice(0, 6);

        setRecentBlogs(topSixBlogs);
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
        <Loader /> {/* ✅ Show your loader component during loading */}
      </div>
    );
  }

  console.log(recentBlogs, "ra");

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
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${blogImage.replace(
                  /\\/g,
                  "/"
                )}`}
                unoptimized={true}
                alt="Blog Main"
                width={800}
                height={500}
              />
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
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {socialLinks && (
              <div className="flex gap-4 mt-6">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-2xl"
                  >
                    <FaFacebookF />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600 text-2xl"
                  >
                    <FaTwitter />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 text-2xl"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700 text-2xl"
                  >
                    <FaInstagram />
                  </a>
                )}
              </div>
            )}

            {/* Author Section */}
            <div className="flex items-center gap-4 p-4 mt-10 bg-gray-100 rounded-lg">
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_API_URL
                }/${author?.profileImage.replace(/\\/g, "/")}`}
                unoptimized={true}
                alt="Author"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">About {author?.name}</h3>
                <p className="text-gray-600 text-sm">{author?.bio}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 sticky top-24 self-start">
            <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
            <div className="flex flex-col gap-6">
              {recentBlogs.map((recent, index) => (
                <Link
                  href={`/blog/${recent.blogCategory.toLowerCase()}/${
                    recent.url_slug
                  }`}
                  key={index}
                  className="flex gap-4 items-center hover:bg-gray-100 p-2 rounded-md transition"
                >
                  <Image
                    src={`${
                      process.env.NEXT_PUBLIC_API_URL
                    }/${recent.blogImage.replace(/\\/g, "/")}`}
                    unoptimized={true}
                    alt="Post Thumbnail"
                    width={80}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-500">
                      {new Date(recent.publishDate).toLocaleDateString()}
                    </p>
                    <h4 className="text-md font-semibold leading-tight">
                      {recent.blogName}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Blogdetails;
