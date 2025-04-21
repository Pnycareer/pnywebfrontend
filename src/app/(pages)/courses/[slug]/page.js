import Courses from "./courses";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/getoncategory/${slug}`,
    { cache: "no-cache" }
  );

  if (!response.ok) {
    notFound();
  }

  const subcategory = await response.json();

  const metadata = {
    metatitle: subcategory.category_Name || "Course Not Found",
    metadescription: subcategory.category_Description || "This course does not exist.",
  };

  function capitalizeFirstWord(str) {
    if (!str) return "";
    return str.replace(/^(\w)/, (match) => match.toUpperCase());
  }

  return (
    <>
      <title>{capitalizeFirstWord(metadata.metatitle)}</title>
      <meta name="description" content={metadata.metadescription} />
      <Courses slug={slug} subcategory={subcategory} />
    </>
  );
}
