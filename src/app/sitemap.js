// app/sitemap.js

export default async function sitemap() {
    const baseUrl = "https://pnywebfrontend.vercel.app";
  
    try {
      // Fetch course data
      const res = await fetch("https://api.pnytrainings.com/courses/get-course");
      const data = await res.json();
  
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
  
      // Return combined URLs
      return [...staticUrls, ...dynamicUrls];
    } catch (error) {
      console.error("Error generating sitemap:", error);
      return [];
    }
  }
  