import axiosInstance from "@/utils/axiosInstance";
import Termsconditions from "./Termsconditions";
import Metadata from "@/components/Meta/Metadata";

export default async function TermsPage() {
  let data;

  try {
    const res = await axiosInstance.get("/api/v1/terms", {
      // axios doesn't use Next's data cache anyway; this header mirrors your intent
      headers: { "Cache-Control": "no-store" },
    });
    data = res.data;
  } catch (err) {
    throw new Error("Failed to fetch terms");
  }

  const pageData = Array.isArray(data) ? data[0] : data;

  return (
    <>
      <Metadata
        title="Terms & Conditions – Fair Use & Service Guidelines at PNY Trainings"
        description="Read PNY Trainings Terms & Conditions for service policies on payments, cancellations, pricing, re-scheduling, usage, and training conduct designed to ensure clarity and fairness."
        canonicalUrl="https://www.pnytrainings.com/terms-conditions"
      />
      <Termsconditions pageData={pageData} />
    </>
  );
}
