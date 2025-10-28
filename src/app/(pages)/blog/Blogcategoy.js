"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderSection from "@/components/HeaderSection/Headersection";
import ScrollToTop from "@/components/ScrollToTop/Scrolltotop";
import axios from "@/utils/axiosInstance"; // uses your configured baseURL, headers, etc.

const PAGE_SIZE = 12;

export default function BlogCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state
  const urlCategory = searchParams.get("category") || "all";
  const q = searchParams.get("q") || "";

  // UI state
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [categories, setCategories] = useState(["all"]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  // when URL filters change, reset and refetch
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setItems([]);
    setPage(1);
  }, [urlCategory, q]);

  useEffect(() => {
    let cancelled = false;

    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/blogs", {
          params: {
            page,
            limit: PAGE_SIZE,
            category: selectedCategory,
            q,
            inviewweb: true, // only show blogs allowed on web
          },
          headers: { "Cache-Control": "no-store" }, // bypass any old caches
        });

        if (cancelled) return;

        const { items: newItems = [], pagination = {}, categories: serverCats = [] } = res.data || {};
        if (Array.isArray(serverCats) && serverCats.length) {
          setCategories(serverCats);
        }
        if (pagination?.totalPages) {
          setTotalPages(pagination.totalPages);
        }

        setItems(prev => (page === 1 ? newItems : [...prev, ...newItems]));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setFirstLoad(false);
        }
      }
    };

    fetchPage();
    return () => { cancelled = true; };
  }, [page, selectedCategory, q]);

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") params.delete("category");
    else params.set("category", category);
    // reset q when changing category? up to you:
    // params.delete("q");
    router.push(`/blog?${params.toString()}`);
  };

  const hasMore = useMemo(() => page < totalPages, [page, totalPages]);

  return (
    <>
      {/* Filters inside a text-mode HeaderSection (no image) */}
      <HeaderSection
        pagetitle="Browse by Category"
        shortdescription="Filter by topic and load more as you scroll."
      >
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-black text-white hover:bg-blue-800"
                }`}
            >
              {category.charAt(0).toUpperCase() +
                category.slice(1).replace(/-/g, " ")}
            </button>
          ))}
        </div>
      </HeaderSection>

      <div className="container mx-auto p-6">
        {/* Grid */}
        {firstLoad && loading ? (
          <SkeletonGrid />
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${(blog.category || "general").toLowerCase()}/${(blog.url_slug || "").toLowerCase()}`}
                  className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${String(blog.blogImage || "").replace(/\\/g, "/")}`}
                    alt={blog.blogImageAlt || blog.blogName || "Blog image"}
                    width={400}
                    height={250}
                    unoptimized
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">
                      {blog.blogName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {blog.shortDescription}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Published on:{" "}
                      {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : "—"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load more */}
            <div className="mt-10 flex justify-center">
              {hasMore ? (
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loading}
                  className="rounded-full bg-blue-600 px-5 py-2.5 text-white font-medium shadow hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load more"}
                </button>
              ) : (
                <span className="text-sm text-gray-500">You’ve reached the end.</span>
              )}
            </div>
          </>
        )}
      </div>

      <ScrollToTop showAfter={240} />
    </>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white border rounded-xl overflow-hidden shadow-md">
          <div className="h-56 w-full bg-gray-200" />
          <div className="p-5 space-y-3">
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
