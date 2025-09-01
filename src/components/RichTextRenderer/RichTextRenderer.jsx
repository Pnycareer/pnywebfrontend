"use client";

import React from "react";

const RichTextRenderer = ({ html }) => {
  if (!html) return null;

  return (
    <div
      className="bg-white/50 shadow-xl p-6 text-black leading-[1.7]
      backdrop-blur-md border border-gray-200
      scrollbar-thin scrollbar-thumb-[#abc2e6] scrollbar-track-transparent
      ql-editor
      [&>h1]:text-[34px] [&>h1]:font-semibold [&>h1]:leading-9 [&>h1]:mb-3 [&>h1]:mt-
      [&>h2]:text-[30px] [&>h2]:font-medium [&>h2]:mb-2 [&>h2]:mt-2
      [&>h3]:text-[24px] [&>h3]:font-medium [&>h3]:mb-2 [&>h3]:mt-1
      [&>p]:my-2
      [&>p:empty]:my-0
      [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mt-1
      [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mt-1
      [&_iframe]:w-full [&_iframe]:h-[400px] [&_iframe]:rounded-xl
      [&_.ql-align-center]:text-center
      [&_.ql-align-right]:text-right"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RichTextRenderer;
