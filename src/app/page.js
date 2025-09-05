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
      alternates: {
        canonical: "https://www.pnytrainings.com/",
      },
    };
  } catch (err) {
    console.error("SEO metadata fetch error:", err);
    return {
      title: "Default Title",
      description: "Default Description",
      alternates: {
        canonical: "https://www.pnytrainings.com",
      },
    };
  }
};

// ✅ Correct way: export a function, not a raw promise
export async function generateMetadata() {
  return await getHomeMetadata();
}

export default function Homepage() {
  return <Home />;
}
