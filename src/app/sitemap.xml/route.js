// app/sitemap.xml/route.js
export async function GET() {
    const baseUrl =  "https://pnywebfrontend.vercel.app";
  
    // Fetch categories with courses
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/get-course`);
    const json = await res.json();
  
    const courseUrls = json.data
    ?.flatMap((category) =>
      (category.courses || []).filter(course => course.In_Sitemap)
    )
    .map((course) => {
      const priority = course.priority ?? 0.9; // Default to 0.8 if not provided
         return `
        <url>
          <loc>${baseUrl}/${course.url_Slug}</loc>
          <lastmod>${course.updatedAt}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${priority}</priority>
        </url>
      `;
    })
    .join("");
  
  
    // Add static pages if needed
    const staticUrls = [
      `${baseUrl}/`,
      `${baseUrl}/about`,
      `${baseUrl}/contact`,
      `${baseUrl}/blog`,
    ].map((url) => {
      const priority = url === `${baseUrl}/` ? 0.1 : 0.05;
      return `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${priority}</priority>
        </url>
      `;
    }).join("");
    
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${staticUrls}
      ${courseUrls}
    </urlset>`;
  
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
  