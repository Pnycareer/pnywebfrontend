"use client";

import { useEffect, useState } from "react";
import { Play, Youtube } from "lucide-react";

const SEED_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "MERN Bootcamp Review — Maryam", channel: "SIT Alumni", date: "Oct 2025" },
  { id: "3JZ_D3ELwOQ", title: "UI/UX Journey — Zoya", channel: "SIT Alumni", date: "Oct 2025" },
  { id: "oHg5SJYRHA0", title: "From Zero to SEO Exec — Hassan", channel: "SIT Alumni", date: "Sep 2025" },
];

export default function VideoReviews() {
  const [videos, setVideos] = useState(SEED_VIDEOS);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 shadow-xl shadow-slate-200/60 sm:p-10">
      {/* gradient blobs (matching success stories) */}
      <div className="pointer-events-none absolute -top-24 -right-10 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-60 w-60 rounded-full bg-emerald-200/40 blur-3xl" aria-hidden="true" />

      {/* header */}
      <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
            <Youtube className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Video Reviews</h2>
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
            {/* thumbnail */}
            <a
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noreferrer"
              className="block"
              aria-label={v.title}
              title="Watch on YouTube"
            >
              <div className="relative">
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-white opacity-90 transition group-hover:bg-black/70">
                    <Play className="h-4 w-4" />
                    <span className="text-sm font-medium">Watch review</span>
                  </span>
                </div>
              </div>
            </a>

            {/* meta */}
            <div className="space-y-1 p-4">
              <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{v.title}</h3>
              <p className="text-sm text-slate-600">
                {v.channel} • {v.date}
              </p>

              <details className="mt-3 rounded-lg bg-slate-50/70 p-3 text-sm text-slate-700 hover:bg-slate-50">
                <summary className="cursor-pointer select-none list-none font-medium text-slate-800">
                  Preview in page
                </summary>
                <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
