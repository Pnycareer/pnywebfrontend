import Home from "@/app/(pages)/home/Home";

// Reusable function to fetch SEO metadata
const getHomeMetadata = async () => {
  try {
    const res = await fetch("https://api.pnytrainings.com/api/v1/meta/home", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch metadata");

    const { metas } = await res.json();

    const meta = Array.isArray(metas) && metas.length > 0 ? metas[0] : {};

    return {
      title: meta.meta_title || "Default Title",
      description: meta.meta_description || "Default Description",
    };
  } catch (err) {
    console.error("SEO metadata fetch error:", err);
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
};

// For Next.js dynamic metadata (in layout.js or page.js)
export const metadata = getHomeMetadata;

export default function Homepage() {
  return <Home />;
}
