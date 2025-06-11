import axiosInstance from "@/utils/axiosInstance";


export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};