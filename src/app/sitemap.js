export default async function sitemap() {
  const baseUrl = "https://www.nextcms.shop";

  try {
    // Fetch course data without caching
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/get-course`,
      {
        method: "GET",
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    const data = await res.json();

    // Generate dynamic URLs
    const dynamicUrls = (data.data || [])
      .flatMap((category) =>
        (category.courses || []).filter((course) => course.In_Sitemap)
      )
      .map((course) => ({
        url: `${baseUrl}/${course.url_Slug}`,
        lastModified: course.updatedAt
          ? new Date(course.updatedAt)
          : new Date(),
        changeFrequency: "weekly",
        priority: course.priority ?? 0.9,
      }));

    // Define static URLs
    const staticUrls = [
      { url: `${baseUrl}/`, priority: 0.1 },
      { url: `${baseUrl}/about`, priority: 0.05 },
      { url: `${baseUrl}/contact`, priority: 0.05 },
      { url: `${baseUrl}/blog`, priority: 0.05 },
    ].map(({ url, priority }) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
    }));

    // Return combined URLs
    return [...staticUrls, ...dynamicUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
