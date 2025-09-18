"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance";

export default function TrainerCertification() {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    axiosInstance
      .get("/api/certification")
      .then((res) => {
        if (mounted) setData(res.data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch certification:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No content found.</p>;

  const title = data?.whyItMatters?.title || "Why it matters";
  const desc = data?.whyItMatters?.description || "";
  const points = Array.isArray(data?.whyItMatters?.points) ? data.whyItMatters.points : [];

  return (
    <section className="relative w-full py-16 sm:py-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-white" />

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-center"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          Our Trainers Are Certified From
        </motion.h2>

        {/* Intro */}
        <div
          className="mt-6 text-base sm:text-lg leading-relaxed text-slate-700"
          dangerouslySetInnerHTML={{ __html: data?.intro || "" }}
        />

        {/* Why it matters (dynamic) */}
        <div className="mx-auto mt-8 sm:mt-10 rounded-2xl bg-white/70 backdrop-blur border border-slate-200/70 shadow p-6 sm:p-8">
          <div className="mt-0 rounded-xl border border-slate-200 bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-80 bg-[radial-gradient(900px_300px_at_100%_-10%,rgba(59,130,246,0.15),transparent)]" />
            <div className="relative p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

              {desc && (
                <div
                  className="mt-2 text-sm text-slate-700"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              )}

              {points.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {points.map((pt, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Extra Content (collapsible) */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="extra"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="prose prose-slate max-w-none mt-6">
                  <div dangerouslySetInnerHTML={{ __html: data?.extraContent || "" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
