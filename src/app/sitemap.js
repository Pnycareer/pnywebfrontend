export default async function sitemap() {
  const baseUrl = "https://www.nextcms.shop";

  try {
    // --- Courses ---
    const courseRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/get-course`,
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    const courseData = await courseRes.json();

    const dynamicCourseUrls = (courseData.data || [])
      .flatMap((category) =>
        (category.courses || []).filter((course) => course.In_Sitemap)
      )
      .map((course) => ({
        url: `${baseUrl}/${course.url_Slug}`,
        lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: course.priority ?? 0.9,
      }));

    // --- Blogs ---
    const blogRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    const blogData = await blogRes.json();

    const dynamicBlogUrls = (blogData || [])
      .flatMap((category) =>
        (category.blogs || []).filter((blog) => blog.insitemap)
          .map((blog) => ({
            url: `${baseUrl}/blog/${category.blogCategory.toLowerCase()}/${blog.url_slug}`,
            lastModified: blog.publishDate
              ? new Date(blog.publishDate)
              : new Date(),
            changeFrequency: "weekly",
            priority: parseFloat(blog.canonical) || 0.7, // fallback to 0.7 if not a number
          }))
      );

    // --- Static URLs ---
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

    // Combine & return
    return [...staticUrls, ...dynamicCourseUrls, ...dynamicBlogUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
