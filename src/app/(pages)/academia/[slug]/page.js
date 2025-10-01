// app/academia/[slug]/page.js
import axiosInstance from "@/utils/axiosInstance";
import AcademiaDetails from "./AcademiaDetails";


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

    // normalize -> only what we need on the client
    const course = {
      id: raw._id || raw.id || "",
      course_Name: raw.coursename || raw.title || "",
      slug: raw.slug || slug,
      course_Image: raw.course_Image || "",
      course_Image_Alt: raw.course_Image_Alt || raw.coursename || "Course image",
      Short_Description: raw.Short_Description || "",
      Course_Description: raw.Course_Description || "",
      Brochure:raw.Brochure || "",
      category: raw.coursecategory || "",
      Instructor:raw.Instructor || "",
      status: raw.status || "", 
      faqs: raw.faqs || "",
      subjects: raw.subjects || "",
    };

    return { course, error: null };
  } catch (err) {
    console.error("Axios error:", err?.message || err);
    return { course: null, error: "Something went wrong fetching course" };
  }
}

export default async function Page({ params }) {
  const { slug } = await params; // <-- no await here
  const { course, error } = await fetchCourseBySlug(slug);
  return (
   
      <AcademiaDetails course={course} error={error} />
    
  );
}
