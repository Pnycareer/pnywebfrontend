import { useState, useEffect } from "react";

const useCourseDetail = (slug) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/getonslug/${slug}`
        );

        if (!res.ok) throw new Error(`Error: ${res.statusText}`);

        const data = await res.json();

        if (!data || typeof data !== "object") {
          throw new Error("Course not found");
        }

        setCourse(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  return { course, loading, error };
};

export default useCourseDetail;
