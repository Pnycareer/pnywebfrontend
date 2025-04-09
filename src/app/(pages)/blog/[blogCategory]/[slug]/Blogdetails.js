"use client";
import React from "react";
import Image from "next/image";

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

  return (
    <>
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
                src={`${process.env.NEXT_PUBLIC_API_URL}/${blogImage.replace(/\\/g, "/")}`}
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
              className="prose prose-lg max-w-full mb-10 text-justify"
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

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600 text-2xl">
                <i className="fab fa-twitter"></i>
              </a>
              {/* Add more social icons if needed */}
            </div>

            {/* Author Section */}
            <div className="flex items-center gap-4 p-4 mt-10 bg-gray-100 rounded-lg">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${author?.profileImage.replace(/\\/g, "/")}`}
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
          <aside className="w-full lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
            <div className="flex flex-col gap-6">
              {/* Example Post */}
              <div className="flex gap-4 items-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${blogImage.replace(/\\/g, "/")}`}
                  unoptimized={true}
                  alt="Post Thumbnail"
                  width={80}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(publishDate).toLocaleDateString()}
                  </p>
                  <h4 className="text-md font-semibold leading-tight">
                    {blogName}
                  </h4>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Blogdetails;
