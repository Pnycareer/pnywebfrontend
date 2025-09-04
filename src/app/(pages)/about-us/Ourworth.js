"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, GraduationCap, Briefcase, FileSignature } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function OurWorth() {
  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "100k+", label: "Alumni" },
    { icon: <Briefcase className="w-5 h-5" />, value: "100+", label: "Professional Programs" },
    { icon: <GraduationCap className="w-5 h-5" />, value: "300+", label: "Instructors" },
    { icon: <FileSignature className="w-5 h-5" />, value: "100+", label: "MoUs Signed" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 md:py-24">
      {/* background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* image */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-black/50 shadow-xl bg-slate-200">
              <Image
                src="./test1.jpg" // replace with your public folder asset
                alt="Achievement"
                width={400}
                height={400}
                unoptimized
                priority
              />
              {/* glow ping */}
              <span className="absolute bottom-6 right-6 flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-red-600"></span>
              </span>
            </div>
          </motion.div>

          {/* text + stats */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Our Worth, Our Achievements!
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              We’re only just getting started on our journey. These milestones are proof of our
              commitment to empowering individuals through quality education.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-5 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-2 text-slate-800">
                    {stat.icon}
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <motion.a
              href="#branches"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
            >
              Multiple Branches in Pakistan
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
