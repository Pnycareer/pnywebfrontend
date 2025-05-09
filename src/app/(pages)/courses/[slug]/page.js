import InstructorCard from "@/components/cards/InstructorCard";
import Courses from "./courses";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;

  try {
    // Fetch subcategory data
    const subcategoryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/getoncategory/${slug}`,
      { cache: "no-cache" }
    );
    
    if (!subcategoryResponse.ok) {
      notFound();
    }

    const subcategory = await subcategoryResponse.json();

    // Fetch instructors based on the category (slug)
    const instructorResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/instructors/get-instructor?category=${slug}`,
      { cache: "no-cache" }
    );
    
    const instructors = instructorResponse.ok
      ? await instructorResponse.json()
      : [];

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
        <Courses slug={slug} subcategory={subcategory} instructors={instructors} />
      </>
    );
  } catch (error) {
    notFound();
  }
}
