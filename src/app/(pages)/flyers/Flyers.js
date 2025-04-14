// app/Flyers.jsx
"use client";

import React, { useEffect, useState } from "react";

const Flyers = () => {
  const [flyersData, setFlyersData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchFlyers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eflyer`);
        const data = await res.json();
        setFlyersData(data);
      } catch (error) {
        console.error("Error fetching flyers:", error);
      }
    };

    fetchFlyers();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="p-8">
      {!selectedCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {flyersData.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${category.imageUrl.replace("\\", "/")}`}
                alt={category.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 bg-white">
                <h2 className="text-lg font-bold">{category.name}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={handleBack}
            className="mb-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-4">{selectedCategory.name} Flyers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {selectedCategory.eflyers.map((flyer) => (
              <div
                key={flyer._id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{flyer.title}</h3>
                <p className="mb-4">{flyer.description}</p>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/${flyer.brochureUrl.replace("\\", "/")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Brochure
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Flyers;
