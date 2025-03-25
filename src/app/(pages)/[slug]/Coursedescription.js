import React from "react";

const Coursedescription = ({ coursedesc }) => {
  console.log(coursedesc);
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-[#acb8d1] p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Course Description Container */}
        {/* Course Description Container */}
        <div className="col-span-12 md:col-span-8">
          <div className="rounded-2xl overflow-hidden">
            <div
              className="course-description max-h-[80vh] overflow-y-scroll bg-white/50 shadow-xl p-6 text-justify leading-7 transition-all duration-300 ease-in-out 
        backdrop-blur-md border border-gray-200
        scrollbar-thin scrollbar-thumb-[#abc2e6] scrollbar-track-transparent
        [&>h1]:text-[34px] [&>h1]:font-semibold
        [&>h2]:text-[30px] [&>h2]:font-medium
        [&>h3]:text-[24px] [&>h3]:font-medium
        [&>a]:cursor-pointer
        [&>p]:mt-5 
        [&>ul]:list-disc [&>ul]:pl-6
        [&>ol]:list-decimal [&>ol]:pl-6
        [&>ul>li]:mt-2
        [&>ol>li]:mt-2"
              dangerouslySetInnerHTML={{
                __html: coursedesc.Course_Description || "",
              }}
            />
          </div>
        </div>

        {/* Optional Sidebar / Placeholder */}
        <div className="col-span-12 md:col-span-4 h-full bg-white/50 rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Sidebar</h2>
          <p className="text-sm text-gray-500">
            You can add related resources, course materials, instructor info,
            etc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coursedescription;
