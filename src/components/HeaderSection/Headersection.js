export default function HeaderSection({ pagetitle, shortdescription, children }) {
  return (
    <section className="relative flex flex-col items-center justify-center h-fit pb-10 bg-gradient-to-r from-[#1B263B] via-[#475e5e] to-[#006d5f]">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto flex flex-col items-center justify-center p-6 md:p-10">
        <h1 className="text-2xl md:text-5xl font-bold text-white text-center">
          {pagetitle}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 text-center mt-4 max-w-4xl">
          {shortdescription}
        </p>

        {/* Inject custom content below heading */}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
} 
