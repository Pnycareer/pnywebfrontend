import { useState, useEffect } from "react";

const useCourseDetail = (slug) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      setLoading(true); // Ensure that loading is set to true whenever fetching starts.
      setError(null); // Reset error state before starting the fetch.

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/getonslug/${slug}`
        );

        // Handle non-2xx HTTP statuses
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);

        const data = await res.json();

        // If the data is empty or not an array with at least one item
        if (!data || data.length === 0) {
          throw new Error("Course not found");
        }

        setCourse(data[0]);
      } catch (err) {
        setError(err.message); // Set error message
        setCourse(null); // Optional: Reset course state if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]); // Re-run fetch when slug changes

  return { course, loading, error };
};

export default useCourseDetail;
