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
      name: raw.coursename || raw.title || "",
      slug: raw.slug || slug,
      image: raw.course_Image || "",
      alt: raw.course_Image_Alt || raw.coursename || "Course image",
      shortHtml: raw.Short_Description || "",
      descriptionHtml: raw.Course_Description || "",
      category: raw.coursecategory || "",
      status: raw.status || "", 
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

  console.log(course)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <AcademiaDetails course={course} error={error} />
    </div>
  );
}
