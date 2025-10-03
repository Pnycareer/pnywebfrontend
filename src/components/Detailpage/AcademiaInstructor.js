'use client'
import React from 'react'

const AcademiaInstructor = () => {
  return (
    <div className="w-full flex items-center justify-center p-6 bg-transparent">
      <div className="w-full">
        {/* Card */}
        <div className="relative rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-xl transition-all duration-500">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="shrink-0 grid place-items-center h-14 w-14 rounded-2xl bg-gray-100 ring-1 ring-gray-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7 text-gray-700">
                <path strokeWidth="1.5" d="M22 10.5 12 6 2 10.5l10 4.5 7-3.15V15" />
                <path strokeWidth="1.5" d="M6 12.75V16c0 1.657 2.686 3 6 3s6-1.343 6-3v-3.25" />
              </svg>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                Instructors at PNY Academia
              </h1>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                At PNY Academia, we take pride in our team of highly qualified and experienced teachers who specialize in their respective subjects. Our teachers bring not only academic excellence but also practical knowledge, ensuring that students gain a deep understanding of concepts with real-world relevance. Dedicated to providing quality education, our faculty members are passionate about guiding students towards academic success and personal growth. Through their expertise and commitment, we aim to create a learning environment that inspires, motivates, the potential of every student.
              </p>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                    <path strokeWidth="1.5" d="M12 2l2.4 6.9L22 9.2l-5 4.8 1.3 7-6.3-3.6L5.7 21l1.3-7-5-4.8 7.6-1.3L12 2z" />
                  </svg>
                  Expert Faculty
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                    <path strokeWidth="1.5" d="M4 6h16M4 12h10M4 18h16" />
                  </svg>
                  Real‑world Focus
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                    <path strokeWidth="1.5" d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
                  </svg>
                  Growth Mindset
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-gray-200" />

          {/* Feature list */}
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              {
                title: 'Subject Specialists',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-700">
                    <path strokeWidth="1.5" d="M4 5h16v12H4z" />
                    <path strokeWidth="1.5" d="M8 17v2h8v-2M9 8h6M9 11h6" />
                  </svg>
                ),
              },
              {
                title: 'Hands‑on Learning',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-700">
                    <path strokeWidth="1.5" d="M12 2l8 4-8 4-8-4 8-4zm0 8l8 4-8 4-8-4 8-4z" />
                  </svg>
                ),
              },
              {
                title: 'Mentorship & Support',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-700">
                    <path strokeWidth="1.5" d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                    <path strokeWidth="1.5" d="M4 20a8 8 0 0116 0" />
                  </svg>
                ),
              },
            ].map((f, i) => (
              <li
                key={i}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 hover:bg-gray-100"
              >
                <span className="grid place-items-center h-8 w-8 rounded-lg bg-white ring-1 ring-gray-200">
                  {f.icon}
                </span>
                <span className="text-sm text-gray-800">{f.title}</span>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                <path strokeWidth="1.5" d="M12 6l-8 4 8 4 8-4-8-4zm-6 8l6 3 6-3" />
              </svg>
              <span>PNY Academia • Quality Education</span>
            </div>
            <div className="text-[10px] text-gray-400">© {new Date().getFullYear()} PNY Academia</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcademiaInstructor
