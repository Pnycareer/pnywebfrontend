"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const features = [
  {
    title: "AI & Robotics",
    subtitle: "Master the tech that's shaping tomorrow",
    animation: "https://lottie.host/75622fa9-d0d8-493c-9b7c-d1d07a086341/NVLW1u7YA5.lottie",
  },
  {
    title: "Data & Analytics",
    subtitle: "Turn raw data into business gold",
    animation: "https://lottie.host/9e015b22-1b77-457b-88ab-51dfea1e736a/81Lv7TNBFW.lottie",
  },
  {
    title: "Smart Bots",
    subtitle: "Build intelligent assistants and automations",
    animation: "https://lottie.host/0237c7cf-ffc2-418e-bee0-7d4fbbc00970/4DM7dCeC9B.lottie",
  },
];

const Animation = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-[#eef3f8] via-[#d8e5ff] to-[#eef3f8]">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Explore What You Can Learn
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl backdrop-blur-lg bg-white/30 shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="h-52">
              <DotLottieReact
                src={feature.animation}
                autoplay
                loop
              />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-center">{feature.title}</h3>
            <p className="text-sm text-gray-600 text-center mt-2">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Animation;
