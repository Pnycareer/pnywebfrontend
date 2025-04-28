'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = ({ galleries }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Open the first category by default
    if (galleries.length > 0) {
      setOpenCategory(galleries[0]._id);
    }
  }, [galleries]);

  const toggleCategory = (id) => {
    if (openCategory === id) {
      setOpenCategory(null);
    } else {
      setOpenCategory(id);
    }
  };

  const openImage = (src) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 relative">
      <h2 className="text-3xl font-bold mb-6 text-center">Gallery Categories</h2>

      {galleries.length === 0 ? (
        <div className="text-center">No categories found.</div>
      ) : (
        <div className="space-y-4">
          {galleries.map((gallery) => (
            <div key={gallery._id} className="bg-gray-100 rounded-lg shadow">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleCategory(gallery._id)}
              >
                <h3 className="text-xl font-semibold">{gallery.category_Name}</h3>
                <div className="text-2xl">{openCategory === gallery._id ? '▲' : '▼'}</div>
              </div>

              <AnimatePresence>
                {openCategory === gallery._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden px-4 pb-4"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {gallery.pictures.map((pic, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="cursor-pointer"
                          onClick={() => openImage(`${
                            process.env.NEXT_PUBLIC_API_URL
                          }/${pic}`)}
                        >
                          <img
                            src={`${
                                process.env.NEXT_PUBLIC_API_URL
                              }/${pic}`}
                            alt="Gallery pic"
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      {/* Image Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <motion.img
              src={selectedImage}
              alt="Big Preview"
              className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
