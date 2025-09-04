"use client";

import { motion } from "framer-motion";
import {
  User,
  Heart,
  LineChart,
  Smile,
  Flag,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function GrowTogether() {
  const features = [
    {
      title: "Expert Instructors",
      icon: User,
      desc: "Experienced trainers bring real-world expertise to ensure you receive top-quality IT education.",
    },
    {
      title: "Customized Learning",
      icon: Heart,
      desc: "Courses designed to fit your needs, whether you're a beginner or advanced professional.",
      highlight: true,
    },
    {
      title: "Interactive Learning",
      icon: LineChart,
      desc: "Dynamic, collaborative classes that deepen your understanding of IT concepts and skills.",
    },
    {
      title: "Flexible Learning",
      icon: Smile,
      desc: "Choose in-person or online classes, learning at your own pace and convenience.",
    },
    {
      title: "Career Support",
      icon: Flag,
      desc: "We guide your career pathways and assist with job placements to achieve your goals.",
    },
    {
      title: "Industry-Relevant Content",
      icon: Sparkles,
      desc: "Our curriculum reflects the latest industry trends and emerging technologies.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-16 md:py-24">
      {/* background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            We Connect, We Grow Together
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            We consider your part to empower, develop, and embrace the everyday chore.
          </p>
        </motion.div>

        {/* features grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl p-6 shadow-md backdrop-blur transition hover:shadow-lg ${
                  feature.highlight
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-900 border border-slate-200"
                }`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 mx-auto items-center justify-center rounded-xl ${
                    feature.highlight
                      ? "bg-white/20 text-white"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3
                  className={`text-lg font-semibold text-center mb-2 ${
                    feature.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm text-center ${
                    feature.highlight ? "text-white/90" : "text-slate-600"
                  }`}
                >
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
