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
  const metaUrl = url || process.env.NEXT_PUBLIC_SITE_URL;
  const metaRobots = noindex ? "noindex, nofollow" : "index, follow";
  const metaCanonical = canonicalUrl || metaUrl;
  const metaSiteName = siteName || process.env.NEXT_PUBLIC_SITE_URL;
  const metaImage = image
    ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/${image.replace(/^\//, "")}`
    : `https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;

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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
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
