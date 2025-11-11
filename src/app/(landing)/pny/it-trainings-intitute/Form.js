"use client";

import React from "react";

const backgroundImage =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80";

const inputStyles =
  "w-full rounded-md border border-white/30 bg-white/95 px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60";

const Form = () => {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-emerald-900/30" aria-hidden />
        <div className="absolute inset-0 bg-emerald-700/70" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-700/85 to-emerald-500/80" aria-hidden />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 text-white lg:flex-row lg:items-center">
        <div className="max-w-xl space-y-6">
          <div className="flex items-center gap-4">
            <span className="h-12 w-1 rounded bg-white/70" aria-hidden />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-100">
                Winter Batch 2024
              </p>
              <h2 className="text-4xl font-bold">
                Register <span className="text-emerald-200">Now</span>
              </h2>
            </div>
          </div>
          <p className="text-base text-white/85 sm:text-lg">
            Winter admission is going on. We are announcing a special discount
            for the upcoming batch—reserve your seat now and get guidance from
            industry mentors to level up quickly.
          </p>
          <p className="text-lg font-semibold uppercase tracking-wide">
            Get A Free Registration
          </p>
        </div>

        <div className="w-full rounded-3xl bg-white/95 p-8 shadow-2xl shadow-emerald-900/40 backdrop-blur">
          <form className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sr-only" htmlFor="first-name">
                First Name
              </label>
              <input id="first-name" name="firstName" type="text" placeholder="First Name" className={inputStyles} />
              <label className="sr-only" htmlFor="last-name">
                Last Name
              </label>
              <input id="last-name" name="lastName" type="text" placeholder="Last Name" className={inputStyles} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sr-only" htmlFor="phone">
                Phone
              </label>
              <input id="phone" name="phone" placeholder="Phone" className={inputStyles} />
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" placeholder="Email" className={inputStyles} />
            </div>
            <div>
              <label className="sr-only" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Message"
                className={`${inputStyles} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="mx-auto flex items-center justify-center rounded-full bg-emerald-600 px-10 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-emerald-500"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-8 top-10 hidden h-48 w-48 rounded-full border border-white/30 bg-white/10 p-6 text-center text-white/90 shadow-2xl shadow-emerald-950/50 sm:flex sm:flex-col sm:items-center sm:justify-center">
        <p className="text-xs uppercase tracking-[0.55em]">Winter</p>
        <p className="text-4xl font-bold leading-tight">2024</p>
        <p className="text-xs uppercase tracking-[0.35em]">Admission</p>
      </div>
    </section>
  );
};

export default Form;
