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
}) => {
  const list = Array.from(new Set((subjects || []).filter(Boolean)));

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
    <section className="py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ===== Subjects ===== */}
        {list.length ? (
          <>
            <div className="mb-5 flex items-start gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                {subtitle ? (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                ) : null}
              </div>
            </div>

            <ol className={`grid ${colCls} gap-3`} role="list">
              {list.map((subj, idx) => {
                const Icon = iconFor(subj);
                const num = idx + 1;
                return (
                  <li
                    key={`${subj}-${idx}`}
                    className="group rounded-2xl border bg-card p-4 transition hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      {/* number badge */}
                      <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border text-sm font-semibold">
                        {num}
                      </div>

                      {/* label + icon */}
                      <div className="flex min-w-0 grow items-center justify-between gap-3">
                        <span className="truncate text-base font-medium">
                          {titleCase(subj)}
                        </span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border bg-background/60">
                          <Icon className="h-4 w-4 opacity-80" aria-hidden="true" />
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
