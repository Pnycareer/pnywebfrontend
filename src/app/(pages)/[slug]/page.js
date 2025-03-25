import { notFound } from "next/navigation";
import Detailpage from "./Detailpage";


export async function generateStaticParams() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/get-course`,
    {
      cache: "no-cache",
    }
  );
  const result = await res.json();

  if (!Array.isArray(result)) {
    console.error("API response is not an array:", result);
    return [];
  }

  return result.map((course) => ({
    slug: course.url_Slug,
  }));
}

export default async function Page({ params }) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/getonslug/${slug}`,
    {
      cache: "no-cache",
    }
  );

 
  // If API response is not ok or the data is empty, redirect to the real 404 page
  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
 
  
  const metadata = {
    metatitle: data[0].Meta_Title || "Course Not Found",
    metadescription: data[0].Meta_Description || "This course does not exist.",
  };


  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      <Detailpage params={{slug}} />
    </>
  );
}
