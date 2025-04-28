import React from 'react';
import Gallery from './Gallaery'
const getGalleries = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/gallery`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch galleries');
  }

  return res.json();
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
