import React from "react";

// Fake data — 8 categories
const categories = [
  {
    id: 1,
    category: "Front End",
    title: "Front End Web Development: From Zero to Modern Web",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Python + React",
    title: "React with Python & Django: Modern AI Web Apps",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "MERN / Next.js",
    title: "Web Development with MERN & Next.js",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Python Core",
    title: "Core Python Programming — Become Expert",
    image:
      "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "UI/UX",
    title: "Figma to React: Ship Production UI",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "TypeScript",
    title: "TypeScript for React & Node Devs",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "DevOps",
    title: "Docker, CI/CD & Cloud for JavaScript Devs",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "Data Viz",
    title: "Charts & Dashboards with React + D3",
    image:
      "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=1400&auto=format&fit=crop",
  },
];

const Coursecategories = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <h1 className="text-3xl text-center mx-auto font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Categories
          </h1>
          {/* optional mini-cta or filter could go here */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl bg-white/5 ring-1 ring-black/5 backdrop-blur transition hover:shadow-xl dark:bg-zinc-900/50 dark:ring-white/5"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03] sm:h-44 lg:h-40"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="space-y-1 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                  {item.category}
                </p>
                <h3 className="line-clamp-2 text-base font-semibold leading-snug sm:text-lg">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coursecategories;