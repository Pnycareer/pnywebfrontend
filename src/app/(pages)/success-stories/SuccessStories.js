'use client'
import React from 'react'

const heroImage =
  'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=1600&q=80'

const imageStories = [
  {
    id: 'amina',
    name: 'Amina Khan',
    program: 'Full-Stack Engineering • Spring 2025',
    location: 'Lagos, Nigeria',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    description:
      'Amina launched a payment insights dashboard during demo day and now ships features at Flutterwave with her capstone team.',
  },
  {
    id: 'mateo',
    name: 'Mateo Ruiz',
    program: 'Product Design • Summer 2024',
    location: 'Bogotá, Colombia',
    image:
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80',
    description:
      'Mateo sketched his agritech solution in the design sprints and turned it into a venture-backed startup serving 40k farmers.',
  },
  {
    id: 'saanvi',
    name: 'Saanvi Sharma',
    program: 'Data Science • Remote Flex',
    location: 'Delhi, India',
    image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=900&q=80',
    description:
      'Saanvi balanced family life with a remote schedule, built a churn prediction model, and joined Microsoft’s Applied AI team.',
  },
]

const videoStories = [
  {
    id: 'leo',
    name: 'Leo Lin',
    program: 'Product Leadership • Cohort 7',
    videoUrl: 'https://www.youtube.com/embed/YU9i-DV3ZMU',
    highlight:
      'Leo explains how the Leadership Studio helped him present a logistics overhaul that secured a PM role at Grab.',
  },
  {
    id: 'nadia',
    name: 'Nadia Cherif',
    program: 'Analytics • Returnship Track',
    videoUrl: 'https://www.youtube.com/embed/jCC8f5nVNE8',
    highlight:
      'Nadia shares her journey back into tech, using flexible pacing and mentor pods to land at Careem as a data analyst.',
  },
]

const SuccessStories = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative">
        <div className="relative mx-auto h-[320px] max-w-6xl overflow-hidden rounded-b-3xl sm:h-[420px]">
          <img
            src={heroImage}
            alt="Students celebrating a project launch"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
              Student Wins
            </span>
            <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-snug text-white sm:text-4xl">
              Real students, real launches, and the confidence to keep going.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-200 sm:text-base">
              Scroll to see the teams we are cheering for this month—each story
              started with a single idea in the studio.
            </p>
          </div>
        </div>
      </header>

      <main className="space-y-20 py-16">
        <section className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Photo highlights
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
                Meet the builders behind our latest capstones. Every snapshot
                captures the moment they realized their product was ready for
                the world.
              </p>
            </div>
            <a
              href="/gallery"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 hover:text-emerald-200"
            >
              View full gallery →
            </a>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {imageStories.map((story) => (
              <article
                key={story.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow shadow-emerald-500/10"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={story.image}
                    alt={`${story.name} from ${story.location}`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
                </div>
                <div className="space-y-3 p-6">
                  <div>
                    <p className="text-sm font-semibold text-emerald-200">{story.program}</p>
                    <p className="text-lg font-semibold text-white">{story.name}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {story.location}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{story.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Video spotlights
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
                Hit play to hear what flipped the switch for these alumni—short,
                honest reflections straight from our studio couches.
              </p>
            </div>
            <a
              href="/events"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 hover:text-emerald-200"
            >
              Join a live AMA →
            </a>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {videoStories.map((story) => (
              <article
                key={story.id}
                className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow shadow-emerald-500/10"
              >
                <div className="relative w-full overflow-hidden rounded-2xl pb-[56.25%]">
                  <iframe
                    src={story.videoUrl}
                    title={`${story.name} success story`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-200">{story.program}</p>
                  <p className="text-lg font-semibold text-white">{story.name}</p>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{story.highlight}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default SuccessStories
