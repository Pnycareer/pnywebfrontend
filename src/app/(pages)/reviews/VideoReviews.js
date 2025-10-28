"use client";

import { useState } from "react";
import { Play, Youtube } from "lucide-react";

const SEED_VIDEOS = [
  {
    id: "I5yQ9koVrts",
    title: "Students Review - Graphic Designing Course — Amna",
    channel: "PNY Trainings",
    date: "Oct 2025",
  },
  {
    id: "HoSuDshbtUc",
    title: "Student Review - Web Development with AI — Ali Hamza",
    channel: "PNY Trainings",
    date: "Oct 2025",
  },
  {
    id: "fd8VhXLouyY",
    title:
      "Student Review - From Small Steps to Big Earnings with E-Commerce Growth — M. Kaif",
    channel: "PNY Trainings",
    date: "Oct 2025",
  },
  {
    id: "y4Bp3vj5CXs",
    title: "Students Review - Cyber Security Course — Yasir Bilal",
    channel: "PNY Trainings",
    date: "Oct 2025",
  },
  {
    id: "u1kwTk99QsM",
    title: "Student Reviews - Social Media Marketing Course — Muhammad Sheraz",
    channel: "PNY Trainings",
    date: "Oct 2025",
  },
];

export default function VideoReviews() {
  const [videos, setVideos] = useState(SEED_VIDEOS);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 shadow-xl shadow-slate-200/60 sm:p-10">
      {/* gradient blobs */}
      <div
        className="pointer-events-none absolute -top-24 -right-10 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-12 h-60 w-60 rounded-full bg-emerald-200/40 blur-3xl"
        aria-hidden="true"
      />

      {/* header */}
      <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
            <Youtube className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Video Reviews
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Testimonials from real alumni.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm backdrop-blur">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            {videos.length}
          </span>
          Featured video reviews
        </div>
      </div>

      {/* grid */}
      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <article
            key={`${v.id}-${i}`}
            className="group overflow-hidden rounded-2xl bg-white/70 shadow-md ring-1 ring-black/5 transition hover:shadow-lg"
          >
            {/* thumbnail or video */}
            <div
              onClick={() =>
                setActiveVideo(activeVideo === v.id ? null : v.id)
              }
              className="relative cursor-pointer"
              aria-label={v.title}
              title="Play video"
            >
              {activeVideo === v.id ? (
                <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              ) : (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* New YouTube-style play button */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 h-16 w-16 rounded-full bg-black/40 blur-md group-hover:bg-red-600/60 transition duration-300"></div>
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-400/40 transition-all duration-300 group-hover:scale-110">
                        <Play className="h-7 w-7 text-white ml-[2px]" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* meta */}
            <div className="space-y-1 p-4">
              <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
                {v.title}
              </h3>
              <p className="text-sm text-slate-600">
                {v.channel} • {v.date}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
