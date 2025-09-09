import axios from "@/utils/axiosInstance";
import Courses from "./courses";
import { notFound } from "next/navigation";
import Metadata from "@/components/Meta/Metadata";

export default async function Page({ params }) {
  const { slug } = await params;

  try {
    const subcategoryResponse = await axios.get(
      `/courses/getoncategory/${slug}`
    );
    const subcategory = subcategoryResponse.data;

    // ✅ Check if API returned a valid category or just a message
    if (!subcategory || subcategory.message) {
      return (
        <>
          <title>Courses in {slug}</title>
          <meta
            name="description"
            content={`No category found for slug: ${slug}`}
          />
          <Courses slug={slug} subcategory={null} instructors={[]} />
        </>
      );
    }

    const instructorResponse = await axios.get(
      `/api/instructors/get-instructor?category=${slug}`
    );
    const instructors = instructorResponse.data;

    const metadata = {
      metatitle: subcategory?.category_Meta_Title?.trim()
        ? subcategory.category_Meta_Title
        : subcategory?.category_Name || "Course Not Found",

      metadescription: subcategory?.category_Meta_Description?.trim()
        ? subcategory.category_Meta_Description
        : subcategory?.category_Description || "This course does not exist.",

      canonical: `https://www.pnytrainings.com/${
        subcategory?.category_Meta_Title ||
        subcategory?.category_Name ||
        "course-not-found"
      }`,
    };

    function capitalizeFirstWord(str) {
      if (!str) return "";
      return str.replace(/^(\w)/, (match) => match.toUpperCase());
    }

    return (
      <>
        <Metadata
          title={metadata.metatitle}
          description={metadata.metadescription}
          canonicalUrl={`https://www.pnytrainings.com/${metadata.metatitle}`}
          url={`https://www.pnytrainings.com/${metadata.metatitle}`}
          image={metadata.image}
          siteName="Pnytrainings"
        />

        <Courses
          slug={slug}
          subcategory={subcategory}
          instructors={instructors}
        />
      </>
    );
  } catch (error) {
    return <Courses slug={slug} subcategory={null} instructors={[]} />;
  }
}
