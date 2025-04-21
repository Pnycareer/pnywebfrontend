import Feestruchure from "./Feestruchure";


const getMetaData = async () => {
  const res = await fetch(
    "https://www.admin777.pny-trainings.com/api/metas/fee-sturcture",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data?.metas?.[0] || { meta_title: "", meta_description: "" };
};

const getInitialCourses = async () => {
  const res = await fetch(
    "https://lms.pnytraining.com/api/feeStructure?duration=1&type=month",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.Courses?.Lahore || [];
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
      <Feestruchure initialCourses={initialCourses} />
    </>
  );
}
