"use client";

import React from "react";
import { Users, GraduationCap, Award, BookOpen } from "lucide-react";

/* --- in-view hook (fires when element enters viewport) --- */
function useInView(
  options = { threshold: 0.3, root: null, rootMargin: "0px" }
) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options.threshold, options.root, options.rootMargin]);

  return { ref, inView };
}

/* --- count-up hook that starts once when "start" flips true --- */
function useCountUp(target = 0, duration = 1200, start = false) {
  const [value, setValue] = React.useState(0);
  const startedRef = React.useRef(false);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!start || startedRef.current) return;

    startedRef.current = true;

    if (prefersReduced || duration <= 0) {
      setValue(target);
      return;
    }

    let startTs = null;
    const tick = (ts) => {
      if (startTs == null) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration]);

  return value;
}

/* --- single stat item --- */
const Stat = ({ Icon, value, label, start, suffix }) => {
  const count = useCountUp(value, 1200, start);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm shadow-slate-200">
        <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
      </div>

      <div className="mt-4 flex items-baseline gap-1 text-4xl font-semibold text-emerald-600">
        <span>{count}</span>
        {suffix && (
          <span className="text-2xl font-semibold text-emerald-600">
            {suffix}
          </span>
        )}
      </div>

      <div className="mt-1 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
        {label}
      </div>
    </div>
  );
};

const stats = [
  { Icon: Users, value: 100, suffix: "K", label: "Alumni" },
  {
    Icon: GraduationCap,
    value: 100,
    suffix: "+",
    label: "Professional Programs",
  },
  {
    Icon: Award,
    value: 300,
    suffix: "+",
    label: "Instructors",
  },
  {
    Icon: BookOpen,
    value: 100,
    suffix: "+",
    label: "MoU's Signed",
  },
];

/* --- main section --- */
const Achievements = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-white via-white to-slate-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-16 mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span
              className="h-10 w-1 rounded bg-emerald-500"
              aria-hidden="true"
            />
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Our <span className="text-emerald-600">Achievements</span>
            </h2>
          </div>

          <h3 className="text-lg font-semibold text-slate-700 sm:text-xl">
            Why Learn With Us
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            We offer industry-focused programs, expert instructors, and strong
            professional partnerships to help learners build practical skills,
            gain real-world experience, and succeed in their chosen fields.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white/80 px-6 py-5 shadow-xl shadow-slate-100/70 backdrop-blur">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <Stat {...stat} start={inView} />
                {index < stats.length - 1 && (
                  <div
                    className="flex w-full items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="hidden h-16 w-px rounded-full bg-slate-200 lg:block" />
                    <span className="block h-px w-16 rounded-full bg-slate-200 lg:hidden" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
