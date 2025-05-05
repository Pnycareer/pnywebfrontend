import React from "react";
import Faqs from "./Faqs";

export const metadata = {
  title: "FAQs",
  description:
    "Find answers to the most frequently asked questions about our courses, services, and platform. Get quick help and stay informed with our comprehensive FAQ section.",
};


const Page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/faqs`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch FAQs");

  const faqData = await res.json();

  if (!faqData || faqData.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600 text-xl">
        No FAQs found.
      </div>
    );
  }

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    
        <Faqs data={faqData} />
      
    </>
  );
};

export default Page;
