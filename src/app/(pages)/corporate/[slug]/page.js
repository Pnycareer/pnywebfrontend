// app/corporate-trainings/[slug]/page.js
import axiosInstance from "@/utils/axiosInstance";
import CorporateTrainingsDetails from "./CorporateTrainingsDetails";
import Metadata from "@/components/Meta/Metadata";

export const dynamic = "force-dynamic"; // avoid caching the route

async function fetchCourseBySlug(slug) {
  try {
    const res = await axiosInstance.get(`/api/academia/courses/${slug}`, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-store",
      },
      timeout: 15000,
    });

    if (res.status < 200 || res.status >= 300) {
      console.error("GET failed:", res.status, res.statusText);
      return { course: null, error: "Failed to load course" };
    }

    const raw = res?.data?.data ?? res?.data ?? null;
    if (!raw) return { course: null, error: "Course not found" };

    const course = {
      id: raw._id || raw.id || "",
      course_Name: raw.coursename || raw.title || "",
      slug: raw.slug || slug,
      course_Image: raw.course_Image || "",
      course_Image_Alt: raw.course_Image_Alt || raw.coursename || "Course image",
      Short_Description: raw.Short_Description || "",
      Course_Description: raw.Course_Description || "",
      Brochure: raw.Brochure || "",
      category: raw.coursecategory || "",
      Instructor: raw.Instructor || "",
      status: raw.status || "",
      faqs: Array.isArray(raw.faqs) ? raw.faqs : [],
      subjects: Array.isArray(raw.subjects) ? raw.subjects : [],
      Audience: raw.Audience || "",
      software: raw.software || "",
      // ✅ SEO data from backend
      Meta_Title: raw.Meta_Title || raw.coursename || "Corporate Training",
      Meta_Description:
        raw.Meta_Description ||
        raw.Short_Description ||
        "Upgrade your skills with our expert-led corporate training programs designed for business growth.",
    };

    return { course, error: null };
  } catch (err) {
    console.error("Axios error:", err?.message || err);
    return { course: null, error: "Something went wrong fetching course" };
  }
}

export default async function Page({ params }) {
  const { slug } = params;
  const { course, error } = await fetchCourseBySlug(slug);

  return (
    <>
      {/* ✅ Dynamic SEO metadata from backend */}
      <Metadata
        title={course?.Meta_Title}
        description={course?.Meta_Description}
        image={course?.course_Image}
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/corporate-trainings/${slug}`}
        canonicalUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/corporate-trainings/${slug}`}
        siteName="PNY Trainings"
      />

      <CorporateTrainingsDetails course={course} error={error} />
    </>
  );
}
