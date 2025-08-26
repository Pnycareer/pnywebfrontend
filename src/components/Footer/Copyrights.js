import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaTwitter />,
    href: "https://twitter.com/PnyTrainings",
    color: "hover:text-sky-500",
    label: "Twitter",
  },
  {
    icon: <FaFacebook />,
    href: "https://www.facebook.com/PNY.Trainings",
    color: "hover:text-blue-600",
    label: "Facebook",
  },
  {
    icon: <FaLinkedin />,
    href: "https://pk.linkedin.com/company/pny-trainings",
    color: "hover:text-blue-800",
    label: "LinkedIn",
  },
  {
    icon: <FaYoutube />,
    href: "https://www.youtube.com/channel/UCdkE8Zm_dNclx3B7s-t6pBQ",
    color: "hover:text-red-600",
    label: "YouTube",
  },
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/pny.trainings/",
    color: "hover:text-pink-500",
    label: "Instagram",
  },
];

export default function Copyrights() {
  return (
    <div className="bg-gray-300 text-black py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} — All rights reserved by{" "}
          <span className="font-bold text-primary">Next CMS</span>
        </div>

        <div className="flex items-center flex-wrap gap-4 justify-center">
          {socialLinks.map(({ icon, href, color, label }, i) => (
            <Link
              key={i}
              href={href}
              target="_blank"
              aria-label={label}
              className={`text-xl transition-transform duration-200 hover:scale-110 ${color}`}
            >
              {icon}
            </Link>
          ))}

          <Link
            href="https://www.dmca.com/Protection/Status.aspx?ID=7c917940-1e0d-4855-93f4-76d5632f1b81&refurl=https://www.pnytrainings.com/"
            target="_blank"
            aria-label="DMCA Protected"
          >
            <Image
              width={90}
              height={40}
              src="https://www.locklizard.com/wp-content/uploads/2023/04/dmca-protected.png"
              alt="DMCA Protected"
              className="h-8 w-auto object-contain hover:opacity-90 transition"
              unoptimized
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
