"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Landmark,
  Building,
  Factory,
  School,
  Mountain,
  Trees,
  Warehouse,
  Banknote,
  Home,
} from "lucide-react";

const accentStyles = {
  royal: {
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    shadow: "shadow-[0_18px_50px_-25px_rgba(79,70,229,0.65)]",
    ring: "ring-blue-500/30",
  },
  emerald: {
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    shadow: "shadow-[0_18px_50px_-25px_rgba(16,185,129,0.55)]",
    ring: "ring-emerald-500/25",
  },
  amber: {
    gradient: "from-amber-500 via-orange-500 to-red-400",
    shadow: "shadow-[0_18px_50px_-25px_rgba(234,179,8,0.55)]",
    ring: "ring-amber-500/30",
  },
  slate: {
    gradient: "from-slate-500 via-slate-600 to-slate-700",
    shadow: "shadow-[0_18px_50px_-25px_rgba(71,85,105,0.55)]",
    ring: "ring-slate-500/30",
  },
};

const cityCards = [
  { slug: "lahore", label: "Lahore", icon: Landmark, accent: "royal" },
  { slug: "rawalpindi", label: "Rawalpindi", icon: Building, accent: "emerald" },
  { slug: "karachi", label: "Karachi", icon: Factory, accent: "amber" },
  { slug: "multan", label: "Multan", icon: Home, accent: "royal" },
  { slug: "sialkot", label: "Sialkot", icon: School, accent: "emerald" },
  { slug: "faisalabad", label: "Faisalabad", icon: Warehouse, accent: "slate" },
  { slug: "gujranwala", label: "Gujranwala", icon: Banknote, accent: "amber" },
  { slug: "azad-kashmir", label: "Azad Kashmir", icon: Mountain, accent: "emerald" },
  { slug: "islamabad", label: "Islamabad", icon: Landmark, accent: "royal" },
  { slug: "sargodha", label: "Sargodha", icon: Trees, accent: "emerald" },
];

export default function CityCourses() {
  const router = useRouter();

  const redirectToCity = (city) => {
    router.push(`/city/${city}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-8rem] right-[-6rem] h-96 w-96 rounded-full bg-amber-200/40 blur-[110px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center text-slate-900">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 shadow-sm">
          <MapPin className="h-4 w-4 text-blue-500" />
          City Learning Hubs
        </span>
        <h3 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
          Explore Courses by City
        </h3>
        <p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
          Choose your city to discover curated learning paths, expert-led sessions, and
          upcoming cohorts tailored to your local community.
        </p>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {cityCards.map((city, index) => {
          const Icon = city.icon ?? MapPin;
          const accent = accentStyles[city.accent] ?? accentStyles.royal;

          return (
            <motion.button
              key={city.slug}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
              onClick={() => redirectToCity(city.slug)}
              type="button"
              className={`group relative overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-5 text-left shadow-[0_22px_40px_-28px_rgba(30,64,175,0.35)] backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-white ${accent.shadow}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/70 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent.gradient} text-white ring-4 ring-offset-2 ring-offset-white ${accent.ring}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-800">
                  {city.label}
                </p>
                <p className="text-xs text-slate-500">
                  {`View ${city.label} bootcamps, diplomas, and weekend workshops.`}
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-blue-500 transition-colors duration-300 group-hover:text-blue-700">
                Explore Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
