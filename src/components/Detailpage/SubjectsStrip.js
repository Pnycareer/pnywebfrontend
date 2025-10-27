import React from "react";
import {
  BookOpen,
  Atom,
  FlaskConical,
  Microscope,
  Cpu,
  Calculator,
  Globe,
  Landmark,
  BookText,
  Banknote,
  Brain,
  SquareGanttChart,
  Sparkles,
} from "lucide-react";

// Title-case helper
const titleCase = (s) =>
  String(s || "")
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

// Pick an icon per subject keyword
const iconFor = (s) => {
  const k = String(s || "").toLowerCase();
  if (k.includes("physics")) return Atom;
  if (k.includes("chem")) return FlaskConical;
  if (k.includes("bio")) return Microscope;
  if (k.includes("computer") || k.includes("cs") || k.includes("it")) return Cpu;
  if (k.includes("math")) return Calculator;
  if (k.includes("geo")) return Globe;
  if (k.includes("pakistan")) return Landmark;
  if (k.includes("islam")) return BookText;
  if (k.includes("urdu") || k.includes("english")) return BookText;
  if (k.includes("econ")) return Banknote;
  if (k.includes("psych") || k.includes("cog")) return Brain;
  return SquareGanttChart;
};

const SubjectsList = ({
  title = "Subjects Covered",
  subtitle,
  shortdesc, // HTML string
  introductionTitle = "Introduction",
  subjects = [],
  columns = { base: 1, md: 2, lg: 3 },
  // NEW: pass course/category to flip the label
  category = "",
}) => {
  const list = Array.from(new Set((subjects || []).filter(Boolean)));
  const isCorporate = String(category).toLowerCase() === "corporate trainings";

  // nothing to show
  if (!shortdesc && !list.length) return null;

  // responsive grid
  const colCls = [
    columns?.base >= 1 ? `grid-cols-${columns.base}` : "grid-cols-1",
    columns?.md ? `md:grid-cols-${columns.md}` : "",
    columns?.lg ? `lg:grid-cols-${columns.lg}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-10 shadow-xl shadow-slate-200/60">
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] -z-10 rounded-full opacity-60 blur-3xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,165,233,0.28), rgba(56,189,248,0.22), rgba(45,212,191,0.18), rgba(16,185,129,0.12), transparent)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-44 -right-40 h-[700px] w-[700px] -z-10 rounded-full opacity-55 blur-3xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(125,211,252,0.26), rgba(56,189,248,0.18), rgba(34,197,94,0.14), rgba(74,222,128,0.1), transparent)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.18), rgba(45,212,191,0.14), rgba(14,165,233,0.1), transparent)",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {list.length ? (
          <>
            <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="min-w-0 space-y-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
                      {introductionTitle}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                      {title}
                    </h2>
                  </div>
                  {subtitle ? (
                    <p className="max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
                  ) : null}
                </div>
              </div>

              {/* 👇 this pill flips text based on category */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm backdrop-blur">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  {list.length}
                </span>
                {isCorporate ? "Key Topics in this training" : "Subjects in this module"}
              </div>
            </header>

            {shortdesc ? (
              <div
                className="mb-8 rounded-2xl border border-slate-100 bg-white/80 p-5 text-sm text-slate-700 shadow-sm backdrop-blur-sm"
                dangerouslySetInnerHTML={{ __html: shortdesc }}
              />
            ) : null}

            <ol className={`grid ${colCls} gap-4`} role="list">
              {list.map((subj, idx) => {
                const Icon = iconFor(subj);
                const num = idx + 1;
                return (
                  <li
                    key={`${subj}-${idx}`}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-100/40 via-transparent to-emerald-100/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-slate-600 shadow-sm">
                        {num}
                      </div>

                      <div className="flex min-w-0 grow items-center justify-between gap-3">
                        <span className="truncate text-base font-medium text-slate-900">
                          {titleCase(subj)}
                        </span>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 transition group-hover:bg-sky-500/20">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default SubjectsList;
