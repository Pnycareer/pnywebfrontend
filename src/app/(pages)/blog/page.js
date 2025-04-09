import React from 'react';
import Blogcategoy from './Blogcategoy';

export const metadata = {
  title: 'Blogs',
  description: 'Discover the latest insights, tutorials, and tips across marketing, technology, design, SEO, and more on our blog. Stay updated and grow your knowledge with our expert-written articles.',
};

const Page = () => {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      
      <Blogcategoy />
    </>
  );
};

export default Page;
