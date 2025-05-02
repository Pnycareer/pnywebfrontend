import { notFound } from "next/navigation";
import Blogdetails from "./Blogdetails";

// ✅ Generate SEO metadata for social sharing
export async function generateMetadata({ params }) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/getonslug/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Blog Not Found",
      description: "The blog you're looking for does not exist.",
    };
  }

  const blog = await res.json();
  const fullUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${params.blogCategory}/${slug}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${blog.blogImage?.replace(/\\/g, "/")}`;

  return {
    title: blog.metaTitle || blog.blogName,
    description: blog.metaDescription || blog.shortDescription,
    openGraph: {
      title: blog.metaTitle || blog.blogName,
      description: blog.metaDescription || blog.shortDescription,
      type: "article",
      url: fullUrl,
      siteName: "pnytrainings.com",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: blog.blogName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.blogName,
      description: blog.metaDescription || blog.shortDescription,
      images: [imageUrl],
    },
  };
}

// ✅ Main blog page
export default async function BlogPage({ params }) {
  const { slug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/getonslug/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const blog = await res.json();

  return <Blogdetails blog={blog} />;
}
