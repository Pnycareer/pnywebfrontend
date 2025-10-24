"use client";

import { useMemo } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Building2,
  CalendarDays,
  Share2,
  BadgeCheck,
  IdCard,
  Briefcase,
} from "lucide-react";

export default function SuccessStoryCard({ s }) {
  const shareText = useMemo(
    () =>
      `${s.name} - ${s.title}\nBatch: ${s.batch}\nCourse: ${s.course}\nType: ${s.type}\nHiring Company: ${s.company}\nJoining Date: ${s.date}`,
    [s]
  );

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${s.name} - Success Story`,
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert("Copied to clipboard!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white/85 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      {/* Hover gradient effect */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-100/60 via-transparent to-emerald-100/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Avatar */}
      <div className="relative flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0">
          <Image
            src={s.avatar || "/default-avatar.png"}
            alt={s.name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border-2 border-sky-200 object-cover shadow-sm"
            unoptimized
          />
          <span className="absolute -bottom-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-white text-[10px] font-bold">
            ✓
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-900">{s.name}</h3>
          <p className="text-xs text-slate-500">{s.title}</p>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
          <BadgeCheck className="h-4 w-4" />
          {s.type}
        </span>
      </div>

      {/* Batch */}
      <p className="relative mt-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
        <IdCard className="h-4 w-4 text-slate-500" />
        {s.batch}
      </p>

      {/* Details */}
      <ul className="relative mt-4 space-y-3 text-sm text-slate-700">
        <li className="flex items-start gap-3">
          <GraduationCap className="mt-0.5 h-5 w-5 flex-none text-slate-500" />
          <span>
            <span className="font-medium">Course:</span> {s.course}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Building2 className="mt-0.5 h-5 w-5 flex-none text-slate-500" />
          <span>
            <span className="font-medium">Hiring Company:</span> {s.company}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-5 w-5 flex-none text-slate-500" />
          <span>
            <span className="font-medium">Joining Date:</span> {s.date}
          </span>
        </li>
      </ul>

      {/* Share button */}
      {/* <div className="relative mt-6 flex justify-end">
        <button
          onClick={onShare}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-sky-600 hover:to-emerald-600 active:scale-95"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div> */}
    </article>
  );
}
