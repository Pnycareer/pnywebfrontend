import Home from "@/app/(pages)/home/Home";
import Metadata from "@/components/Meta/Metadata";

// Fetch SEO metadata
const getHomeMetadata = async () => {
  try {
    const res = await fetch("https://api.pnytrainings.com/api/v1/meta/home", {
      next: { revalidate: 600 },
    });

    if (!res.ok) throw new Error("Failed to fetch metadata");

    const { metas } = await res.json();
    const meta = Array.isArray(metas) && metas.length > 0 ? metas[0] : {};

    return {
      title: meta.meta_title || "Default Title",
      description: meta.meta_description || "Default Description",
      url: "https://www.pnytrainings.com",
      canonicalUrl: "https://www.pnytrainings.com",
    };
  } catch (err) {
    console.error("SEO metadata fetch error:", err);
    return {
      title: "Default Title",
      description: "Default Description",
      image: null,
      url: "https://www.pnytrainings.com/",
      canonicalUrl: "https://www.pnytrainings.com/",
    };
  }
};

// ✅ Next.js metadata function (still supported if you want automatic tags)
export async function generateMetadata() {
  return await getHomeMetadata();
}

// ✅ Page Component
export default async function Homepage() {
  const meta = await getHomeMetadata();

  return (
    <>
      {/* Inject your reusable Metadata component */}
      <Metadata
        title={meta.title}
        description={meta.description}
        url={meta.url}
        canonicalUrl={meta.canonicalUrl}
        siteName="Pnytrainings"
      />

      {/* Actual page content */}
      <Home />
    </>
  );
}
