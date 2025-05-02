"use client";
import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const SocialShare = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-xl" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-green-500 text-xl" />,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-blue-700 text-xl" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-blue-400 text-xl" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Share this blog:</h3>
      <div className="flex gap-4 flex-wrap">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            {platform.icon}
            <span className="text-sm text-gray-700">{platform.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
