import React from "react";
import Gallery from "./Gallaery";
import axios from "@/utils/axiosInstance";
import Metadata from "@/components/Meta/Metadata";

const getGalleries = async () => {
  try {
    const res = await axios.get(`/api/v1/gallery`, {
      headers: {
        // Always force fresh response, never reuse cached copy
        "Cache-Control": "no-cache, no-store, must-revalidate",
        // Proxies shouldn’t serve cached responses
        Pragma: "no-cache",
        // Expire immediately
        Expires: "0",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch galleries:", err);
    throw new Error("Failed to fetch galleries");
  }
};

const Page = async () => {
  const galleries = await getGalleries();

  return (
    <div>
      <Metadata
        title="Gallery – Moments & Milestones at PNY Trainings"
        description="Explore PNY Trainings gallery showcasing our convocation, conferences, project displays, MoU signings, and branch highlights across Pakistan
"
        canonicalUrl="https://www.pnytrainings.com/gallery"
      />
      <Gallery galleries={galleries} />
    </div>
  );
};

export default Page;
