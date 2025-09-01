"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const mediaPartners = [
  // { src: "./assets", alt: "City 42" },
];

const MediaPartners = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="w-full bg-white py-16 px-6 overflow-hidden">
      {" "}
      {/* ✅ Fix Overflow Here */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          We Empower Professionals see through Media Partner Networks
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Pny trainings encourage the opinions of youth by developing them
          professionally, trusting their abilities as leaders, and getting them
          excited to explore the world around them.
        </p>
      </div>
      {/* Slider */}
      <div className="mt-10">
        <Slider {...settings}>
          {mediaPartners.map((partner, index) => (
            <div key={index} className="px-2 flex justify-center">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={200}
                height={200}
                className="w-auto h-20 md:h-24 object-contain max-w-full"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default MediaPartners;
