"use client";

import React, { useMemo, useState, useEffect } from "react";
import CourseCard from "@/components/cards/CourseCard";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { InView } from "react-intersection-observer";

/* ---------- utils ---------- */
const toTitleCase = (s = "") =>
  s
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const normalize = (s = "") => s.toLowerCase().trim();

const CHUNK = 6; // how many to load per step
const INITIAL_CHUNK = 6; // first render per category

/* ---------- small UI bits ---------- */
const Empty = ({ title, subtitle }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
  </div>
);

const Badge = ({ children }) => (
  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
    {children}
  </span>
);

const SearchBar = ({ value, onChange, onClear }) => (
  <div className="sticky top-0 z-10 -mx-6 mb-8 bg-gradient-to-b from-white via-white to-transparent px-6 pt-4 pb-3">
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search categories or courses…"
        className="w-full rounded-xl border border-slate-300 bg-white/90 px-12 py-3 text-sm outline-none ring-0 transition focus:border-indigo-400"
        aria-label="Search categories or courses"
      />
      <svg
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
        />
      </svg>
      {value ? (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
          aria-label="Clear search"
          type="button"
        >
          Clear
        </button>
      ) : null}
    </div>
  </div>
);

/* ---------- skeleton card ---------- */
const CourseSkeleton = () => (
  <div className="min-h-[480px] rounded-2xl border border-white/30 bg-white/50 backdrop-blur-md">
    <Skeleton height={200} className="rounded-t-2xl" />
    <div className="p-6 space-y-3">
      <Skeleton height={24} width="70%" />
      <Skeleton count={2} height={16} />
      <Skeleton height={40} className="mt-6 rounded-lg" />
    </div>
  </div>
);

/* ---------- main component ---------- */
const AllCourses = ({ categories }) => {
  // ✅ Always call hooks — no early return above this line
  const safeCategories = Array.isArray(categories) ? categories : [];

  // debounced search
  const [rawQuery, setRawQuery] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setQuery(rawQuery), 250);
    return () => clearTimeout(t);
  }, [rawQuery]);

  // only allow courses with View_On_Web === true
  const visibleCategories = useMemo(
    () =>
      safeCategories.map((cat) => ({
        ...cat,
        courses: (cat.courses || []).filter((c) => c?.View_On_Web === true),
      })),
    [safeCategories]
  );

  // search: match category name or course name
  const searched = useMemo(() => {
    const q = normalize(query);
    if (!q) return visibleCategories;

    return visibleCategories
      .map((cat) => {
        const catMatch = normalize(cat?.category_Name).includes(q);
        const matchedCourses = (cat?.courses || []).filter((c) =>
          normalize(c?.course_Name).includes(q)
        );
        return catMatch ? { ...cat } : { ...cat, courses: matchedCourses };
      })
      .filter(
        (cat) =>
          (cat?.courses?.length || 0) > 0 ||
          normalize(cat?.category_Name).includes(q)
      );
  }, [visibleCategories, query]);

  // visible counts per category (reset on search change)
  const [visibleCounts, setVisibleCounts] = useState({});
  useEffect(() => {
    const init = {};
    for (const c of searched) {
      init[c._id] = Math.min(INITIAL_CHUNK, c?.courses?.length || 0);
    }
    setVisibleCounts(init);
  }, [searched]);

  // totals
  const totalCourses = useMemo(
    () => searched.reduce((acc, c) => acc + (c?.courses?.length || 0), 0),
    [searched]
  );
  const shownCourses = useMemo(
    () =>
      searched.reduce(
        (acc, c) =>
          acc + Math.min(visibleCounts[c._id] || 0, c?.courses?.length || 0),
        0
      ),
    [searched, visibleCounts]
  );

  // loader for each category (triggered by InView)
  const handleLoadMore = (catId, total) => {
    setVisibleCounts((prev) => {
      const current = prev[catId] || 0;
      if (current >= total) return prev;
      const next = Math.min(current + CHUNK, total);
      return { ...prev, [catId]: next };
    });
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* If no categories at all */}
      {!safeCategories.length ? (
        <Empty
          title="No categories available."
          subtitle="Please check back later."
        />
      ) : (
        <>
          {/* Header */}
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
              <p className="sr-only">
                Showing {shownCourses} of {totalCourses} courses
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge>{searched.length} Categories</Badge>
              <Badge>
                {searched.reduce(
                  (acc, c) => acc + (c?.courses?.length || 0),
                  0
                )}{" "}
                Courses
              </Badge>
            </div>
          </div>

          {/* Search */}
          <SearchBar
            value={rawQuery}
            onChange={setRawQuery}
            onClear={() => setRawQuery("")}
          />

          {/* Results */}
          {!searched.length ? (
            <Empty
              title="No results found"
              subtitle="Try a different keyword or clear the search."
            />
          ) : (
            <div className="space-y-12">
              {searched.map((cat, idx) => {
                const total = cat.courses?.length || 0;
                const visible = Math.min(visibleCounts[cat._id] || 0, total);
                const hasMore = visible < total;

                return (
                  <motion.section
                    key={cat._id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                  >
                    {/* Category header */}
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-indigo-700">
                          {toTitleCase(cat.category_Name)}
                        </h2>
                        {cat.category_Description ? (
                          <p className="mt-2 max-w-3xl text-base text-slate-600">
                            {cat.category_Description}
                          </p>
                        ) : null}
                      </div>
                      <Badge>{total} Courses</Badge>
                    </div>

                    {/* Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {cat.courses.slice(0, visible).map((c) => (
                        <CourseCard
                          key={c._id}
                          name={c.course_Name}
                          image={c.course_Image}
                          urlslug={c.url_Slug}
                          shortdescription={c.Short_Description}
                        />
                      ))}

                      {/* Skeleton shimmer for the next chunk */}
                      {hasMore &&
                        Array.from({
                          length: Math.min(CHUNK, total - visible),
                        }).map((_, i) => (
                          <CourseSkeleton key={`sk-${cat._id}-${i}`} />
                        ))}
                    </div>

                    {/* Sentinel */}
                    {hasMore && (
                      <InView
                        as="div"
                        onChange={(inView) => {
                          if (inView) handleLoadMore(cat._id, total);
                        }}
                        threshold={0}
                        rootMargin="400px 0px 400px 0px"
                        className="h-6"
                      />
                    )}
                  </motion.section>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllCourses;
