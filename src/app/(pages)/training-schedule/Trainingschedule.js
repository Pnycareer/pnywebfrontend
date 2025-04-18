"use client";

import TrainingTable from "@/components/TrainingSchedule/TrainingTable";
import React, { useEffect, useState } from "react";

const Trainingschedule = ({ batches }) => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [search, setSearch] = useState("");
  
    // Initialize default city and branch after data is passed in
    useEffect(() => {
      const defaultCity = Object.keys(batches)[0];
      setSelectedCity(defaultCity);
  
      const firstBranch = batches[defaultCity]?.[0]?.branch?.DivisionName;
      setSelectedBranch(firstBranch);
    }, [batches]);
  
    const cities = Object.keys(batches || {});
    const branches = Array.from(
      new Set(batches[selectedCity]?.map((b) => b.branch?.DivisionName))
    );
  
    const filtered = (batches[selectedCity] || [])
      .filter((b) => b.branch?.DivisionName === selectedBranch)
      .filter((b) => b.courseName.toLowerCase().includes(search.toLowerCase()));
  
    // Optional: loading fallback if batches are empty
    if (!selectedCity || !selectedBranch) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      );
    }
  
    return (
      <>
        {/* Header Section */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="text-sm text-gray-600 mb-4 flex items-center space-x-2">
            <span className="text-black">Home</span>
            <span>›</span>
            <span className="text-red-500 font-medium">Trainings</span>
          </div>
  
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="text-3xl font-bold text-black">Training Schedule</h1>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md text-sm hover:bg-blue-50 transition">
                Enrol Now (Limited seats left)
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600 transition">
                Fee Structure
              </button>
            </div>
          </div>
        </div>
  
        {/* Filters */}
        <div className="px-6 py-4">
          <div className="flex space-x-4 border-b mb-4">
            {cities.map((city) => (
              <button
                key={city}
                className={`pb-2 px-2 text-sm border-b-2 ${
                  selectedCity === city
                    ? "text-blue-600 border-blue-600"
                    : "text-black border-transparent"
                }`}
                onClick={() => {
                  setSelectedCity(city);
                  const firstBranch = batches[city][0]?.branch?.DivisionName;
                  setSelectedBranch(firstBranch);
                }}
              >
                {city}
              </button>
            ))}
          </div>
  
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {branches.map((branch) => (
              <button
                key={branch}
                className={`px-4 py-1 border rounded ${
                  selectedBranch === branch
                    ? "bg-blue-500 text-white"
                    : "border-blue-500 text-blue-500"
                }`}
                onClick={() => setSelectedBranch(branch)}
              >
                {branch}
              </button>
            ))}
            <input
              type="text"
              placeholder="Search"
              className="border px-3 py-1 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
  
          <TrainingTable courses={filtered} />
        </div>
      </>
    );
  };


export default Trainingschedule