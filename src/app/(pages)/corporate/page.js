import axiosInstance from "@/utils/axiosInstance";
import CorporateTraining from "./CorporateTraining";

export const dynamic = "force-dynamic"; // disable route-level caching

async function fetchCourses() {
  try {
    const res = await axiosInstance.get("/api/academia/courses", {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-store", // force no cache at request level
      },
      timeout: 15000,
    });

    if (res.status < 200 || res.status >= 300) {
      console.error("Axios GET failed:", res.status, res.statusText);
      return { courses: [], error: "Failed to load courses" };
    }

    const json = res.data;
    let raw = json?.data ?? json ?? [];
    const arr = Array.isArray(raw) ? raw : [raw];

    const courses = arr
      .filter(Boolean)
      .filter((c) => c.viewOnWeb !== false)
      .filter((c) => (c.coursecategory || "").toLowerCase() === "corporate trainings") // ✅ only corporate trainings
      .map((c) => ({
        id: c._id || c.id || Math.random().toString(36).slice(2),
        name: c.coursename || c.title || "",
        slug: c.slug || "",
        image: c.course_Image || "",
        alt: c.course_Image_Alt || c.coursename || "Course image",
        short: c.Short_Description || "",
        category: c.coursecategory || "",
        status: c.status || "",
      }));

    return { courses, error: null };
  } catch (err) {
    console.error("Axios error:", err?.message || err);
    return { courses: [], error: "Something went wrong fetching courses" };
  }
}

export default async function Page() {
  const { courses, error } = await fetchCourses();

  return <CorporateTraining courses={courses} error={error} />;
}
