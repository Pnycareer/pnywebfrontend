'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Gallery = ({ galleries }) => {
  const [openCategory, setOpenCategory] = useState(null);

  // which image is open: { galleryId, index } | null
  const [selected, setSelected] = useState(null);

  // open first category by default
  useEffect(() => {
    if (galleries?.length > 0) setOpenCategory(galleries[0]._id);
  }, [galleries]);

  const toggleCategory = (id) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  const openImage = (galleryId, index) => {
    setSelected({ galleryId, index });
  };

  const closeImage = () => setSelected(null);

  const currentGallery = selected
    ? galleries.find((g) => g._id === selected.galleryId)
    : null;

  const pictures = currentGallery?.pictures || [];

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

  const currentSrc =
    selected && pictures[selected.index]
      ? `${baseUrl}/${String(pictures[selected.index]).replace(/^\/?/, '')}`
      : null;

  const goPrev = useCallback(() => {
    if (!selected || pictures.length === 0) return;
    setSelected((prev) => ({
      galleryId: prev.galleryId,
      index: (prev.index - 1 + pictures.length) % pictures.length,
    }));
  }, [selected, pictures.length]);

  const goNext = useCallback(() => {
    if (!selected || pictures.length === 0) return;
    setSelected((prev) => ({
      galleryId: prev.galleryId,
      index: (prev.index + 1) % pictures.length,
    }));
  }, [selected, pictures.length]);

  // keyboard controls when modal open
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeImage();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, goPrev, goNext]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 relative">
      <h2 className="text-3xl font-bold mb-6 text-center">Gallery Categories</h2>

      {!galleries?.length ? (
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
                      {gallery.pictures.map((pic, idx) => {
                        const src = `${baseUrl}/${String(pic).replace(/^\/?/, '')}`;
                        return (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="cursor-pointer"
                            onClick={() => openImage(gallery._id, idx)}
                          >
                            <div className="relative h-40 w-full">
                              <Image
                                src={src}
                                alt="Gallery pic"
                                fill
                                unoptimized
                                className="rounded-md object-cover"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Image Popup with prev/next */}
      <AnimatePresence>
        {selected && currentSrc && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            {/* Close button (top-right) */}
            <button
              aria-label="Close"
              className="absolute top-5 right-6 text-white/80 hover:text-white text-3xl leading-none"
              onClick={(e) => {
                e.stopPropagation();
                closeImage();
              }}
            >
              ×
            </button>

            {/* Prev button */}
            {pictures.length > 1 && (
              <button
                aria-label="Previous"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-4xl select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                ‹
              </button>
            )}

            {/* Image */}
            <motion.div
              className="relative w-[90vw] max-w-3xl"
              style={{ height: "80vh" }}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.6 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full w-full">
                <Image
                  src={currentSrc}
                  alt="Big Preview"
                  fill
                  unoptimized
                  className="rounded-lg object-contain"
                  sizes="(max-width: 768px) 90vw, 60vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Next button */}
            {pictures.length > 1 && (
              <button
                aria-label="Next"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-4xl select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                ›
              </button>
            )}

            {/* Counter */}
            {pictures.length > 0 && (
              <div className="absolute bottom-6 text-white/80 text-sm">
                {selected.index + 1} / {pictures.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
