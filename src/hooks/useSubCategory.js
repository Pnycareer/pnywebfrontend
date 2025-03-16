import { useState, useEffect } from "react";

const useSubCategory = (slug) => {
  const [subcategory, setSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/subCourse/getsubcourses/${slug}`
        );
        if (!response.ok) {
          throw new Error("Subcategory not found");
        }
        const data = await response.json();
        setSubcategory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategory();
  }, [slug]);

  return { subcategory, loading, error };
};

export default useSubCategory;
