export const dynamic = 'force-dynamic'; // Ensure dynamic route handling

export async function GET() {
  const baseUrl = "https://pnywebfrontend.vercel.app";

  try {
    // Fetch course data from your API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/get-course`);
    const data = await res.json();

    // Generate dynamic course URLs
    const courseUrls = data.data
      ?.flatMap((category) => (category.courses || []).filter(course => course.In_Sitemap))
      .map((course) => {
        const priority = course.priority ?? 0.9;
        return `
          <url>
            <loc>${baseUrl}/${course.url_Slug}</loc>
            <lastmod>${course.updatedAt ? new Date(course.updatedAt).toISOString() : new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>${priority}</priority>
          </url>
        `;
      })
      .join("") || "";

    // Define static URLs
    const staticUrls = [
      { url: `${baseUrl}/`, priority: 0.1 },
      { url: `${baseUrl}/about`, priority: 0.05 },
      { url: `${baseUrl}/contact`, priority: 0.05 },
      { url: `${baseUrl}/blog`, priority: 0.05 },
    ]
      .map(({ url, priority }) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${priority}</priority>
        </url>
      `)
      .join("");

    // Combine into a full sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls}
      ${courseUrls}
    </urlset>`.trim();

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Failed to generate sitemap", { status: 500 });
  }
}
