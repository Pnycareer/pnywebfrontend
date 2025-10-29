import Branches from "./Branches";
import CityCourses from "./Citycourses";
import Copyrights from "./Copyrights";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/Pnylogo.png";

function formatCityLabel(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const CITY_SLUGS = [
  "lahore",
  "rawalpindi",
  "karachi",
  "faisalabad",
  "gujranwala",
  "multan",
  "sialkot",
  "azad-kashmir",
];

function Footer({ categories = [], courses = [] }) {
  return (
    <>
      <Branches />
      <CityCourses />

      <footer className="bg-gray-100 text-gray-800 py-10 px-5 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div>
            <Image
              src={logo}
              width={100}
              height={56}
              alt="PNY Logo"
              className="mb-4 object-contain"
              priority
            />
            <h3 className="text-lg font-bold">Head Office</h3>
            <address className="text-sm not-italic leading-relaxed">
              Office # 1, Level # 14, Arfa Software Technology Park, Ferozepur
              Road, Lahore
            </address>
            <p className="text-sm mt-2">
              Phone: <a href="tel:+923041111774">0304-1111774</a>
              <br />
              WhatsApp: <a href="https://wa.me/923097779401">0309-7779401</a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "FAQs", link: "/faqs" },
                { name: "News", link: "/news" },
                {
                  name: "Admission",
                  link: "https://lms.pnytraining.com/",
                  external: true,
                },
                { name: "Gallery", link: "/gallery" },
                { name: "Student Reviews", link: "/reviews" },
                { name: "Terms & Conditions", link: "/terms-conditions" },
                { name: "Privacy Policy", link: "/privacy-policy" },
                {
                  name: "Best Institute in Lahore",
                  link: "/best-online-it-institute-in-lahore",
                },
              ].map(({ name, link, external }) => (
                <li key={name}>
                  <Link
                    href={link}
                    prefetch={!external}
                    target={external ? "_blank" : undefined}
                    className="hover:underline"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Courses Offered</h3>
            <ul className="space-y-2 text-sm">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <li key={course.id}>
                    <Link
                      href={`/${course.slug}`}
                      prefetch={false}
                      className="hover:underline"
                    >
                      {course.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No courses available at the moment.</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.length > 0 ? (
                categories.slice(0, 8).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/courses/${cat.slug}`}
                      prefetch={false}
                      className="hover:underline"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No categories available yet.</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Short Courses</h3>
            <ul className="space-y-2 text-sm">
              {CITY_SLUGS.map((city) => (
                <li key={city}>
                  <Link
                    href={`/short-courses-in-${city}`}
                    prefetch={false}
                    className="hover:underline"
                  >
                    Short courses in {formatCityLabel(city)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Copyrights />
      </footer>
    </>
  );
}

export default Footer;
