import Home from "@/app/(pages)/home/Home";

export const metadata = async () => {
  try {
    const response = await fetch(`https://api.pnytrainings.com/api/v1/meta/home`, {
      next: { revalidate: 60 }, // Revalidates every 60 seconds
    });

    const data = await response.json();

    if (!data.metas || !Array.isArray(data.metas) || data.metas.length === 0) {
      throw new Error("Invalid metadata response");
    }

    return {
      title: data.metas[0].meta_title || "Default Title",
      description: data.metas[0].meta_description || "Default Description",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
};

export default function Homepage() {
  return <Home />;
}
