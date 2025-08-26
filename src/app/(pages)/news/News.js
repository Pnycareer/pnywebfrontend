'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [expandedNews, setExpandedNews] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/news`, {
          cache: 'no-store',
        });
        const data = await res.json();
        // optional: newest first if your API isn't already sorted
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

  const toggleReadMore = (newsId) => {
    setExpandedNews((prev) => ({ ...prev, [newsId]: !prev[newsId] }));
  };

  const formatDate = (raw) => {
    if (!raw) return '';
    const d = new Date(raw);
    return isNaN(d) ? String(raw) : d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
          <p className="mt-2 text-slate-600">
            Latest updates and announcements from our team.
          </p>
        </motion.div>

        {newsList.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
            No news available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsList.map((news, index) => {
              const isExpanded = !!expandedNews[news._id];
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

                  <p
                    className={[
                      'mt-3 text-sm leading-6 text-slate-700',
                      isExpanded ? '' : 'line-clamp-3',
                    ].join(' ')}
                  >
                    {news?.description || ''}
                  </p>

                  {news?.description && news.description.length > 160 && (
                    <div className="mt-4">
                      <button
                        onClick={() => toggleReadMore(news._id)}
                        aria-expanded={isExpanded}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
