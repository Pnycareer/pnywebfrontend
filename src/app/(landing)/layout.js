// Minimal, isolated root layout for landing pages.
// No header/footer unless you put them here.
export default function LandingRootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

// If you need separate fonts or CSS for landing only,
// import them here instead of polluting the main site.
