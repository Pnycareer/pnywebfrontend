"use client";

import { Sparkles } from "lucide-react";
import SuccessStoryCard from "@/components/successstories/SuccessStoryCard";

const FAKE_STORIES = [
  {
    name: "Maya Rahim",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    batch: "Batch #8",
    course: "GD",
    title: "Brand Designer (Internship)",
    type: "Internship",
    company: "KOT Enterprises Pvt Ltd",
    date: "03-Oct-2025",
  },
  {
    name: "Zoya Kamal",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    batch: "Batch #9",
    course: "GD BOOTCAMP",
    title: "Graphic Design Intern",
    type: "Internship",
    company: "Creative Sight Media",
    date: "03-Oct-2025",
  },
  {
    name: "Ibrahim Saeed",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    batch: "Batch #39",
    course: "Digital Media Marketing Bootcamp",
    title:
      "Started own brand and generated sales of 14 lakhs in 1 month (Success Story)",
    type: "Job",
    company: "achievements",
    date: "01-Oct-2025",
  },
  {
    name: "Noor Aftab",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    batch: "Batch #33",
    course: "Full-Stack Bootcamp",
    title: "Junior MERN Developer",
    type: "Job",
    company: "PixelForge Labs",
    date: "28-Sep-2025",
  },
  {
    name: "Ayesha Tariq",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    batch: "Batch #21",
    course: "UI/UX Bootcamp",
    title: "Product Designer",
    type: "Job",
    company: "NexDesign Studio",
    date: "24-Sep-2025",
  },
  {
    name: "Hassan Malik",
    avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
    batch: "Batch #14",
    course: "SEO Bootcamp",
    title: "SEO Executive",
    type: "Job",
    company: "Searchify",
    date: "19-Sep-2025",
  },
];


export default function SuccessStories() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 shadow-xl shadow-slate-200/60 sm:p-10">
      <div
        className="pointer-events-none absolute -top-24 -right-10 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-12 h-60 w-60 rounded-full bg-emerald-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Success Stories
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Real journeys from our alumni community making their mark.
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm backdrop-blur">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            {FAKE_STORIES.length}
          </span>
          Featured alumni wins this month
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FAKE_STORIES.map((s, i) => (
          <SuccessStoryCard key={i} s={s} />
        ))}
      </div>
    </section>
  );
}
