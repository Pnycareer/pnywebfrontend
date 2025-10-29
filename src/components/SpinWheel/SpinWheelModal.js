"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

/* ------- math helpers ------- */
function deg2rad(deg) { return (deg * Math.PI) / 180; }
function polarToCartesian(cx, cy, r, angleDeg) {
  const a = deg2rad(angleDeg - 90);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function arcPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

/* ------- popup frequency helpers ------- */
function shouldOpenPopup(freq, key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return true;
    const seenAt = Number(raw);
    if (!Number.isFinite(seenAt)) return true;
    if (freq === "always") return true;
    if (freq === "session") return sessionStorage.getItem(key) ? false : true;
    // daily (24h)
    return Date.now() - seenAt > 24 * 60 * 60 * 1000;
  } catch { return true; }
}
function markOpened(freq, key) {
  try {
    localStorage.setItem(key, String(Date.now()));
    if (freq === "session") sessionStorage.setItem(key, "1");
  } catch {}
}

export default function SpinWheelModal({
  autoOpen = true,
  deferUntilInteraction = false,
  delayMs = 600,
  frequency = "daily", // "daily" | "session" | "always"
  storageKey = "pny_spin_seen_at",
}) {
  /* ------- wheel config ------- */
  const sectors = useMemo(
    () => [
      { label: "10%" }, { label: "15%" }, { label: "20%" }, { label: "30%" },
      { label: "40%" }, { label: "50%" }, { label: "60%" }, { label: "70%" },
    ],
    []
  );

  const colors = useMemo(() => {
    const baseH = 25, step = 360 / sectors.length;
    return Array.from({ length: sectors.length }, (_, i) =>
      `hsl(${(baseH + i * step) % 360} 75% 75%)`
    );
  }, [sectors.length]);

  /* ------- popup + body lock ------- */
  const [open, setOpen] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [interactionReady, setInteractionReady] = useState(!deferUntilInteraction);

  useEffect(() => {
    if (!deferUntilInteraction) return;

    let unlocked = false;
    const markReady = () => {
      if (unlocked) return;
      unlocked = true;
      setInteractionReady(true);
    };

    const options = { passive: true, once: true };
    const events = ["pointerdown", "keydown", "scroll"];
    events.forEach((event) => window.addEventListener(event, markReady, options));

    const fallbackTimeout = window.setTimeout(markReady, 12000);
    let idleCallbackId = null;
    if (typeof window.requestIdleCallback === "function") {
      idleCallbackId = window.requestIdleCallback(() => markReady(), { timeout: 8000 });
    }

    return () => {
      events.forEach((event) => window.removeEventListener(event, markReady, options));
      window.clearTimeout(fallbackTimeout);
      if (idleCallbackId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleCallbackId);
      }
    };
  }, [deferUntilInteraction]);

  const shouldAutoOpen = interactionReady && (autoOpen || deferUntilInteraction);

  useEffect(() => {
    if (!shouldAutoOpen) return;

    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      if (shouldOpenPopup(frequency, storageKey)) {
        setOpen(true);
        markOpened(frequency, storageKey);
      }
    }, Math.max(0, delayMs));

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [shouldAutoOpen, delayMs, frequency, storageKey]);

  useEffect(() => {
    if (open || selectModal || formModal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [open, selectModal, formModal]);

  /* ------- wheel state ------- */
  const wheelRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  /* ------- responsive size ------- */
  const [size, setSize] = useState(420);
  useEffect(() => {
    function computeSize() {
      const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
      const base = Math.min(vw * 0.9, 560); // cap on desktop
      return Math.max(260, Math.round(base)); // floor on small phones
    }
    const apply = () => setSize(computeSize());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  /* ------- courses state ------- */
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [coursesError, setCoursesError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* ------- form state ------- */
  const [form, setForm] = useState({ name: "", email: "", contact: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [submitOk, setSubmitOk] = useState("");

  const N = sectors.length;
  const SLICE = 360 / N;
  const HALF_SLICE = SLICE / 2;

  const discountPct = useMemo(() => {
    if (!result) return 0;
    const n = parseInt(result.replace("%", ""), 10);
    return Number.isFinite(n) ? n : 0;
  }, [result]);

  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => (c.course_Name || "").toLowerCase().includes(q));
  }, [courses, search]);

  /* ------- fetch courses ------- */
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoadingCourses(true);
        setCoursesError("");
        const res = await axiosInstance.get("/courses/get-course");
        const payload = res?.data ?? null;
        const categories = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data?.data)
          ? payload.data.data
          : [];
        const flat = categories.flatMap((cat) =>
          Array.isArray(cat?.courses) ? cat.courses : []
        );
        if (active) setCourses(flat);
      } catch (err) {
        if (active) setCoursesError(err?.response?.data?.message || err?.message || "Failed to load courses.");
      } finally {
        if (active) setLoadingCourses(false);
      }
    })();
    return () => { active = false; };
  }, []);

  /* ------- close everything ------- */
  function closeAll() {
    setSelectModal(false);
    setFormModal(false);
    setSpinning(false);
    setOpen(false);
  }

  /* ------- spin ------- */
  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setSelectedCourse(null);
    setSearch("");
    setSubmitErr(""); setSubmitOk("");
    setForm({ name: "", email: "", contact: "" });
    setSelectModal(false); setFormModal(false);

    // Only allow 10%, 15%, 20%
    const allowed = sectors
      .map((s, i) => ({ label: s.label, index: i }))
      .filter(s => ["10%", "15%", "20%"].includes(s.label));
    const winner = allowed[Math.floor(Math.random() * allowed.length)];
    const winnerIndex = winner.index;

    const targetCenterDeg = winnerIndex * SLICE + HALF_SLICE;
    const current = ((angle % 360) + 360) % 360;
    const spins = (6 + Math.floor(Math.random() * 2)) * 360;
    const delta = ((360 - targetCenterDeg - current + 360) % 360) + spins;
    const finalAngle = angle + delta;

    const el = wheelRef.current;
    if (!el) return;
    el.style.transition = "transform 3.3s cubic-bezier(0.12, 0.6, 0, 1)";
    el.offsetHeight; // force reflow
    el.style.transform = `rotate(${finalAngle}deg)`;

    const onEnd = () => {
      el.removeEventListener("transitionend", onEnd);
      setAngle(finalAngle);
      setSpinning(false);
      setResult(sectors[winnerIndex].label);
      el.style.transition = "none";
      el.style.transform = `rotate(${finalAngle % 360}deg)`;
      el.offsetHeight; el.style.transition = "";
      setTimeout(() => setSelectModal(true), 60);
    };
    el.addEventListener("transitionend", onEnd, { once: true });

    // Fallback for some mobile browsers where transitionend might not fire
    setTimeout(() => {
      if (spinning) onEnd();
    }, 3600);
  }

  /* ------- continue to form ------- */
  function openForm() {
    if (!selectedCourse) return;
    setSelectModal(false);
    setFormModal(true);
  }

  /* ------- submit application ------- */
  async function submitForm() {
    if (!selectedCourse) { setSubmitErr("Select a course first."); return; }
    if (!form.name || !form.email || !form.contact) { setSubmitErr("Please fill name, email and contact."); return; }
    setSubmitting(true);
    setSubmitErr(""); setSubmitOk("");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        contact: form.contact,
        courseId: selectedCourse._id,
        course_Name: selectedCourse.course_Name,
        url_Slug: selectedCourse.url_Slug,
        discountPercent: discountPct
      };
      const res = await axiosInstance.post("/api/applications", payload);
      if (res?.data?.success) {
        setSubmitOk("Thank you! Our representative will contact you soon.");
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      setSubmitErr(err?.response?.data?.message || err?.message || "Submit failed.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ------- sizes ------- */
  const R = size / 2, labelR = R * 0.66, cx = R, cy = R;
  const hubR = Math.max(50, size * 0.135);
  const labelFont = Math.max(14, Math.round(size * 0.043));
  const pointerHalfW = Math.max(10, Math.round(size * 0.033));
  const pointerH = Math.max(18, Math.round(size * 0.062));

  // don't render anything if closed
  if (!open && !selectModal && !formModal) return null;

  return (
    <>
      {/* Main overlay holding the wheel */}
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeAll} />

          {/* Top banner text */}
          <div className="absolute top-3 left-1/2 text-center -translate-x-1/2 text-white text-lg sm:text-2xl font-bold drop-shadow">
            💫 Try Your Luck — Spin the Wheel & Grab Your Exclusive Discount!
          </div>

          <div className="relative w-full max-w-[92vw] sm:max-w-3xl">
            {/* Global close (kills everything) */}
            <button
              onClick={closeAll}
              className="absolute -top-2 right-0 translate-y-[-100%] rounded-md px-2 py-1 text-sm bg-white/20 text-white hover:bg-white/30"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Wheel box */}
            <div className="relative mx-auto" style={{ width: size, height: size }}>
              {/* Center Spin button over the hub */}
              <button
                type="button"
                onClick={spin}
                disabled={spinning}
                className={`absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                  rounded-full px-5 py-3 text-sm sm:text-base font-semibold
                  bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)]
                  ${spinning ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"}
                  transition-transform duration-150`}
                aria-label="Spin the wheel"
              >
                {spinning ? "Spinning…" : "Spin"}
              </button>

              {/* Wheel */}
              <div
                ref={wheelRef}
                className="absolute inset-0 rounded-full"
                style={{
                  transform: `rotate(${angle % 360}deg)`,
                  boxShadow:
                    "0 24px 90px rgba(0,0,0,0.5), inset 0 0 0 4px rgba(255,255,255,0.9)",
                  background:
                    "radial-gradient(closest-side, rgba(255,255,255,0.06), rgba(0,0,0,0))",
                }}
              >
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                  {sectors.map((s, i) => {
                    const start = i * SLICE, end = (i + 1) * SLICE;
                    const d = arcPath(cx, cy, R - 6, start, end);
                    return <path key={`seg-${i}`} d={d} fill={colors[i]} />;
                  })}
                  {sectors.map((_, i) => {
                    const a = i * SLICE;
                    const p1 = polarToCartesian(cx, cy, R - 6, a);
                    const p2 = polarToCartesian(cx, cy, 12, a);
                    return (
                      <line key={`sep-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                        stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
                    );
                  })}
                  {sectors.map((s, i) => {
                    const mid = i * SLICE + HALF_SLICE;
                    const pos = polarToCartesian(cx, cy, labelR, mid);
                    return (
                      <text
                        key={`label-${i}`} x={pos.x} y={pos.y}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize={labelFont} fontWeight="700" fill="#0b0b10"
                        style={{ paintOrder: "stroke" }}
                        stroke="rgba(255,255,255,0.9)" strokeWidth="1"
                      >
                        {s.label}
                      </text>
                    );
                  })}
                  <circle cx={cx} cy={cy} r={hubR} fill="#ffffff" />
                </svg>
              </div>

              {/* Pointer (down) */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: `${pointerHalfW}px solid transparent`,
                    borderRight: `${pointerHalfW}px solid transparent`,
                    borderTop: `${pointerH}px solid #fff`,
                    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course select modal (on top, still closes all on ✕) */}
      {selectModal && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectModal(false)} />
          <div className="relative w-full max-w-[92vw] sm:max-w-2xl rounded-2xl bg-white text-black shadow-[0_40px_120px_rgba(0,0,0,0.45)] p-4 sm:p-6">
            <button
              onClick={closeAll}
              className="absolute right-3 top-3 rounded-md px-2 py-1 text-sm bg-black/5 hover:bg-black/10"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-bold">🎉 Congratulations!</h2>
              <p className="mt-1 text-sm text-black/70">You unlocked a <b>{discountPct}%</b> discount. Pick a course.</p>
            </div>
            <input
              type="text"
              placeholder="Search courses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-black/40 mb-3"
            />
            <div className="space-y-3 max-h-[50vh] overflow-auto pr-1">
              {loadingCourses && <div className="text-sm text-black/60">Loading courses…</div>}
              {coursesError && <div className="text-sm text-red-600">Failed to load courses: {coursesError}</div>}
              {!loadingCourses && !coursesError && filteredCourses.length === 0 && (
                <div className="text-sm text-black/60">No courses found.</div>
              )}
              {!loadingCourses && !coursesError && filteredCourses.map((c) => {
                const selected = selectedCourse?._id === c._id;
                return (
                  <label
                    key={c._id || c.url_Slug}
                    className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer ${
                      selected ? "border-black" : "border-black/10"
                    } hover:border-black/40`}
                  >
                    <input
                      type="radio"
                      name="course"
                      className="accent-black"
                      checked={selected}
                      onChange={() => setSelectedCourse(c)}
                    />
                    <div className="flex-1 font-semibold text-sm sm:text-base">{c.course_Name || "Untitled Course"}</div>
                  </label>
                );
              })}
            </div>
            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
              <button onClick={() => setSelectModal(false)} className="px-4 py-2 rounded-lg bg-black/5 hover:bg-black/10">
                Not now
              </button>
              <button
                onClick={openForm}
                disabled={!selectedCourse}
                className={`px-5 py-2 rounded-lg font-semibold ${
                  selectedCourse ? "bg-black text-white hover:opacity-90" : "bg-black/30 text-white/70 cursor-not-allowed"
                }`}
              >
                Apply {discountPct}% to selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply form modal */}
      {formModal && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFormModal(false)} />
          <div className="relative w-full max-w-[92vw] sm:max-w-lg rounded-2xl bg-white text-black shadow-[0_40px_120px_rgba(0,0,0,0.45)] p-4 sm:p-6">
            <button
              onClick={closeAll}
              className="absolute right-3 top-3 rounded-md px-2 py-1 text-sm bg-black/5 hover:bg-black/10"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-lg sm:text-xl font-bold">Apply your {discountPct}% discount</h2>
            <p className="text-sm text-black/70 mt-1">
              Course: <b>{selectedCourse?.course_Name}</b>
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <input
                className="rounded-lg border border-black/15 px-3 py-2"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="rounded-lg border border-black/15 px-3 py-2"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="rounded-lg border border-black/15 px-3 py-2"
                placeholder="Contact"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
            </div>

            {submitErr && <div className="mt-3 text-sm text-red-600">{submitErr}</div>}
            {submitOk && (
              <div className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                {submitOk}
              </div>
            )}

            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
              <button onClick={() => setFormModal(false)} className="px-4 py-2 rounded-lg bg-black/5 hover:bg-black/10">
                Close
              </button>
              <button
                onClick={submitForm}
                disabled={submitting}
                className={`px-5 py-2 rounded-lg font-semibold ${
                  !submitting ? "bg-black text-white hover:opacity-90" : "bg-black/30 text-white/70 cursor-not-allowed"
                }`}
              >
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
