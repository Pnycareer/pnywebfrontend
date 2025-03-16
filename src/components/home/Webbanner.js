import React, { Suspense } from "react";
import Image from "next/image";

// Fetch Banner Data (Server-side)
const fetchBanner = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/webbanner/get`, {
      cache: "force-cache", // Ensures fresh data on every request
    });

    if (!res.ok) throw new Error("Failed to fetch banner");
    
    const data = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching banner:", error);
    return null;
  }
};

// Web Banner Component
const Webbanner = async () => {
  const banner = await fetchBanner();

  if (!banner) {
    return <div className="text-center text-gray-500">No active banner available</div>;
  }

  return (
    <div className="web-banner mx-auto">
      <Image 
        src={`${process.env.NEXT_PUBLIC_API_URL}${banner.imageUrl}`} 
        alt="Web Banner"
        width={1920} 
        height={600}
        priority
        className="w-full h-auto object-cover rounded-lg shadow-md"
      />
    </div>
  );
};

// Wrap Webbanner with Suspense
const WebbannerWrapper = () => (
  <Suspense fallback={<div className="text-center text-gray-500">Loading banner...</div>}>
    <Webbanner />
  </Suspense>
);

export default WebbannerWrapper;
