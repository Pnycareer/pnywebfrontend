import axiosInstance from "@/utils/axiosInstance";
import Privacypolicy from "./Privacypolicy";

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

  const metadata = {
    metatitle: pageData?.meta_title || "Privacy Policy Not Found",
    metadescription:
      pageData?.meta_description || "This privacy policy does not exist.",
  };

  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <Privacypolicy pageData={pageData} />
    </>
  );
}
