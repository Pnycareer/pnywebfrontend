"use client";
import { motion } from "framer-motion";
import {
  Book,
  Users,
  Briefcase,
  GraduationCap,
  Video,
  UserCheck,
} from "lucide-react";
import React from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, 
};

const gridReveal = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 1, 
      delay: 0.3,
      ease: "easeOut"
    } 
  },
};

const itemHover = { 
  scale: 1.08,
  y: -8,
  transition: { type: "spring", stiffness: 400, damping: 25 }
};

const benefits = [
  { 
    icon: Book, 
    text: "Learning Management", 
    color: "text-sky-600", 
    badge: "from-sky-400/20 via-sky-300/30 to-sky-500/20",
    description: "Advanced learning platform with AI-powered progress tracking",
    gradient: "from-sky-400 via-blue-500 to-indigo-600"
  },
  { 
    icon: UserCheck, 
    text: "Instructor Support", 
    color: "text-emerald-600", 
    badge: "from-emerald-400/20 via-emerald-300/30 to-emerald-500/20",
    description: "24/7 direct access to industry experts",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600"
  },
  { 
    icon: Briefcase, 
    text: "Internship Opportunity", 
    color: "text-amber-600", 
    badge: "from-amber-400/20 via-amber-300/30 to-amber-500/20",
    description: "Guaranteed real-world experience placement",
    gradient: "from-amber-400 via-orange-500 to-red-600"
  },
  { 
    icon: GraduationCap, 
    text: "Job Cell", 
    color: "text-indigo-600", 
    badge: "from-indigo-400/20 via-indigo-300/30 to-indigo-500/20",
    description: "Premium career placement with top companies",
    gradient: "from-indigo-400 via-purple-500 to-pink-600"
  },
  { 
    icon: Users, 
    text: "NEXT Community", 
    color: "text-fuchsia-600", 
    badge: "from-fuchsia-400/20 via-fuchsia-300/30 to-fuchsia-500/20",
    description: "Exclusive alumni network with global reach",
    gradient: "from-fuchsia-400 via-pink-500 to-rose-600"
  },
  { 
    icon: Video, 
    text: "Free Seminar Access", 
    color: "text-rose-600", 
    badge: "from-rose-400/20 via-rose-300/30 to-rose-500/20",
    description: "Premium seminars and workshops included",
    gradient: "from-rose-400 via-pink-500 to-purple-600"
  },
];

const BenefitsSection = ({ className = "" }) => {
  return (
    <section
      aria-labelledby="benefits-heading"
      className={`relative isolate overflow-hidden py-24 px-6 md:px-12 lg:px-20 ${className}`}
    >
      {/* Next-level gradient system */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] -z-10 rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(59,130,246,0.35), rgba(99,102,241,0.25), rgba(147,51,234,0.15), rgba(168,85,247,0.08), transparent)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[700px] w-[700px] -z-10 rounded-full opacity-45 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(16,185,129,0.30), rgba(59,130,246,0.20), rgba(244,63,94,0.12), rgba(236,72,153,0.08), transparent)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 -z-10 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgba(168,85,247,0.25), rgba(236,72,153,0.15), rgba(244,63,94,0.10), transparent)",
          mixBlendMode: "soft-light",
        }}
      />

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-20"
        >
          <h3
            id="benefits-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-8"
          >
            Unlock{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Premium Benefits
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700">
              with Course Enrollment
            </span>
          </h3>

          <p className="mx-auto max-w-4xl text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            Discover comprehensive opportunities designed to accelerate your personal and professional growth, 
            providing you with the tools and connections needed for career advancement.
          </p>
        </motion.div>

        <motion.div
          variants={gridReveal}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 max-w-7xl mx-auto"
        >
          {benefits.map(({ icon: Icon, text, color, badge, description, gradient }, index) => (
            <motion.div
              key={text}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.8 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.8, 
                    delay: 0.1 * index,
                    ease: "easeOut"
                  } 
                }
              }}
              initial="hidden"
              animate="show"
              whileHover={itemHover}
              className="group relative"
            >
              {/* Enhanced icon container with next-level effects */}
              <div className={`relative mb-6 mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br ${badge} flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500  backdrop-blur-sm`}>
                <Icon
                  size={36}
                  className={`${color} drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500`}
                  aria-hidden
                />
                
                {/* Advanced glow effects */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500`} />
                <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
                  <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-100" />
                  <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-200" />
                </div>
              </div>

              {/* Enhanced text content */}
              <div className="relative">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  {text}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-[140px] mx-auto font-medium">
                  {description}
                </p>
                
                {/* Subtle underline effect */}
                <div className={`absolute -bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r ${gradient} -translate-x-1/2 group-hover:w-16 transition-all duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
