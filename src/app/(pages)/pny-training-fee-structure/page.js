import Feestruchure from "./Feestruchure";

export const dynamic = "force-dynamic"; // ✅ this tells Next.js to chill about static rendering


const getMetaData = async () => {
  try {
    const res = await fetch(
      "https://www.admin777.pny-trainings.com/api/metas/fee-sturcture",
      { cache: "no-store" }
    );
    const data = await res.json();
    return data?.metas?.[0] || { meta_title: "", meta_description: "" };
  } catch (error) {
    console.error("Meta fetch failed:", error);
    return { meta_title: "", meta_description: "" };
  }
};

const getInitialCourses = async () => {
  try {
    const res = await fetch(
      "https://lms.pnytraining.com/api/feeStructure?duration=1&type=month",
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.Courses?.Lahore || [];
  } catch (error) {
    if (
      error?.cause?.code === "CERT_HAS_EXPIRED" ||
      error?.message?.includes("fetch failed")
    ) {
      console.warn("SSL expired or fetch failed — showing no data.");
    } else {
      console.error("Course fetch failed:", error);
    }
    return [];
  }
};

export default async function Page() {
  const [meta, initialCourses] = await Promise.all([
    getMetaData(),
    getInitialCourses(),
  ]);

  return (
    <>
      <title>{meta.meta_title}</title>
      <meta name="description" content={meta.meta_description} />
      <meta name="robots" content="noindex, nofollow" />
      <Feestruchure initialCourses={initialCourses} />
    </>
  );
}
