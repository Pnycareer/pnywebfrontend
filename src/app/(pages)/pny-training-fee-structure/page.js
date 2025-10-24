// app/fee-structure/page.js
// Next.js App Router (JS only). Meta is now static — no API calls.

import FeeStructure from "./Feestruchure";

export const dynamic = "force-dynamic";

const cities = ["Lahore", "Rawalpindi", "Multan"];
const durations = [
  { label: "1 months", value: "1", type: "month" },
  { label: "1.5 months", value: "1.5", type: "month" },
  { label: "2 months", value: "2", type: "month" },
  { label: "3 months", value: "3", type: "month" },
  { label: "4 months", value: "4", type: "month" },
  { label: "6 months", value: "6", type: "month" },
  // NOTE: API must support type=year&duration=1. If not, switch to { value: "12", type: "month" }
  { label: "12 months", value: "1", type: "year" },
];

// ✅ Safe JSON parser
async function safeJson(res) {
  try {
    const contentType = res.headers.get("content-type") || "";
    const text = await res.text();

    if (!res.ok) {
      console.error("Fetch failed", {
        url: res.url,
        status: res.status,
        bodyPreview: text.slice(0, 200),
      });
      return null;
    }

    if (!contentType.includes("application/json")) {
      console.error("Non-JSON response", {
        url: res.url,
        contentType,
        bodyPreview: text.slice(0, 200),
      });
      return null;
    }

    return JSON.parse(text);
  } catch (e) {
    console.error("safeJson error:", e);
    return null;
  }
}

// ✅ Make metadata static
export const metadata = {
  title: "PNY Trainings - Fee Structure",
  description:
    "Explore PNY Trainings' updated course fee structure across Lahore, Rawalpindi, and Multan. Find registration and program fees by duration.",
  robots: {
    index: false,
    follow: false,
  },
};

// ✅ Fetch all courses
async function getAllCourses() {
  try {
    const promises = durations.map(async (duration) => {
      const url = `https://lms.pnytraining.com/api/feeStructure?duration=${encodeURIComponent(
        duration.value
      )}&type=${encodeURIComponent(duration.type)}`;
      try {
        const res = await fetch(url, { cache: "no-store" });
        const data = await safeJson(res);
        return {
          label: duration.label,
          data: (data && data.Courses) || {},
        };
      } catch (err) {
        console.error("getAllCourses single fetch error:", err);
        return { label: duration.label, data: {} };
      }
    });

    const responses = await Promise.all(promises);

    const courseMap = {};
    for (const { label, data } of responses) {
      courseMap[label] = {};
      for (const city of cities) {
        courseMap[label][city] = (data && data[city]) || [];
      }
    }

    return courseMap;
  } catch (err) {
    console.error("getAllCourses fatal:", err);
    const empty = {};
    for (const d of durations) {
      empty[d.label] = {};
      for (const c of cities) empty[d.label][c] = [];
    }
    return empty;
  }
}

export default async function Page() {
  const [allCourses] = await Promise.all([getAllCourses()]);

  return (
    <div className="p-6">
      <FeeStructure allCourses={allCourses} />
    </div>
  );
}
