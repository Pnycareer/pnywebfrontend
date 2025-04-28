'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/news`);
        const data = await res.json();
        setNewsList(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-400"
      >
        Latest News & Updates
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.length > 0 ? (
          newsList.map((news, index) => (
            <motion.div 
              key={news._id}
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-lg p-6 border border-white/40 hover:scale-105 transition-transform cursor-pointer"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{news.title}</h2>
              <p className="text-gray-600 mb-4">{news.description}</p>
              <p className="text-sm text-gray-500">{news.date}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">No news available.</p>
        )}
      </div>
    </div>
  );
}
