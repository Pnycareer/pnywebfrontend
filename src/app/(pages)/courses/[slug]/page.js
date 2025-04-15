import Courses from "./courses";
import { notFound} from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/subCourse`, {
    cache: "no-cache",
  });

  const result = await res.json();

  if (!Array.isArray(result)) {
    console.error("API response is not an array:", result);
    return [];
  }

  return result.map((cat) => ({
    slug: cat.url_slug,
  }));
}

export default async function Page({ params }) {
  const { slug } =  await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/getoncategory/${slug}`,
    { cache: "no-cache" }
  );

  // If API response is not ok or the data is empty, redirect to the real 404 page
  if (!response.ok) {
    notFound()
  }

  const data = await response.json();

  const metadata = {
    metatitle: data.meta_title || "Course Not Found",
    metadescription: data.meta_description || "This course does not exist.",
  };

  function capitalizeFirstWord(str) {
    if (!str) return "";
    return str.replace(/^(\w)/, (match) => match.toUpperCase());
  }

  return (
    <>
      <title>{capitalizeFirstWord(metadata.metatitle)}</title>
      <meta name="description" content={metadata.metadescription} />
      <Courses params={{ slug }} />
    </>
  );
}
