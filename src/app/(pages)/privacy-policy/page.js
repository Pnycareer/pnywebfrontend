import axiosInstance from "@/utils/axiosInstance";
import Privacypolicy from "./Privacypolicy";
import Metadata from "@/components/Meta/Metadata";

export default async function PrivacyPage() {
  let data;

  try {
    const res = await axiosInstance.get("/api/v1/privacy");
    data = res.data;
  } catch (err) {
    // be blunt: this page depends on the API
    throw new Error("Failed to fetch privacy policy");
  }

  const pageData = Array.isArray(data) ? data[0] : data || {};

  return (
    <>
      <Metadata
        title="Privacy Policy – Your Security & Trust at PNY Trainings"
        description="At PNY Trainings, your privacy matters. Learn how we securely collect, protect, and use personal data with transparency and care."
        canonicalUrl="https://www.pnytrainings.com/privacy-policy"
      />
      <Privacypolicy pageData={pageData} />
    </>
  );
}
