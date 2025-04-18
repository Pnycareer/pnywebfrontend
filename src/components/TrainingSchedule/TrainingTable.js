"use client";

import { motion, AnimatePresence } from "framer-motion";

const formatDays = (days = []) =>
  days.map((d) => `${d.day}: ${d.start_time} - ${d.end_time}`).join(", ");

const calcDuration = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  const months =
    (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth();
  return `${months || 1} month${months !== 1 ? "s" : ""}`;
};

const TrainingTable = ({ courses }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Course Name</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Start Date</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Session Timings</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          <AnimatePresence>
            {courses.map((course) => (
              <motion.tr
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-800">{course.courseName}</td>
                <td className="px-4 py-3 text-gray-800">
                  {new Date(course.start_date).toISOString().split("T")[0]}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  {course.days ? formatDays(course.days) : "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  {calcDuration(course.start_date, course.end_date)}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default TrainingTable;
