"use client";

import HeaderSection from "@/components/HeaderSection/Headersection";

const Termsconditions = ({ pageData }) => {
  const { page_title, page_description, shortdescription } = pageData;

  return (
    <>
      <HeaderSection
        pagetitle={page_title}
        shortdescription={shortdescription}
      />
  

      <section className="px-6 md:px-16 py-12 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto">
          <article
            className="prose max-w-none prose-headings:mt-6 prose-p:mb-4 prose-p:text-gray-700
           [&>h1]:text-[34px] [&>h1]:font-semibold
                [&>h1]:leading-9
                [&>h2]:text-[30px] [&>h2]:font-medium
                [&>h3]:text-[24px] [&>h3]:font-medium
                [&>a]:cursor-pointer
                [&>p]:mt-5 
                [&>ul]:list-disc [&>ul]:pl-6
                [&>ol]:list-decimal [&>ol]:pl-6
                [&>ul>li]:mt-2
                [&>ol>li]:mt-2"
            dangerouslySetInnerHTML={{ __html: page_description }}
          />
        </div>
      </section>
    </>
  );
};

export default Termsconditions;
