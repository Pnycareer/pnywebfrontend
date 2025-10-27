"use client";

import React, { useState, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const InstructorCard = ({ name, photo, otherInfo }) => {
  const [showProfile, setShowProfile] = useState(false);
  const profileId = useId();

  const displayName =
    typeof name === "string" && name.trim().length > 0
      ? name.trim()
      : "Pny Instructor";
  const friendlyName = displayName.split(" ")[0] || "this expert";

  const openProfile = useCallback(() => setShowProfile(true), []);
  const closeProfile = useCallback(() => setShowProfile(false), []);
  const toggleProfile = useCallback((event) => {
    event?.stopPropagation();
    setShowProfile((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleProfile(event);
      }
      if (event.key === "Escape") {
        closeProfile();
      }
    },
    [toggleProfile, closeProfile]
  );

  return (
    <motion.article
      className={[
        "group relative flex w-full max-w-xs cursor-pointer select-none flex-col overflow-hidden outline-none",
        "rounded-3xl border border-blue-200/70 bg-white/70 p-[1px] backdrop-blur-xl",
        "shadow-[0_32px_90px_-50px_rgba(37,99,235,0.48)] transition-transform duration-300",
        "hover:-translate-y-1 hover:shadow-[0_48px_120px_-60px_rgba(59,130,246,0.58)]",
        "focus-visible:-translate-y-1 focus-visible:shadow-[0_48px_120px_-60px_rgba(59,130,246,0.58)]",
      ].join(" ")}
      onMouseEnter={openProfile}
      onMouseLeave={closeProfile}
      onFocus={openProfile}
      onBlur={closeProfile}
      onClick={toggleProfile}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={showProfile}
      aria-controls={`${profileId}-details`}
      whileTap={{ scale: 0.97 }}
    >
      <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-6 h-24 w-24 rounded-full bg-blue-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 bottom-10 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl"
      />

      <div className="relative flex h-full flex-col items-center gap-6 rounded-[calc(1.5rem-3px)] bg-gradient-to-br from-white via-white to-blue-50/90 px-6 pb-10 pt-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-600 shadow-sm shadow-blue-100/60">
          <span className="h-1 w-1 rounded-full bg-blue-500" />
          Core faculty
        </div>

        <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-blue-100 bg-white shadow-2xl shadow-blue-200/40">
          <Image
            src={photo}
            alt={displayName}
            width={120}
            height={120}
            className="h-24 w-24 rounded-full object-cover"
            unoptimized
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-white/70"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {displayName}
          </h3>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-blue-600">
            Lead Instructor
          </p>
        </div>

        <p className="max-w-[18rem] text-sm leading-relaxed text-slate-500">
          Get a glimpse of how {friendlyName} coaches squads to launch
          portfolio-ready work with confidence.
        </p>

        <div className="flex w-full flex-wrap justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-blue-500/90">
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-200/60 bg-blue-100/80 px-3 py-1">
            mentorship
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-200/60 bg-blue-100/70 px-3 py-1">
            studio labs
          </span>
        </div>
      </div>

      <AnimatePresence>
        {showProfile && (
          <motion.div
            id={`${profileId}-details`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className={[
              "absolute inset-0 z-20 flex flex-col justify-between rounded-3xl border border-blue-200/70",
              "bg-white/95 px-6 py-7 text-left text-slate-700 shadow-2xl shadow-blue-200/70 backdrop-blur-xl",
            ].join(" ")}
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                Instructor profile
              </p>
              <h4 className="text-lg font-semibold text-slate-900">
                {displayName}
              </h4>
              <p className="max-h-[300px] overflow-y-auto pr-1 text-sm leading-relaxed text-slate-600">
                {otherInfo || "No additional information available."}
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-500">
              <span>Tap to close</span>
              <span className="inline-flex items-center gap-2 text-blue-400">
                Insight
                <span className="h-1 w-1 rounded-full bg-blue-400" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default InstructorCard;
