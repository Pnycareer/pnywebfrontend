import axiosInstance from "@/utils/axiosInstance";
import Termsconditions from "./Termsconditions";

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

  const metadata = {
    metatitle: pageData?.meta_title || "Course Not Found",
    metadescription: pageData?.meta_description || "This course does not exist.",
  };

  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <Termsconditions pageData={pageData} />
    </>
  );
}
