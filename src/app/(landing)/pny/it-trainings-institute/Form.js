"use client";

import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import CustomToast from "@/components/customalert/CustomAlert";

const backgroundImage =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80";

const inputStyles =
  "w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50";

const courseOptions = [
  "Certified Full Stack Web Development with Advanced Ai (6 months)",
  "Become A Full Stack Graphic Designer (Basic To Intermediate) Level With AI",
  "Certified Digital Media Marketing Skills with Ai Enhanced Course (06 Months)",
  "Agentic Ai 1 year Diploma",
];

const Form = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cityQuery, setCityQuery] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [allCities, setAllCities] = React.useState([]);
  const [cityLoading, setCityLoading] = React.useState(false);
  const [cityError, setCityError] = React.useState("");

  const [cityDropdownOpen, setCityDropdownOpen] = React.useState(false);
  const [citySearch, setCitySearch] = React.useState("");
  const cityDropdownRef = React.useRef(null);

  const [toastState, setToastState] = React.useState({
    open: false,
    type: "info",
    message: "",
  });

  const showToast = (type, message) => {
    setToastState({ open: true, type, message });
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  // load cities (Pakistan)
  React.useEffect(() => {
    const fetchCities = async () => {
      try {
        setCityLoading(true);
        setCityError("");

        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "Pakistan" }),
          }
        );

        if (!res.ok) throw new Error("City API request failed");

        const data = await res.json();
        if (data.error) throw new Error(data.msg);

        const citiesArray = Array.isArray(data.data) ? data.data : [];
        setAllCities(citiesArray);
      } catch (err) {
        console.error(err);
        setCityError("Could not load cities");
        showToast("error", "Could not load cities. Please try again.");
      } finally {
        setCityLoading(false);
      }
    };

    fetchCities();
  }, []);

  const filteredCities = React.useMemo(() => {
    if (!citySearch.trim()) return allCities.slice(0, 50);
    const q = citySearch.toLowerCase();
    return allCities
      .filter((city) => city.toLowerCase().includes(q))
      .slice(0, 50);
  }, [citySearch, allCities]);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(e.target)
      ) {
        setCityDropdownOpen(false);
      }
    };

    if (cityDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cityDropdownOpen]);

  const handleCitySelect = (cityName) => {
    setCityQuery(cityName);
    setCityDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple required-field validation (message is optional)
    const isEmpty = (v) => !v || !String(v).trim();

    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(phone) ||
      isEmpty(email) ||
      isEmpty(cityQuery) ||
      isEmpty(course)
    ) {
      showToast(
        "error",
        "All fields except message are required. Please fill out the form."
      );
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      firstName,
      lastName,
      phone,
      email,
      city: cityQuery,
      course,
      message,
    };

    try {
      const res = await axiosInstance.post("/api/enrollments", payload);

      if (res.status !== 201 && res.status !== 200) {
        showToast("error", "Failed to submit form. Please try again.");
        return;
      }

      // reset fields
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setCityQuery("");
      setCourse("");
      setMessage("");
      setCitySearch("");

      showToast("success", "Thank you! Your registration has been submitted.");
    } catch (err) {
      console.error("Submit error", err);
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative isolate overflow-hidden" id="enroll-form">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-emerald-500/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/60" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 text-slate-900 lg:flex-row lg:items-center">
          {/* Left Section */}
          <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-4">
              <span className="h-12 w-1 rounded bg-emerald-600/70" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700/80">
                  Winter Batch 2025
                </p>
                <h2 className="text-4xl font-bold">
                  Register{" "}
                  <span className="text-emerald-700">
                    Today and Start Your Learning Journey
                  </span>
                </h2>
              </div>
            </div>
            <p className="text-base text-slate-600 sm:text-lg">
              Fill out the enrollment form to secure your seat. Our team will
              contact you with next steps.
            </p>
            <p className="text-lg font-semibold uppercase tracking-wide text-slate-800">
              Get Registration
            </p>
          </div>

          {/* Form Card */}
          <div className="w-full rounded-3xl bg-white p-8 shadow-2xl shadow-emerald-900/10 ring-1 ring-slate-200">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className={inputStyles}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={inputStyles}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Phone + Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="tel"
                  placeholder="Phone"
                  className={inputStyles}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={inputStyles}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* City + Course */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* City dropdown */}
                <div className="relative" ref={cityDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      if (cityLoading || cityError) return;
                      setCityDropdownOpen((prev) => !prev);
                      setCitySearch("");
                    }}
                    className={`${inputStyles} flex items-center justify-between`}
                  >
                    <span
                      className={
                        cityQuery
                          ? "truncate text-left"
                          : "truncate text-left text-slate-400"
                      }
                    >
                      {cityQuery
                        ? cityQuery
                        : cityLoading
                        ? "Loading cities..."
                        : cityError
                        ? "Failed to load cities"
                        : "Select City"}
                    </span>

                    <span
                      className={`ml-2 inline-flex h-4 w-4 items-center justify-center transition-transform ${
                        cityDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {cityDropdownOpen && !cityLoading && !cityError && (
                    <div className="absolute left-0 right-0 z-20 mt-1 rounded-md border border-slate-200 bg-white shadow-lg">
                      <div className="border-b border-slate-100 p-2">
                        <input
                          type="text"
                          placeholder="Search city..."
                          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-800"
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                        />
                      </div>

                      <ul className="max-h-56 overflow-auto text-sm">
                        {filteredCities.length > 0 ? (
                          filteredCities.map((city) => (
                            <li
                              key={city}
                              onClick={() => handleCitySelect(city)}
                              className="cursor-pointer px-3 py-2 hover:bg-emerald-50"
                            >
                              {city}
                            </li>
                          ))
                        ) : (
                          <li className="px-3 py-2 text-slate-400">
                            No cities found
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Course dropdown */}
                <select
                  className={`${inputStyles} appearance-none`}
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {courseOptions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Message (optional) */}
              <textarea
                rows={4}
                placeholder="Message (optional)"
                className={`${inputStyles} resize-none`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mx-auto flex items-center justify-center rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition 
                  ${
                    isSubmitting
                      ? "bg-emerald-400 cursor-not-allowed opacity-70"
                      : "bg-emerald-600 hover:bg-emerald-500"
                  }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Now"}
              </button>
            </form>
          </div>
        </div>

        {/* Corner Badge */}
        <div className="pointer-events-none absolute -right-8 top-10 hidden h-48 w-48 rounded-full border border-slate-200 bg-white/70 p-6 text-center text-slate-800 shadow-2xl shadow-slate-400/30 backdrop-blur-sm sm:flex sm:flex-col sm:items-center sm:justify-center">
          <p className="text-xs uppercase tracking-[0.55em] text-slate-600">
            Winter
          </p>
          <p className="text-4xl font-bold leading-tight">2025</p>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-600">
            Admission
          </p>
        </div>
      </section>

      <CustomToast
        open={toastState.open}
        type={toastState.type}
        message={toastState.message}
        onClose={() => setToastState((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default Form;
