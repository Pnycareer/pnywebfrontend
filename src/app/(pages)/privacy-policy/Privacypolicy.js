"use client";
import ScrollToTop from "@/components/ScrollToTop/Scrolltotop";

const Privacypolicy = ({ pageData }) => {

  const { page_title, page_description, shortdescription } = pageData;

  return (
    <>
      <ScrollToTop />
      <section className="relative flex items-center justify-center h-[300px] md:h-[400px] xl:h-[300px] w-full bg-gradient-to-r from-[#1B263B] via-[#475e5e] to-[#006d5f]">
        <div className="absolute inset-0 backdrop-blur-md rounded-xl w-11/12 md:w-10/12 lg:w-8/12 mx-auto flex flex-col items-center justify-center p-6 md:p-10">
          <h1 className="text-2xl md:text-5xl font-bold text-white text-center">
            {page_title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 text-center mt-4 max-w-4xl">
            {shortdescription}
          </p>
        </div>
      </section>

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

export default Privacypolicy;
