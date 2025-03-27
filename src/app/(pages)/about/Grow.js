'use client';
import React from 'react';
import { Heart, User, Smile, Flag, LineChart, Sparkle } from 'lucide-react';

const GrowTogether = () => {
  const features = [
    {
      title: 'Expert Instructors',
      icon: <User size={32} />,
      desc: 'Our experienced trainers bring real-world expertise to every class, ensuring you receive top-quality IT education.',
    },
    {
      title: 'Customized Learning',
      icon: <Heart size={32} />,
      desc: "Advance courses to meet your needs, whether you're a beginner or an experienced professional in the IT field.",
      highlight: true,
    },
    {
      title: 'Interactive Learning',
      icon: <LineChart size={32} />,
      desc: 'Engage in dynamic, interactive classes that foster collaboration and deep understanding of IT concepts and skills.',
    },
    {
      title: 'Flexible Learning',
      icon: <Smile size={32} />,
      desc: 'Choose from in-person or online classes, allowing you to learn at your own pace and convenience.',
    },
    {
      title: 'Career Support',
      icon: <Flag size={32} />,
      desc: 'We provide guidance on career pathways and job placement assistance to help you achieve your professional goals.',
    },
    {
      title: 'Industry-Relevant Content',
      icon: <Sparkle size={32} />,
      desc: 'Our up-to-date curriculum reflects the latest trends and technologies in the IT industry.',
    },
  ];

  return (
    <section className="w-full px-4 py-16 sm:px-8 md:px-16 lg:px-24 bg-white text-black">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">We Connect, We Grow Together</h2>
        <p className="text-gray-700 mt-2">
          We consider your part to empower, develop, and embrace the everyday chore.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 shadow-md transition-all duration-300 ${
              feature.highlight
                ? 'bg-blue-500 text-white hover:brightness-110'
                : 'bg-white text-black hover:shadow-lg'
            }`}
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className={`text-lg font-bold text-center mb-2 ${feature.highlight ? 'text-white' : 'text-black'}`}>
              {feature.title}
            </h3>
            <p className={`text-sm text-center ${feature.highlight ? 'text-white/90' : 'text-gray-600'}`}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GrowTogether;
