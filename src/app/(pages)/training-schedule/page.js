import TrainingSchedule from "./Trainingschedule";

// Fetch training data
const getTrainings = async () => {
  const res = await fetch(
    "https://lms.pnytraining.com/api/trainingSchedules?type=month&duration=1",
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data?.Batches || {};
};

// Fetch meta info
const getMeta = async () => {
  const res = await fetch(
    "https://www.admin777.pny-trainings.com/api/metas/training-schedule",
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data?.metas?.[0] || {}; // get the first meta entry
};

const Page = async () => {
  const [allBatches, meta] = await Promise.all([getTrainings(), getMeta()]);

  return (
    <div>
      <title>{meta.meta_title}</title>
      <meta name="description" content={meta.meta_description} />
      <meta name="robots" content="noindex, nofollow" />
      <TrainingSchedule batches={allBatches} />
    </div>
  );
};

export default Page;
