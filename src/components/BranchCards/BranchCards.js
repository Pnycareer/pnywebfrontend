"use client";
import React from "react";
import Image from "next/image";

const BranchCard = ({ branch }) => {
  return (
    <div className="bg-white rounded shadow p-4 max-w-sm">
      <div className="relative h-48 w-full">
        <Image
          src={
            branch.image?.src ||
            branch.image ||
            "https://via.placeholder.com/600x400?text=PNY+Branch"
          }
          alt={branch.title || "Branch image"}
          fill
          unoptimized
          className="rounded object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{branch.title}</h3>
      <p className="text-sm text-gray-700">{branch.description}</p>

      {branch.phone && (
        <p className="text-blue-600 text-sm mt-1">Phone: {branch.phone}</p>
      )}
      {branch.phone1 && (
        <p className="text-blue-600 text-sm mt-1">Phone: {branch.phone1}</p>
      )}

      <div className="mt-2 flex justify-between items-center text-sm">
        {branch.link && (
          <a href={branch.link} target="_blank" className="text-blue-600">
            Visit Us
          </a>
        )}
        {branch.Map && (
          <a href={branch.Map} target="_blank" className="text-red-500">
            Map
          </a>
        )}
      </div>
    </div>
  );
};

export default BranchCard;
