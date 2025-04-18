import Branches from "./Branches";
import CityCourses from "./Citycourses";
import Copyrights from "./Copyrights";
import Image from "next/image";
import logo from "@/assets/logo/Pnylogo.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-grey-200 text-black py-10 px-5 md:px-20 min-h-[400px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Head Office */}
        <div>
          <Image
            width={100}
            height={56} // 16:9 aspect ratio
            src={logo}
            alt="PNY Trainings"
            className="w-[100px] h-[56px] mb-4 object-contain"
          />

          <h3 className="text-lg font-bold">Head Office</h3>
          <p className="text-sm">
            Office # 1, Level # 14, Arfa Software Technology Park, Ferozepur
            Road, Lahore, Pakistan
          </p>
          <p className="text-sm mt-2">
            Phone: 03041111774 <br />
            Whatsapp: 0309-7779401
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Admission
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Gallery
              </a>
            </li>
            <li>
              <Link href="/terms-conditions" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Best Institute in Arfa
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Best Institute in Lahore
              </a>
            </li>
          </ul>
        </div>

        {/* Courses Offered */}
        <div>
          <h3 className="text-lg font-bold mb-4">Courses Offered</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                AI With Machine Learning Bootcamp
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Truck Dispatching Bootcamp
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cloud Computing Bootcamp
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cyber Security Bootcamp
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Professional Video Editor & VFX Artist
              </a>
            </li>
          </ul>
        </div>

        {/* Language & Short Courses */}
        <div>
          <h3 className="text-lg font-bold mb-4">Language Courses</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Spoken English Language
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                IELTS Preparation Course
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Pearson Test of English (PTE)
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Short Courses</h3>
          <ul className="space-y-2 text-sm">
            {[
              "lahore",
              "rawalpindi",
              "karachi",
              "faisalabad",
              "gujranwala",
              "multan",
              "sialkot",
              "azad-Kashmir",
            ].map((city) => {
              const cityName = city
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
              const slug = city.toLowerCase().replace(/\s+/g, "-");

              return (
                <li key={city}>
                  <Link
                    href={`/short-courses-in-${slug}`}
                    className="hover:underline"
                  >
                    Short courses in {cityName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Branches />
      <CityCourses />
      <Copyrights />
    </footer>
  );
}
