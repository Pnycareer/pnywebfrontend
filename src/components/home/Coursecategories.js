"use client";
import Image from "next/image";
import Link from "next/link";
import { Oswald } from 'next/font/google';
import { CATEGORY_CARDS as CARDS } from "@/app/lib/categoryData";

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

export default function Coursecategories() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#e8fbff_0%,#eef5ff_40%,#ecebff_100%)]">
      {/* soft ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 z-0 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute -top-24 right-[-8%] z-0 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.18),transparent_60%)] blur-2xl" />

      {/* faint outlined word */}
      <div className="pointer-events-none absolute inset-x-0 top-6 z-0 flex justify-center">
        <span
          className="select-none text-[15vw] leading-none font-extrabold tracking-[-0.04em] uppercase"
          style={{
            WebkitTextStroke: "2px rgba(14,165,233,0.25)",
            color: "transparent",
          }}
        >
          categories
        </span>
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* hero */}
        <div className="mx-auto max-w-6xl py-16 md:py-20 lg:py-24 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-teal-700 font-os">
            Top Course Categories
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base sm:text-lg text-zinc-600">
            PNY Trainings offers top in-demand, career-focused courses designed
            to equip you with money-making skills. Select the course category
            that best fits your career path to gain practical knowledge, sharpen
            your expertise, and achieve your professional goals with confidence.
          </p>
        </div>

        {/* cards */}
        <div className="pb-12 lg:pb-16">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <article
                key={card.title}
                className="group h-full flex flex-col overflow-hidden rounded-[20px] bg-white/60 backdrop-blur-[2px] ring-1 ring-black/5 shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition hover:shadow-[0_22px_56px_rgba(0,0,0,0.12)]"
              >
                {/* IMAGE: rounded only on the TOP so the bottom edge is straight */}
                <div className="relative h-56 md:h-60 w-full">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover rounded-t-[20px] rounded-b-none transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* body (flex column so button can pin to bottom) */}
                <div className="flex flex-col h-auto px-6 md:px-7 pt-7 pb-8 bg-white/85 text-center">
                  <h3 className={`text-2xl md:text-4xl leading-tight  text-teal-700 ${oswald.className}`}>
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[1.02rem] leading-7 text-zinc-600">
                    {card.desc}
                  </p>

                  {/* button pinned to bottom across all cards */}
                  <div className="mt-auto pt-6 flex justify-center">
                    <Link
                      href={`/courses/${card.href}`}
                      className={`inline-flex items-center justify-center rounded-md border border-teal-700 px-6 py-3 text-base md:text-lg font-medium text-teal-700 transition hover:bg-teal-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600 ${oswald.className}`}
                    >
                      Discover Courses
                      <svg
                        className="ml-2 h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* bottom CTA */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-md bg-teal-700 px-7 py-3.5 text-base md:text-lg font-semibold text-white shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600"
              aria-label="Explore all course categories"
            >
              Explore All Courses
              <svg
                className="ml-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* bottom glow */}
      <div className="pointer-events-none absolute -bottom-40 left-[-10%] z-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.16),transparent_60%)] blur-2xl" />
    </section>
  );
}
