"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Particle from "@/components/effects/Particles";

export default function CourseFeature() {
  const [courseFeatures, setCourseFeatures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/coursemodel");
        if (response.data.length > 0) {
          setCourseFeatures(response.data);
          setSelectedLecture(response.data[0].lectures[0]); // Default first lecture
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-blue-500 overflow-hidden p-4">
      {/* Background Effect */}
      <Particle />

      {/* Main Card */}
      <div className="relative w-full max-w-5xl bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-10 border border-gray-600 z-10">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-hidden gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 p-4 bg-black/50 rounded-lg shadow-lg  max-h-[300px] md:max-h-[500px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              📚 Lectures
            </h2>
            <div className="space-y-3">
              {courseFeatures.length > 0 &&
                courseFeatures[0].lectures.map((lecture) => (
                  <button
                    key={lecture.lectureNumber}
                    onClick={() => setSelectedLecture(lecture)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedLecture?.lectureNumber === lecture.lectureNumber
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-gray-800 bg-opacity-50 text-white hover:bg-blue-400"
                    }`}
                  >
                    🎓 Lecture {lecture.lectureNumber}
                  </button>
                ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-4 text-white overflow-y-auto max-h-[calc(90vh-2rem)] md:max-h-[500px]">
            {selectedLecture ? (
              <div>
                <h1 className="md:text-3xl font-extrabold break-words">{selectedLecture.title}</h1>
                <p className="mt-3 md:text-lg text-gray-300">{selectedLecture.content}</p>
                <div className="mt-5">
                  <h3 className="md:text-xl font-semibold text-blue-400">Key Topics:</h3>
                  <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-300">
                    {selectedLecture.topics.map((topic, index) => (
                      <li key={index} className="md:text-lg break-words">{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-lg text-center">Select a lecture to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
