const Metadata = ({
  title,
  description,
  url,
  image,
  noindex,
  canonicalUrl,
  siteName,
}) => {
  const metaTitle = title || "Default Title";
  const metaDescription = description || "Default description for the page.";
  const metaImage = image
    ? `https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D`
    : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
  const metaUrl = url || process.env.NEXT_PUBLIC_SITE_URL;
  const metaRobots = noindex ? "noindex, nofollow" : "index, follow";
  const metaCanonical = canonicalUrl || metaUrl;
  const metaSiteName = siteName || "https://pnywebfrontend.vercel.app";


  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={metaRobots} />
      <link rel="canonical" href={metaCanonical} />
      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={metaSiteName} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:url" content={metaUrl} />
    </>
  );
};

export default Metadata;
