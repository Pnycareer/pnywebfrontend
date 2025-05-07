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
  const metaImage = `https://pnywebfrontend.vercel.app/opengraph-image?title=${encodeURIComponent(metaTitle)}&description=${encodeURIComponent(metaDescription)}`;
  const metaUrl = url || "https://pnywebfrontend.vercel.app";
  const metaRobots = noindex ? "noindex, nofollow" : "index, follow";
  const metaCanonical = canonicalUrl || metaUrl;
  const metaSiteName = siteName || "PNY Trainings";

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
      <meta property="og:image:alt" content={metaTitle} />

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
