import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import one from "../../assets/whychooseus/1.png";
import two from "../../assets/whychooseus/2.png";
import three from "../../assets/whychooseus/3.png";
import four from "../../assets/whychooseus/4.png";
import five from "../../assets/whychooseus/5.png";
import six from "../../assets/whychooseus/6.png";


const benefits = [
  "Money Making Skills",
  "Hands on Experience during Training",
  "Internship & Job Opportunities",
  "On-campus & Online Classes with Recorded Lectures",
  "Highly Experienced Instructors",
  "Professional Learning Environment",
  "Learning Management System",
];

const images = [
  one,
  two,
  three,
  four,
  five,
  six
];

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - List */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Why Choose US?</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-lg">
                <Check className="mr-2" size={22} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Hexagon Image Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-32 h-32 md:w-40 md:h-40 overflow-hidden relative"
            >
              <div className="w-full h-full bg-blue-500 clip-hexagon">
                <Image
                  src={image}
                  alt={`Why Choose Us ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
