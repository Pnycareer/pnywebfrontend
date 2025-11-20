import Navbar from "@/components/Navbar/Navbar";
import CoursesNav from "@/components/Navbar/CoursesNav";
import Footer from "@/components/Footer/Footer";
import Whatsapp from "@/components/whatsapp/Whatsapp";
import ScrollToTopEffect from "@/components/ScrollToTop/ScrolltoTopeffect";
import SpinWheelModalTrigger from "@/components/SpinWheel/SpinWheelModalTrigger";
import Script from "next/script";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.pnytrainings.com"
).replace(/\/$/, "");
const PUBLIC_ACCESS_TOKEN = process.env.NEXT_PUBLIC_PUBLIC_ACCESS_TOKEN ?? "";
const FOOTER_REVALIDATE_SECONDS = 600;

function getCommonHeaders() {
  const headers = {
    Accept: "application/json",
  };

  if (PUBLIC_ACCESS_TOKEN) {
    Object.assign(headers, { Authorization: `Bearer ${PUBLIC_ACCESS_TOKEN}` });
  }

  return headers;
}

function pickRandomItems(items, count) {
  if (items.length <= count) {
    return items;
  }

  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, count);
}

async function fetchFooterData() {
  if (!API_BASE_URL) {
    return { categories: [], courses: [] };
  }

  const requestInit = {
    headers: getCommonHeaders(),
    next: { revalidate: FOOTER_REVALIDATE_SECONDS },
  };

  const categoriesPromise = fetch(
    `${API_BASE_URL}/api/v1/categories`,
    requestInit
  )
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);

  const coursesPromise = fetch(
    `${API_BASE_URL}/courses/get-course`,
    requestInit
  )
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);

  const [categoriesPayload, coursesPayload] = await Promise.all([
    categoriesPromise,
    coursesPromise,
  ]);

  const categories = Array.isArray(categoriesPayload)
    ? categoriesPayload
        .filter((category) => category?.viewonweb)
        .map((category) => ({
          id:
            category?._id ??
            category?.id ??
            category?.url_Slug ??
            category?.Category_Name ??
            "",
          name:
            category?.Category_Name ?? category?.name ?? "Untitled Category",
          slug: category?.url_Slug ?? category?.slug ?? "",
        }))
        .filter((category) => category.id && category.slug && category.name)
    : [];

  const courseGroups = Array.isArray(coursesPayload?.data)
    ? coursesPayload.data
    : Array.isArray(coursesPayload)
    ? coursesPayload
    : [];

  const courses = courseGroups
    .flatMap((group) => (Array.isArray(group?.courses) ? group.courses : []))
    .filter((course) => course?.View_On_Web !== false)
    .map((course) => ({
      id:
        course?._id ??
        course?.id ??
        course?.url_Slug ??
        course?.course_Name ??
        "",
      name:
        course?.course_Name ??
        course?.coursename ??
        course?.title ??
        "Untitled Course",
      slug: course?.url_Slug ?? course?.slug ?? "",
    }))
    .filter((course) => course.id && course.slug && course.name);

  return {
    categories,
    courses: pickRandomItems(courses, 5),
  };
}

export default async function PagesLayout({ children }) {
  const footerData = await fetchFooterData();

  return (
    <>
      <ScrollToTopEffect />
      <Navbar />
      <CoursesNav />
      <Whatsapp />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PWZBZXFD"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      {children}
      <Footer categories={footerData.categories} courses={footerData.courses} />

      <SpinWheelModalTrigger
        autoOpen={false}
        deferUntilInteraction
        delayMs={800}
        frequency="daily"
      />

      <Script
        id="org-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
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
        })}
      </Script>

      <Script
        id="ga-src"
        src="https://www.googletagmanager.com/gtag/js?id=G-JWSHEGQWHD"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JWSHEGQWHD');
        `}
      </Script>
      <Script id="ms-clarity" strategy="afterInteractive">
        {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "u8ijyoffft");
  `}
      </Script>
    </>
  );
}
