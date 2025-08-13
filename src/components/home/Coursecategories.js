"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";

// Local images
import diploma from "@/assets/homecategories/diploma.jpg";
import marketing from "@/assets/homecategories/marketing.jpg";

// Image mapping
const categoryImages = {
  "One Year Diploma": diploma.src,
  Marketing: marketing.src,
  "Art & Design":
    "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=1400&auto=format&fit=crop",
  "Business & Accounts":
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop",
  Multimedia:
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1400&auto=format&fit=crop",
  "Amazon Courses":
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
  "Cyber Security & Networking":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
  "Ecommerce & Online Business":
    "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=1400&auto=format&fit=crop",
  "IT & Software":
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop",
  Language:
    "https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?q=80&w=1400&auto=format&fit=crop",
  "Manual Testing Category":
    "https://images.unsplash.com/photo-1532619675605-1ede6cfac87f?q=80&w=1400&auto=format&fit=crop",
  "Graphic Designer":
    "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1400&auto=format&fit=crop",
};

// Description mapping
const categoryDescriptions = {
  "One Year Diploma": "Master core concepts in just 1 year.",
  Marketing: "Learn modern marketing & branding strategies.",
  "Art & Design": "Unlock your creative skills in digital design.",
  "Business & Accounts": "Build a solid foundation in business finance.",
  Multimedia: "From video editing to animation — all in one place.",
  "Amazon Courses": "Crack the Amazon ecosystem for selling success.",
  "Cyber Security & Networking": "Secure networks, defend data. Be the shield.",
  "Ecommerce & Online Business": "Launch & grow your online business confidently.",
  "IT & Software": "Master tech tools powering the digital world.",
  Language: "Become fluent in global languages.",
  "Manual Testing Category": "Test smarter with manual QA techniques.",
  "Graphic Designer": "Turn ideas into stunning visuals.",
};

const Coursecategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/categories")
      .then((res) => {
        const filtered = res.data.filter((cat) => cat.viewonweb).slice(0, 8);
        setCategories(filtered);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 text-center">
        <p className="text-lg">Loading categories...</p>
      </section>
    );
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-100 mt-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <h1 className="text-4xl font-bold mb-4 mx-auto">
            Categories
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
          {categories.map((item) => (
            <Link
              key={item._id}
              href={`/courses/${item.url_Slug}`}
              className="group flex flex-col h-full"
            >
              <article className="flex flex-col h-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-black/5 backdrop-blur transition hover:shadow-xl dark:bg-zinc-900/50 dark:ring-white/5">
                <div className="relative h-48 sm:h-44 lg:h-40">
                  <img
                    src={
                      categoryImages[item.Category_Name] ||
                      "https://via.placeholder.com/400x200"
                    }
                    alt={item.Category_Name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>

                <div className="space-y-2 p-4 sm:p-5 h-[120px] flex flex-col justify-between">
                  <h3 className="text-base font-semibold leading-snug sm:text-lg line-clamp-1">
                    {item.Category_Name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {categoryDescriptions[item.Category_Name] ||
                      "Explore this course category."}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coursecategories;
