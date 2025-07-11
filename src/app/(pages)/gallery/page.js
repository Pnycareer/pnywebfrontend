import React from 'react';
import Gallery from './Gallaery';
import axios from '@/utils/axiosInstance';

const getGalleries = async () => {
  try {
    const res = await axios.get(
      `/api/v1/gallery`,
      {
        headers: {
          // Optional: mimic fetch cache control if needed
          "Cache-Control": "no-store",
        },
      }
    );
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
      <Gallery galleries={galleries} />
    </div>
  );
};

export default Page;
