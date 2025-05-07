export default async function sitemap() {
    const baseUrl = "https://pnywebfrontend.vercel.app";
  
    try {
        // Fetch course data
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/get-course`);
        const data = await res.json();

        // Log the raw API data
        console.log("Raw Data from API:", JSON.stringify(data.data, null, 2));

        // Generate dynamic URLs
        const dynamicUrls = (data.data || [])
            .flatMap((category) =>
                (category.courses || []).filter((course) => course.In_Sitemap)
            )
            .map((course) => ({
                url: `${baseUrl}/${course.url_Slug}`,
                lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
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

        console.log("Generated Sitemap URLs:", dynamicUrls);

        // Return combined URLs
        return [...staticUrls, ...dynamicUrls];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [];
    }
}
