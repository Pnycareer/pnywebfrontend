'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';
import RichTextRenderer from '@/components/RichTextRenderer/RichTextRenderer';

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/news`, { cache: 'no-store' });
        const data = await res.json();
        const sorted = Array.isArray(data)
          ? [...data].sort((a, b) => new Date(b?.date || 0) - new Date(a?.date || 0))
          : [];
        setNewsList(sorted);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  const formatDate = (raw) => {
    if (!raw) return '';
    const d = new Date(raw);
    return isNaN(d)
      ? String(raw)
      : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Newsroom
          </h1>
          <p className="mt-2 text-slate-600">Latest updates and announcements from our team.</p>
        </motion.div>

        {newsList.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
            No news available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsList.map((news, index) => {
              return (
                <motion.article
                  key={news._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h2 className="text-lg font-semibold text-slate-900 leading-snug line-clamp-2">
                    {news.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={news.date}>{formatDate(news.date)}</time>
                  </div>

                  {/* show only preview snippet */}
                  <div className="mt-3 text-sm leading-6 text-slate-700 line-clamp-3">
                    <RichTextRenderer html={news?.description} />
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedNews(news)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                    >
                      Read more
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
            >
              {/* close button */}
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-bold text-slate-900">{selectedNews.title}</h2>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={selectedNews.date}>{formatDate(selectedNews.date)}</time>
              </div>

              <div className="mt-6 text-slate-800">
                <RichTextRenderer html={selectedNews.description} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
