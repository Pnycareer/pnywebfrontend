"use client";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance"; // adjust path as needed

const CourseSelect = ({ selected, setSelected }) => {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get("/courses/get-course");
        if (res.data.success) {
          const courseNames = res.data.data.flatMap((cat) =>
            cat.courses.map((course) => course.course_Name)
          );
          setCourses(courseNames);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses =
    query === ""
      ? courses
      : courses.filter((course) =>
          course.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <Combobox.Input
            className="w-full border p-3 rounded text-sm"
            displayValue={(course) => course}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onClick={() => setIsOpen(true)}
            onFocus={() => setIsOpen(true)}
            placeholder="Select a course"
          />

          <AnimatePresence>
            {isOpen && filteredCourses.length > 0 && (
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setIsOpen(false)}
              >
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  {filteredCourses.map((course, index) => (
                    <Combobox.Option
                      key={index}
                      value={course}
                      className={({ active }) =>
                        `cursor-pointer select-none relative py-2 pl-4 pr-4 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {course}
                        </span>
                      )}
                    </Combobox.Option>
                  ))}
                </motion.ul>
              </Transition>
            )}
          </AnimatePresence>
        </div>
      </Combobox>
    </div>
  );
};

export default CourseSelect;
