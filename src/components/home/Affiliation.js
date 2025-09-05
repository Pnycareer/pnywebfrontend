'use client'
import React from 'react'
import Image from 'next/image'

const Affiliation = ({ imageSrc = './affiliation.png', imageAlt = 'PNY Trainings government affiliation' }) => {
  return (
    <section className="relative overflow-hidden">
      {/* subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-5 space-y-10">

        {/* Content First */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            Verified Affiliation
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Government Recognized & Affiliated
          </h2>

          <p className="text-base leading-7 text-slate-600 max-w-2xl mx-auto">
            PNY Trainings is proudly affiliated with government bodies and recognized authorities, ensuring credibility,
            trust, and quality in professional IT education.
          </p>

          {/* Pill highlights */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {['Credibility', 'Trust', 'Quality Education', 'Recognized Authorities'].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Mini info cards - Centered grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">Status</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Government Affiliated</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">Assurance</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Industry-Trusted</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">Focus</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Professional IT Training</p>
            </div>
          </div>
        </div>

        {/* Image Last */}
        <div className="relative group">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-200 via-sky-200 to-emerald-200 opacity-60 blur-2xl group-hover:opacity-80 transition-opacity" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-xl">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={800}
              unoptimized
              priority
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Affiliation
