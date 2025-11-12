"use client";

import React from "react";

const backgroundImage =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80";

// whiter, crisper inputs
const inputStyles =
  "w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50";

const Form = () => {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background: keep image but lighten overlays for more 'whiteness' */}
      <div className="absolute inset-0 -z-10">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden
        />
        {/* soften tints */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" aria-hidden />
        <div className="absolute inset-0 bg-emerald-500/5" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/60"
          aria-hidden
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 text-slate-900 lg:flex-row lg:items-center">
        {/* Left copy */}
        <div className="max-w-xl space-y-6">
          <div className="flex items-center gap-4">
            <span className="h-12 w-1 rounded bg-emerald-600/70" aria-hidden />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700/80">
                Winter Batch 2025
              </p>
              <h2 className="text-4xl font-bold">
                Register <span className="text-emerald-700">Now</span>
              </h2>
            </div>
          </div>
          <p className="text-base text-slate-600 sm:text-lg">
            Winter admission is going on. We are announcing a special discount
            for the upcoming batch—reserve your seat now and get guidance from
            industry mentors to level up quickly.
          </p>
          <p className="text-lg font-semibold uppercase tracking-wide text-slate-800">
            Get A Free Registration
          </p>
        </div>

        {/* Whiter, crisper form card */}
        <div className="w-full rounded-3xl bg-white p-8 shadow-2xl shadow-emerald-900/10 ring-1 ring-slate-200">
          <form className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sr-only" htmlFor="first-name">
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                placeholder="First Name"
                className={inputStyles}
                autoComplete="given-name"
              />
              <label className="sr-only" htmlFor="last-name">
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                placeholder="Last Name"
                className={inputStyles}
                autoComplete="family-name"
              />
            </div>

            {/* Phone + Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sr-only" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone"
                className={inputStyles}
                autoComplete="tel"
                inputMode="tel"
              />
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className={inputStyles}
                autoComplete="email"
              />
            </div>

            {/* City (new) */}
            <div className="grid gap-4 sm:grid-cols-1">
              <label className="sr-only" htmlFor="city">
                City
              </label>
              <select
                id="city"
                name="city"
                className={`${inputStyles} appearance-none`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select City
                </option>
                <option>Karachi</option>
                <option>Lahore</option>
                <option>Islamabad</option>
                <option>Rawalpindi</option>
                <option>Faisalabad</option>
                <option>Other</option>
              </select>

              {/* optional: course or empty spacer to keep grid tidy */}
              <div className="hidden sm:block" aria-hidden />
            </div>

            {/* Message */}
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
              className="mx-auto flex items-center justify-center rounded-full bg-emerald-600 px-10 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>

      {/* Corner badge updated to 2025 and lighter styling */}
      <div className="pointer-events-none absolute -right-8 top-10 hidden h-48 w-48 rounded-full border border-slate-200 bg-white/70 p-6 text-center text-slate-800 shadow-2xl shadow-slate-400/30 backdrop-blur-sm sm:flex sm:flex-col sm:items-center sm:justify-center">
        <p className="text-xs uppercase tracking-[0.55em] text-slate-600">Winter</p>
        <p className="text-4xl font-bold leading-tight">2025</p>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-600">Admission</p>
      </div>
    </section>
  );
};

export default Form;
