import Privacypolicy from "./Privacypolicy";

Privacypolicy;

export default async function TermsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/privacy`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch terms");
  }

  const data = await res.json();

  // ✅ FIX: Pick the first item in the array
  const pageData = Array.isArray(data) ? data[0] : data;

  const metadata = {
    metatitle: pageData.meta_title || "Course Not Found",
    metadescription: pageData.meta_description || "This course does not exist.",
  };

  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <Privacypolicy pageData={pageData} />
    </>
  );
}
