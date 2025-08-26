// app/[slug]/loading.jsx
import React from "react";

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md p-4 w-full animate-pulse">
    <div className="h-48 bg-gray-200 rounded mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const SkeletonInstructor = () => (
  <div className="bg-gray-200 p-4 rounded-lg w-60 h-72 animate-pulse" />
);

const Loading = () => {
  return (
    <div className="p-6 space-y-12">
      {/* Skeleton for Header */}
      <div className="h-12 w-1/2 bg-gray-200 rounded animate-pulse mx-auto" />
      <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mx-auto" />

      {/* Skeleton for Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>

      {/* Skeleton for Instructors Section */}
      <div className="text-center mt-12 space-y-4">
        <div className="h-8 w-1/4 bg-gray-300 rounded mx-auto" />
        <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto" />
        <div className="flex justify-center gap-4 flex-wrap mt-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonInstructor key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
