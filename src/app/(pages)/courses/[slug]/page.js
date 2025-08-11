import axios from "@/utils/axiosInstance";
import Courses from "./courses";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;

  try {
    const subcategoryResponse = await axios.get(`/courses/getoncategory/${slug}`);
    const subcategory = subcategoryResponse.data;

    // ✅ Check if API returned a valid category or just a message
    if (!subcategory || subcategory.message) {
      return (
        <>
          <title>Courses in {slug}</title>
          <meta name="description" content={`No category found for slug: ${slug}`} />
          <Courses slug={slug} subcategory={null} instructors={[]} />
        </>
      );
    }

    const instructorResponse = await axios.get(`/api/instructors/get-instructor?category=${slug}`);
    const instructors = instructorResponse.data;

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
    return (
      <Courses slug={slug} subcategory={null} instructors={[]} />
    );
  }
}

