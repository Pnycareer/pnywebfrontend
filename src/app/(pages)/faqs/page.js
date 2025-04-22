import React from "react";
import Faqs from "./Faqs";

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
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <Faqs data={faqData} />
    </div>
  );
};

export default Page;
