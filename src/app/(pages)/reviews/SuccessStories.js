"use client";

import { Sparkles } from "lucide-react";

// minimal reviews data
const REVIEWS = [
  {
    name: "Sania Arif",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    course: "Digital Marketing Course",
    rating: 5,
    review:
      "Excellent learning experience at PNY Trainings Arfa Karim Tower! Skilled instructors, practical content, and a motivating environment perfect for anyone looking to upgrade their skills. Highly recommended!",
  },
  {
    name: "Ahsan Ali",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    course: "SEO Course",
    rating: 5,
    review:
      "PNY’s SEO course was incredibly detailed and practical, providing in-depth knowledge of on-page, off-page, and technical SEO. It significantly improved my SEO expertise.",
  },
  {
    name: "Umair Mahmood",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    course: "Video Editing Course",
    rating: 5,
    review:
      "Video Editing Course completed from PNY Trainings. Overall experience was the best — highly recommended! Instructor and management are professional, and the course outline is advanced.",
  },
  {
    name: "Shamshad Ali",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    course: "Web Development Course",
    rating: 5,
    review:
      "I’ve successfully completed my Web Development certification from PNY Trainings. The course was well-structured, and the instructors were highly supportive and knowledgeable. The learning environment was motivating and helped me improve my practical skills.",
  },
  {
    name: "Shoaib Ghulam",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    course: "Graphic Designing Course",
    rating: 5,
    review:
      "Such an informative training of graphic designing — I learned a lot of technical ways of good designing. Highly recommended for graphic designing courses!",
  },
  {
    name: "Arslan Ahmad",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    course: "English Language Course",
    rating: 5,
    review:
      "I completed the English course at PNY Trainings, and the environment was truly amazing. Special thanks to the management and my teacher — one of the best institutes I’ve ever experienced. I truly admire and appreciate them.",
  },
]

// small star renderer (no TS, no libs)
function Stars({ rating = 0 }) {
  const total = 5;
  return (
    <div className="inline-flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < rating;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${filled ? "text-amber-500" : "text-slate-300"}`}
            aria-hidden="true"
          >
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              className={filled ? "fill-current" : "fill-current opacity-40"}
            />
          </svg>
        );
      })}
    </div>
  );
}

export default function SuccessStories() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 shadow-xl shadow-slate-200/60 sm:p-10">
      {/* soft blobs (keep same look as your other section) */}
      <div
        className="pointer-events-none absolute -top-24 -right-10 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-12 h-60 w-60 rounded-full bg-emerald-200/40 blur-3xl"
        aria-hidden="true"
      />

      {/* header — trimmed, no extra chips */}
      <div className="relative mb-8 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Student Reviews</h2>
          <p className="text-sm text-slate-600 sm:text-base">
            Real talk from alumni — 
          </p>
        </div>
      </div>

      {/* review cards */}
      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <article
            key={i}
            className="flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-white/70 p-5 shadow-md ring-1 ring-black/5 transition hover:shadow-lg"
          >
            {/* top: avatar + identity */}
            <div className="flex items-center gap-3">
              <img
                src={r.avatar}
                alt={`${r.name} avatar`}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-slate-200"
                loading="lazy"
              />
              <div>
                <h3 className="text-base font-semibold text-slate-900">{r.name}</h3>
                <p className="text-xs font-medium text-sky-700">{r.course}</p>
              </div>
            </div>

            {/* middle: centered review text */}
            <blockquote className="mt-4 flex-1">
              <p className="text-center text-sm leading-relaxed text-slate-700">
                “{r.review}”
              </p>
            </blockquote>

            {/* bottom: stars */}
            <div className="mt-5 flex justify-center">
              <Stars rating={r.rating} />
            </div>
          </article>
        ))}
      </div>
    </section>
    
  );
}
