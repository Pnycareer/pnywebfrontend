"use client";
import { useRouter } from "next/navigation";

export default function CityCourses() {
  const navigate = useRouter();
  const cities = [
    "lahore",
    "rawalpindi",
    "karachi",
    "multan",
    "sialkot",
    "faisalabad",
    "gujranwala",
    "azad-Kashmir",
    "islamabad",
    "sargodha",
  ];

  const redirectToCity = (cityName) => {
    navigate.push(`/city/${cityName}`);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 py-10 px-5">
      <p className=" text-sm md:text-xl font-bold text-gray-800">
        Courses We Offer in Cities
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {cities.map((city) => (
          <button
            key={city}
            className="bg-gray-500 text-white font-semibold px-3 py-2 hover:bg-gray-700 cursor-pointer transition-all duration-300"
            onClick={() => redirectToCity(city)}
          >
            {city.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
