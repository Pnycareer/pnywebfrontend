// app/page.jsx or appropriate location
import React from "react";
import Fastbootcamp from "./Fastbootcamp";

const metadata = {
  title: "Make This Ramadan More Skillful With PNY | PNY Trainings",
  description:
    "Browse our collection of digital flyers featuring the latest promotions, product highlights, and announcements. Stay informed and explore what's new across our offerings.",
};

const Page = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/bootcamp-courses/get`,
    {
      next: {
        revalidate: 0, // No cache in Next.js 13+ (no-store)
      },
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );

  const data = await res.json();

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <Fastbootcamp bootcampCourses={data.data} />
    </>
  );
};

export default Page;
