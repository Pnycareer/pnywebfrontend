"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Feestruchure = ({ initialCourses}) => {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCity, setSelectedCity] = useState("Lahore");
  const [selectedDuration, setSelectedDuration] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        let url = "";

        if (searchTerm) {
          url = `https://lms.pnytraining.com/api/searchCourseByName?search=${searchTerm}`;
          const res = await fetch(url);
          const data = await res.json();

          const aggregatedCourses = [];
          for (const city in data.Courses) {
            aggregatedCourses.push(...data.Courses[city]);
          }
          setCourses(aggregatedCourses);
        } else {
          url = `https://lms.pnytraining.com/api/feeStructure?duration=${selectedDuration}&type=${
            selectedDuration === "1-year" ? "year" : "month"
          }`;
          const res = await fetch(url);
          const data = await res.json();
          setCourses(data.Courses[selectedCity] || []);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCity, selectedDuration, searchTerm]);

  return (
    <div className="bg-white text-black">
      <section className="text-gray-600 body-font px-6 py-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold">Fee Structure</h1>
          <div className="flex gap-3">
            <a href="https://lms.pnytraining.com/" target="_blank" rel="noopener noreferrer">
              <button className="border px-4 py-2 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition">
                Enroll Now
              </button>
            </a>
            <Link href="/training-schedule">
              <button className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition">
                Training Schedule.
              </button>
            </Link>
          </div>
        </div>

        {/* City Tabs */}
        <div className="mt-6 flex gap-4 border-b">
          {["Lahore", "Rawalpindi", "Multan"].map((city) => (
            <button
              key={city}
              className={`pb-2 border-b-2 text-sm ${
                selectedCity === city
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-700"
              }`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Durations + Search Input (aligned) */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap gap-2">
            {["1", "1.5", "2", "3", "4", "6", "1-year"].map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`text-sm px-3 py-1 rounded ${
                  selectedDuration === duration
                    ? "bg-blue-500 text-white"
                    : "border border-blue-500 text-blue-500"
                }`}
              >
                {duration.includes("year") ? "12 months" : `${duration} months`}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search course name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table or Loader */}
        {isLoading ? (
            <div className="mt-6 overflow-x-auto animate-pulse">
            <table className="min-w-full border">
              <thead className="bg-gray-100 text-left text-sm">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Course Name</th>
                  <th className="px-4 py-2">Course Fee</th>
                  <th className="px-4 py-2">Registration Fee</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="border-t text-sm">
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded w-6" />
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded w-48" />
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100 text-left text-sm">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Course Name</th>
                  <th className="px-4 py-2">Course Fee</th>
                  <th className="px-4 py-2">Registration Fee</th>
                </tr>
              </thead>
              <tbody>
                {courses?.length > 0 ? (
                  courses.map((course, idx) => (
                    <motion.tr
                      key={course.Program_Id}
                      className="border-t text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">{course.Program_Name}</td>
                      <td className="px-4 py-2">{course.Program_Fee}</td>
                      <td className="px-4 py-2">{course.registration_fee}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-4" colSpan={4}>
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Feestruchure;
