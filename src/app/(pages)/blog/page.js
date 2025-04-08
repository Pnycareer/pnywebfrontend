"use client";

import Image from "next/image";

export default function BlogPage() {
  return (
    <div className="container mx-auto p-4">
      {/* Blog Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 rounded-lg">
        {/* Left Content */}
        <div className="flex-1 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Certified Full Stack Web Development with Advanced AI
          </h1>
          <p className="text-lg mb-6">
            Take your career as a web developer to the next level with this
            Full-Stack Web Developer Master's Program, where you’ll become an
            expert at the front and back-end JavaScript technologies of the most
            popular MEAN Stack.
          </p>

          <p className="text-sm text-gray-400">Publish date: 2025-02-11</p>
        </div>

        {/* Right Video */}
        <div className="flex-1">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="http://localhost:8080/uploads/images/blogs/1744091825769-frontend-page-1711967300-sms.jpg"
              unoptimized={true}
              alt="Author"
              width={800}
              height={80}
            />
          </div>
        </div>
      </div>

      {/* Main Content and Sidebar */}
      <div className="flex flex-col lg:flex-row gap-10 mt-10 md:px-5">
        {/* Blog Main Content */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
            Discover the Best Course For Online Earning in Pakistan
          </h2>
          <p className="text-gray-700 mb-4">
            As jobs are limited in Pakistan, everyone has found jobs and wants
            to generate passive income, but they need a skill first to earn
            money. If you are a skilled person, online earning in Pakistan is a
            very easiest way to earn money from the comfort of your home.
          </p>
          <p className="text-gray-700 mb-4">
            Numerous online platforms offer courses that help you develop skills
            for success in the digital era. These online courses help you earn
            online from the comfort of your home.
          </p>
          <p className="text-gray-700 mb-4">
            This guide will help you through some of the best courses for online
            earning in Pakistan and also help you choose the right course based
            on your interests and goals. Let's discover the top courses that can
            help you start earning from the comfort of your home.
          </p>
          <p className="text-gray-700 mb-6">
            Many platforms and online courses are available that help you
            develop new skills and succeed in the digital world. These online
            courses help you earn online from the comfort of your home. This
            guide will help you through some of the best courses for online
            earning in Pakistan and also help you choose the right courses based
            on your interests and goals.
          </p>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              "Blue",
              "Great Tag",
              "Green",
              "New Tag",
              "Red",
              "Something",
              "White",
            ].map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Social Share Section */}
          <div className="flex items-center gap-4 mb-10">
            <p className="text-gray-700 font-semibold">Share:</p>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 text-blue-600 hover:text-blue-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54V12h2.54v-1.704c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.772-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 text-blue-400 hover:text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1a9.86 9.86 0 01-3.13 1.2A4.92 4.92 0 0016.5 0c-2.5 0-4.5 2-4.5 4.5 0 .35.04.69.1 1A13.06 13.06 0 013 1.6a4.52 4.52 0 001.38 6.01A4.42 4.42 0 012 7v.05a4.5 4.5 0 003.6 4.41A4.52 4.52 0 012 11.5a4.52 4.52 0 004.22 3.14 9.05 9.05 0 01-6.65 1.86A13 13 0 007 20c8 0 12.5-6.64 12.5-12.4 0-.19-.01-.37-.02-.55A8.96 8.96 0 0023 3z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 text-blue-700 hover:text-blue-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-1 0-1.7-.7-1.7-1.7s.7-1.7 1.7-1.7 1.7.7 1.7 1.7-.8 1.7-1.7 1.7zm13.5 11.3h-3v-5.6c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.7-1.8 1.4-.1.3-.1.7-.1 1.1v5.4h-3v-10h3v1.3c.4-.7 1.1-1.7 2.8-1.7 2.1 0 3.6 1.4 3.6 4.5v6z" />
              </svg>
            </a>
          </div>

          {/* Author Section */}
          <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
            <Image
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
              unoptimized={true}
              alt="Author"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">About Ateeq Rafeeq</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                at velit in neque efficitur vehicula.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3">
          <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4].map((post) => (
              <div key={post} className="flex gap-4 items-center">
                <Image
                  src="http://localhost:8080/uploads/images/blogs/1744091825769-frontend-page-1711967300-sms.jpg"
                  unoptimized={true}
                  alt="Post Thumbnail"
                  width={80}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="text-sm text-gray-500">August 10, 2023</p>
                  <h4 className="text-md font-semibold leading-tight">
                    Take Your Career Next Level
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
