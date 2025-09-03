// Force SSR so build doesn't prerender this route
export const dynamic = "force-dynamic"; // <- key line
// Or: export const fetchCache = "force-no-store";

import TrainingSchedule from "./Trainingschedule";

// Small safe fetch helper with timeout + swallow errors
const safeFetchJson = async (url, opts = {}) => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error("safeFetchJson failed:", url, e?.message || e);
    return null;
  }
};

const getTrainings = async () => {
  const data = await safeFetchJson(
    "https://lms.pnytraining.com/api/trainingSchedules?type=month&duration=1"
  );
  return data?.Batches || {};
};

const getMeta = async () => {
  const data = await safeFetchJson(
    "https://www.admin777.pny-trainings.com/api/metas/training-schedule"
  );
  return data?.metas?.[0] || {};
};

// Proper App Router metadata (don’t put <title> in the JSX)
export async function generateMetadata() {
  const meta = await getMeta();
  return {
    title: meta.meta_title || "Training Schedule",
    description: meta.meta_description || "",
    robots: { index: false, follow: false }, // your previous noindex,nofollow
  };
}

export default async function Page() {
  const allBatches = await getTrainings();

  return (
    <div>
      <TrainingSchedule batches={allBatches} />
    </div>
  );
}
