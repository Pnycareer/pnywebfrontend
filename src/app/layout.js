import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import CoursesNav from "@/components/Navbar/CoursesNav";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Whatsapp from "@/components/whatsapp/Whatsapp";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />

        <meta
          name="google-site-verification"
          content="V1XnCS_3kKIZY1cTkolGmqLipxnJbx2GB7X4RMxRZkc"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* GTM Head Script */}
        <Script id="gtm-head">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PWZBZXFD');
          `}
        </Script>

        {/* Disable scroll restoration */}
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual'",
          }}
        />
      </head>
      <body className={inter.className}>
        {/* GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PWZBZXFD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar />
        <CoursesNav />
        <Whatsapp />
        {children}
        <Footer />

        {/* JSON-LD Schema */}
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              name: "PNY Trainings",
              url: "https://www.pnytrainings.com/",
              logo: "https://www.pnytrainings.com/assets/uploads//logo/1529168423-school-logo.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "03041111774",
                contactType: "customer service",
                contactOption: "HearingImpairedSupported",
                areaServed: "PK",
                availableLanguage: "en",
              },
              sameAs: [
                "https://www.facebook.com/PNY.Trainings/",
                "https://www.instagram.com/pny.trainings/",
                "https://www.youtube.com/c/PNYTrainingsOfficial",
                "https://pk.linkedin.com/company/pny-trainings",
              ],
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JWSHEGQWHD"
        />
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JWSHEGQWHD');
          `}
        </Script>
      </body>
    </html>
  );
}
