import FeeStructure from "./Feestruchure";

const cities = ["Lahore", "Rawalpindi", "Multan"];
const durations = [
  { label: "1 months", value: "1", type: "month" },
  { label: "1.5 months", value: "1.5", type: "month" },
  { label: "2 months", value: "2", type: "month" },
  { label: "3 months", value: "3", type: "month" },
  { label: "4 months", value: "4", type: "month" },
  { label: "6 months", value: "6", type: "month" },
  { label: "12 months", value: "1", type: "year" },
];

// Fetch metadata (unchanged)
const getMetaData = async () => {
  const res = await fetch(
    "https://www.admin777.pny-trainings.com/api/metas/fee-sturcture",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.metas?.[0] || { meta_title: "", meta_description: "" };
};

// Fetch all durations for all cities (parallel)
const getAllCourses = async () => {
  const promises = durations.map(async (duration) => {
    const res = await fetch(
      `https://lms.pnytraining.com/api/feeStructure?duration=${duration.value}&type=${duration.type}`,
      { cache: "no-store" }
    );
    const data = await res.json();

    return {
      label: duration.label,
      data: data.Courses || {},
    };
  });

  const responses = await Promise.all(promises);

  const courseMap = {};

  for (const { label, data } of responses) {
    courseMap[label] = {};
    for (const city of cities) {
      courseMap[label][city] = data?.[city] || [];
    }
  }

  return courseMap; // structure: { "1 months": { Lahore: [], ... }, ... }
};

export default async function Page() {
  const [meta, allCourses] = await Promise.all([
    getMetaData(),
    getAllCourses(),
  ]);

  return (
    <>
      <title>{meta.meta_title}</title>
      <meta name="description" content={meta.meta_description} />
      <meta name="robots" content="noindex, nofollow" />
      <FeeStructure allCourses={allCourses} />
    </>
  );
}
