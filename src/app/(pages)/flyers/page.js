import React from "react";
import Flyers from "./Flyers";

export const metadata = {
  title: "Flyers",
  description:
    "Browse our collection of digital flyers featuring the latest promotions, product highlights, and announcements. Stay informed and explore what's new across our offerings.",
};

const Page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eflyer`, {
    cache: "no-store", // for SSR behavior
  });

  const flyersData = await res.json();

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <Flyers flyersData={flyersData} />
    </>
  );
};

export default Page;
