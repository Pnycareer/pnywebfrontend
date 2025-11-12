"use client";

import React from "react";
import { Users, GraduationCap, Award, BookOpen } from "lucide-react";

/* --- in-view hook (fires when element enters viewport) --- */
function useInView(options = { threshold: 0.3, root: null, rootMargin: "0px" }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    // guard for SSR and older browsers
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // if no observer, just mark visible so the animation still happens
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
const Stat = ({ Icon, value, label, start }) => {
  const count = useCountUp(value, 1200, start);
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm shadow-slate-200">
        <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
      </div>
      <div className="mt-4 text-4xl font-semibold text-emerald-600">{count}</div>
      <div className="mt-1 text-xs font-semibold tracking-[0.35em] text-slate-500">
        {label}
      </div>
    </div>
  );
};

const stats = [
  { Icon: Users, value: 890, label: "STUDENTS" },
  { Icon: GraduationCap, value: 670, label: "GRADUATE" },
  { Icon: Award, value: 160, label: "AWARD WINNING" },
  { Icon: BookOpen, value: 200, label: "FACULTIES" },
];

/* --- main section --- */
const Achievements = () => {
  // observe the whole section; trigger when ~30% visible
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className="bg-gradient-to-b from-white via-white to-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-10 w-1 rounded bg-emerald-500" aria-hidden />
            <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Our <span className="text-emerald-600">Achievement</span>
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          </p>
        </div>

        {/* stats row */}
        <div className="rounded-3xl border border-slate-100 bg-white/80 px-6 py-12 shadow-xl shadow-slate-100/70 backdrop-blur">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <Stat {...stat} start={inView} />
                {index < stats.length - 1 && (
                  <div className="flex w-full items-center justify-center" aria-hidden>
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
