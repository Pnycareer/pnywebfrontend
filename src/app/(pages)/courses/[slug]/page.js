import axios from "@/utils/axiosInstance";
import Courses from "./courses";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;

  try {
    // Fetch subcategory data
    const subcategoryResponse = await axios.get(`/courses/getoncategory/${slug}`);
    const subcategory = subcategoryResponse.data;

    // Fetch instructors based on the category (slug)
    let instructors = [];
    try {
      const instructorResponse = await axios.get(`/api/instructors/get-instructor?category=${slug}`);
      instructors = instructorResponse.data;
    } catch {
      instructors = [];
    }

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
