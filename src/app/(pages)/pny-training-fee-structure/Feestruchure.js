'use client';
import React, { useState } from 'react';

const FeeStructure = ({ allCourses }) => {
  const cities = ["Lahore", "Rawalpindi", "Multan"];
  const durations = [
    { label: "1 months", value: "1", type: "month" },
    { label: "1.5 months", value: "1.5", type: "month" },
    { label: "2 months", value: "2", type: "month" },
    { label: "3 months", value: "3", type: "month" },
    { label: "4 months", value: "4", type: "month" },
    { label: "6 months", value: "6", type: "month" },
    { label: "12 months", value: "1", type: "year" },
  ];

  const [selectedCity, setSelectedCity] = useState("Lahore");
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);

  const courses = allCourses?.[selectedDuration.label]?.[selectedCity] || [];

  return (
    <div className="p-6">
      {/* City Tabs */}
      <div className="flex space-x-6 border-b mb-6">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`pb-2 px-2 text-md border-b-2 font-semibold ${
              selectedCity === city
                ? "text-blue-600 border-blue-600"
                : "text-black border-transparent"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Duration Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        {durations.map((d) => (
          <button
            key={d.label}
            onClick={() => setSelectedDuration(d)}
            className={`px-4 py-1 border rounded-full text-sm font-medium ${
              selectedDuration.label === d.label
                ? "bg-blue-600 text-white"
                : "text-blue-600 border-blue-600"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Header */}
      <h2 className="text-center text-xl font-bold mb-4">
        {selectedCity} - {selectedDuration.label}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">SERIAL NO</th>
              <th className="text-left px-4 py-2">COURSE NAME</th>
              <th className="text-left px-4 py-2">COURSE FEE</th>
              <th className="text-left px-4 py-2">REGISTRATION FEE</th>
            </tr>
          </thead>
          <tbody>
            {courses?.length > 0 ? (
              courses.map((course, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{course.Program_Name || "N/A"}</td>
                  <td className="px-4 py-2">{course.Program_Fee || "0"}</td>
                  <td className="px-4 py-2">{course.registration_fee || "0"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeStructure;
