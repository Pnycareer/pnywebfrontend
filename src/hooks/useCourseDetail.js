// hooks/useCourseDetail.js
import { useState, useEffect } from "react";

const useCourseDetail = (slug) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/getonslug/${slug}`
        );
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        setCourse(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  return { course, loading, error };
};

export default useCourseDetail;
