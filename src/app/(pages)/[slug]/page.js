import { notFound } from "next/navigation";
import Detailpage from "./Detailpage";

export default async function Page({ params }) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/getonslug/${slug}`,
    { cache: "no-cache" } // SEO: no-cache ensures fresh data but still SSR
  );

  if (!response.ok) {
    notFound();
  }

  const course = await response.json();

  if (!course || typeof course !== "object") {
    notFound();
  }

  // Meta info
  const metadata = {
    metatitle: course.Meta_Title || "Course Not Found",
    metadescription: course.Meta_Description || "This course does not exist.",
    noindex: course.Page_Index,
  };

  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <meta
        name="robots"
        content={metadata.noindex ? "index, follow" : "noindex, nofollow"}
      />

      <Detailpage course={course} />
    </>
  );
}
