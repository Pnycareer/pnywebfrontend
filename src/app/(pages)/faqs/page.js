import React from "react";
import Faqs from "./Faqs";
import Metadata from "@/components/Meta/Metadata";
import axiosInstance from "@/utils/axiosInstance";

export const metadata = {
  title: "FAQs – Your Questions Answered by PNY Trainings",
  description:
    "Find answers to common questions about courses, schedules, fees, and support at PNY Trainings. Get quick help and clarity in one place.",
  canonicalUrl: "https://www.pnytrainings.com/faqs",
};

const Page = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/faqs", {
      // force no-cache headers
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    const faqData = res.data;

    if (!faqData || faqData.length === 0) {
      return (
        <div className="p-8 text-center text-gray-600 text-xl">
          No FAQs found.
        </div>
      );
    }

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "1. What is the duration of the diploma program?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The diploma program is one year long, typically divided into two semesters or four quarters, depending on the institute's structure.",
          },
        },
        {
          "@type": "Question",
          name: "2. Who can apply for this diploma?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anyone with at least a matriculation (10th grade) or equivalent qualification can apply. Some diplomas may require intermediate (FA/FSc) or relevant background knowledge.",
          },
        },
        {
          "@type": "Question",
          name: "3. Is this diploma recognized?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our diploma is recognized by [Insert Recognition Body, e.g., TEVTA, NAVTTC, or a relevant accreditation]. A certificate is awarded upon successful completion.",
          },
        },
        {
          "@type": "Question",
          name: "4. What is the medium of instruction?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The medium of instruction is primarily [English/Urdu/Both], depending on the course and student needs.",
          },
        },
        {
          "@type": "Question",
          name: "5. Are there any age limits to enroll?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, there is no specific age limit. Anyone passionate about learning is welcome.",
          },
        },
        {
          "@type": "Question",
          name: "6. What skills will I learn?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You will learn industry-relevant, hands-on skills such as [e.g., web development, graphic design, digital marketing, etc.], depending on your chosen diploma.",
          },
        },
        {
          "@type": "Question",
          name: "7. Is there any practical training included?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all diploma programs include practical training, assignments, and real-world projects to enhance learning.",
          },
        },
        {
          "@type": "Question",
          name: "8. Can I do this diploma while working or studying?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we offer flexible class timings (morning/evening/weekend) to accommodate working professionals and students.",
          },
        },
        {
          "@type": "Question",
          name: "9. Are online classes available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, online classes are available for certain diplomas. Please check the specific course details.",
          },
        },
        {
          "@type": "Question",
          name: "10. What is the fee structure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The fee varies by program. Please contact our admissions office or visit [Your Website] for detailed information.",
          },
        },
        {
          "@type": "Question",
          name: "11. Will I get job assistance after completion??",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we offer career support including resume building, interview preparation, and job placement guidance.",
          },
        },
      ],
    };

    return (
      <>
        <Metadata
          title={metadata.title}
          description={metadata.description}
          canonicalUrl={metadata.canonicalUrl}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <Faqs data={faqData} />
      </>
    );
  } catch (error) {
    throw new Error("Failed to fetch FAQs: " + error.message);
  }
};

export default Page;
